/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import {
  load as cocoSSDLoad,
  ObjectDetection,
} from "@tensorflow-models/coco-ssd";
import { drawRect } from "@/utils/drawRect";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { getSession } from "@/lib/session";
import { dataURLtoBlob } from "@/lib/utils";

export default function SimulationAI({ params }: { params: { slug: string } }) {
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDuaRef = useRef<HTMLCanvasElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const detectInterval = useRef<NodeJS.Timeout | null>(null);
  const lastFaceDetectedTimeRef = useRef<number | null>(null);
  const lastCaptureTimeRef = useRef<number | null>(null);
  const [cameraMessage, setCameraMessage] = useState<string>("");
  const [objectMessage, setObjectMessage] = useState<string>("");
  const [faceMessage, setFaceMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const captureScreenshot = () => {
    const video = webcamRef.current;
    if (!video) return null;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/png");
  };

  const sendScreenshotToServer = async (screenshot: string, note: string) => {
    const photoData = await dataURLtoBlob(screenshot);

    const filePhoto = new File([photoData], "picture.png", {
      type: "image/png",
    });

    const session = await getSession();
    const accessToken = session?.accessToken;

    const formData = new FormData();
    formData.append("application_id", params.slug);
    formData.append("note", note);
    formData.append("status", "exam");
    formData.append("file", filePhoto);

    try {
      await fetch("http://localhost:3001/evidences", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      // Set the screenshot URL to state to display it
      setScreenshotUrl(screenshot);
    } catch (error) {
      console.error("Error sending screenshot:", error);
    }
  };

  const shouldCaptureScreenshot = () => {
    const currentTime = Date.now();
    if (
      !lastCaptureTimeRef.current ||
      currentTime - lastCaptureTimeRef.current >= 3000
    ) {
      lastCaptureTimeRef.current = currentTime;
      return true;
    }
    return false;
  };

  const detectFaces = async () => {
    const video = webcamRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      if (detections.length === 0) {
        const currentTime = new Date().getTime();
        if (
          !lastFaceDetectedTimeRef.current ||
          currentTime - lastFaceDetectedTimeRef.current > 5000
        ) {
          const time = new Date().toLocaleTimeString();
          const message = `Anda telah tidak terdeteksi di depan kamera selama 5 detik! ${time}`;
          setCameraMessage(message);
          if (shouldCaptureScreenshot()) {
            const screenshot = captureScreenshot();
            if (screenshot) {
              sendScreenshotToServer(screenshot, message);
            }
          }
        }
      } else {
        lastFaceDetectedTimeRef.current = new Date().getTime();
        setCameraMessage("");
      }

      if (detections.length > 1) {
        const message = `Terdeteksi ${detections.length} wajah di sekitar Anda!`;
        setFaceMessage(message);
        if (shouldCaptureScreenshot()) {
          const screenshot = captureScreenshot();
          if (screenshot) {
            sendScreenshotToServer(screenshot, message);
          }
        }
      } else {
        setFaceMessage("");
      }

      const displaySize = {
        width: video.width,
        height: video.height,
      };

      faceapi.matchDimensions(canvas, displaySize);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

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
    }, 300);
  };

  const runObjectDetection = async (net: ObjectDetection) => {
    if (
      canvasDuaRef.current &&
      webcamRef.current &&
      webcamRef.current.readyState === 4
    ) {
      // Set canvas height and width
      canvasDuaRef.current.width = webcamRef.current.videoWidth;
      canvasDuaRef.current.height = webcamRef.current.videoHeight;

      // Make detections
      const detectedObjects = await net.detect(
        webcamRef.current,
        undefined,
        0.5
      );

      // Check if any object resembles a camera
      const isCameraDetected = detectedObjects.some(
        (obj) => obj.class === "cell phone" || obj.class === "laptop"
      );

      // Check if more than one person is detected
      const numberOfPeople = detectedObjects.filter(
        (obj) => obj.class === "person"
      ).length;

      const isMultiplePeopleDetected = numberOfPeople > 1;

      if (isCameraDetected) {
        const message = "Terdeteksi Device lain di dekat Anda!";
        setObjectMessage(message);
        if (shouldCaptureScreenshot()) {
          const screenshot = captureScreenshot();
          if (screenshot) {
            sendScreenshotToServer(screenshot, message);
          }
        }
      } else if (isMultiplePeopleDetected) {
        const message = "Ada orang lain di sekitar Anda!";
        setObjectMessage(message);
        if (shouldCaptureScreenshot()) {
          const screenshot = captureScreenshot();
          if (screenshot) {
            sendScreenshotToServer(screenshot, message);
          }
        }
      } else {
        setObjectMessage("");
      }

      // Draw mesh
      const context = canvasDuaRef.current.getContext("2d");

      if (context) {
        // Update drawing utility
        drawRect(detectedObjects, context);
      }
    }
  };

  const runCoco = async () => {
    // Load network
    const net = await cocoSSDLoad();

    // Loop to detect objects
    detectInterval.current = setInterval(() => {
      runObjectDetection(net);
    }, 300);
  };

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);

      await startVideo();
    };

    loadModels().then(() => {
      setCameraMessage("Memulai Model...");
      detectFaces();
      runCoco();
    });

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (detectInterval.current) {
        clearInterval(detectInterval.current);
      }
    };
  }, []);

  return (
    <section>
      <div>
        <div className="flex flex-col h-full items-center justify-center mt-16">
          <video
            ref={webcamRef}
            autoPlay
            muted
            height={480}
            width={640}
            className="rounded-md shadow-lg"
          ></video>
          <canvas ref={canvasRef} className="absolute"></canvas>
          <canvas ref={canvasDuaRef} className="absolute"></canvas>
        </div>
        <div className="mt-10">
          <Alert className="min-h-12">
            <RocketIcon className="h-4 w-4 self-center" />
            {faceMessage && <AlertTitle>{faceMessage}</AlertTitle>}
            {cameraMessage && <AlertTitle>{cameraMessage}</AlertTitle>}
            {objectMessage && <AlertTitle>{objectMessage}</AlertTitle>}
            {message && <AlertTitle>{message}</AlertTitle>}
          </Alert>
        </div>
        {screenshotUrl && (
          <div className="mt-10">
            <h2>Hasil Capture:</h2>
            <img
              src={screenshotUrl}
              alt="Screenshot"
              className="rounded-md shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
