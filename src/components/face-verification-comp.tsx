/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { RocketIcon } from "@radix-ui/react-icons";

export default function FaceVerificationComp() {
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement>(null);
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [matches, setMatches] = useState<string>("");

  useEffect(() => {
    // load models
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("models"),
        faceapi.nets.faceExpressionNet.loadFromUri("models"),
        faceapi.nets.ageGenderNet.loadFromUri("models"),
      ]);
    };

    // start webcam video
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error(err));
    };

    // detect faces logic and function
    const detectFaces = async () => {
      const canvas = canvasRef.current!;
      const image = imageRef.current!;
      const webcam = webcamRef.current!;

      const detection = await faceapi
        // .detectSingleFace(webcam, new faceapi.SsdMobilenetv1Options())
        .detectSingleFace(webcam, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      if (!detection) {
        setMatches("No face detected");
        return;
      }

      const displaySize = {
        width: webcam.width,
        height: webcam.height,
      };

      faceapi.matchDimensions(canvas, displaySize);

      const resizedDetections = faceapi.resizeResults([detection], displaySize);

      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        resizedDetections.forEach((result) => {
          const { age, gender, genderProbability } = result;
          new faceapi.draw.DrawTextField(
            [
              `${Math.round(age)} Tahun`,
              `${gender} ${Math.round(genderProbability * 100)}%`,
            ],
            result.detection.box.bottomRight
          ).draw(canvas);
        });
      }

      const imageFaceDetection = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      const webcamFaceDetection = await faceapi
        .detectSingleFace(webcam, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (imageFaceDetection && webcamFaceDetection) {
        const distance = faceapi.euclideanDistance(
          imageFaceDetection.descriptor,
          webcamFaceDetection.descriptor
        );

        console.log(detection?.alignedRect.box.width);
        // console.log('Face comparison distance:', distance);

        // console.log(
        //   detection.angle.pitch,
        //   detection.angle.yaw,
        //   detection.angle.roll
        // );

        const userOpenMouth = detection.expressions.surprised > 0.6;

        const isAlignedRectWidthValid = (alignedRectBoxWidth: number) => {
          return alignedRectBoxWidth >= 190 && alignedRectBoxWidth <= 260;
        };

        if (
          userOpenMouth &&
          distance < 0.55 &&
          isAlignedRectWidthValid(detection.alignedRect.box.width)
        ) {
          setIsSuccess(true);

          setMatches("Face match!");
          setTimeout(() => {
            router.push("/opening-exam");
          }, 1000);
        } else if (distance < 0.55) {
          setMatches("Please open your mouth!");
        } else {
          setMatches("Face does not match!");
        }
      }
    };

    startVideo();
    loadModels();

    intervalRef.current = setInterval(() => {
      detectFaces();
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Face Match!");
    }
  }, [isSuccess]);
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div>
        <canvas ref={canvasRef} className="absolute"></canvas>
        <video
          ref={webcamRef}
          autoPlay
          muted
          height={480}
          width={640}
          className="rounded-md shadow-lg"
        ></video>
      </div>

      <div>
        <img
          ref={imageRef}
          src="/img/ali2.jpg"
          alt="Selfie"
          className="h-auto w-80 hidden"
        />
      </div>

      <Alert className="mt-6 py-4 flex flex-row justify-start items-center space-x-10 ">
        <RocketIcon className="h-4 w-4" />
        <div>
          <AlertTitle>{matches}</AlertTitle>
          <AlertDescription>
            Ikuti Perintah dan arahan yang diberikan oleh sistem
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
