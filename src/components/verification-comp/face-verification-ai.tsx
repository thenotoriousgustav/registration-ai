"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

interface FaceVerificationAIProps {
  photo: string;
  params: {
    slug: string;
  };
}

export default function FaceVerificationAI({
  photo,
  params,
}: FaceVerificationAIProps) {
  const router = useRouter();
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [matches, setMatches] = useState<string>("");

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
      ]);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error starting video stream:", err));
    };

    const detectFaces = async (image: HTMLImageElement) => {
      if (!webcamRef.current || !canvasRef.current) return;

      const webcam = webcamRef.current;
      const canvas = canvasRef.current;

      const detection = await faceapi
        .detectSingleFace(webcam, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      if (!detection) {
        setMatches("No face detected");
        return;
      }

      const displaySize = { width: webcam.width, height: webcam.height };
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
              `${Math.round(age)} years`,
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

        const userOpenMouth = detection.expressions.surprised > 0.6;

        if (userOpenMouth && distance < 0.55) {
          setIsSuccess(true);
          setMatches("Face match!");
          setTimeout(() => {
            router.push(`/simulation/${params.slug}`);
          }, 1000);
        } else if (distance < 0.55) {
          setMatches("Please open your mouth!");
        } else {
          setMatches("Face does not match!");
        }
      }
    };

    const initialize = async () => {
      await loadModels();
      startVideo();

      const image = await faceapi.fetchImage(photo);
      if (!(image instanceof HTMLImageElement)) {
        console.error("Failed to fetch the image");
        return;
      }

      const interval = setInterval(() => detectFaces(image), 100);
      return () => clearInterval(interval);
    };

    initialize();
  }, [photo, params.slug, router]);

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
      <Alert className="mt-6 py-4 flex flex-row justify-start items-center space-x-10">
        <RocketIcon className="h-4 w-4" />
        <div>
          <AlertTitle>{matches}</AlertTitle>
          <AlertDescription>
            Follow the instructions and guidelines provided by the system
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
