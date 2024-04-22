'use client';

import { useEffect, useRef, useState } from 'react';
import * as faceapi from '@vladmandic/face-api';
import Webcam from 'react-webcam';
import {
  load as cocoSSDLoad,
  ObjectDetection,
} from '@tensorflow-models/coco-ssd';
import { drawRect } from '@/utils/drawRect';

export default function FaceDetectionPage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasDuaRef = useRef<HTMLCanvasElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const detectInterval = useRef<NodeJS.Timeout | null>(null);
  const lastFaceDetectedTimeRef = useRef<number | null>(null);
  const [cameraMessage, setCameraMessage] = useState<string>('');
  const [objectMessage, setObjectMessage] = useState<string>('');
  const [faceMessage, setFaceMessage] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.video.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  const detectFaces = () => {
    const video = webcamRef.current?.video;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        // .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      console.log(detections);

      if (detections.length === 0) {
        const currentTime = new Date().getTime();
        if (
          !lastFaceDetectedTimeRef.current ||
          currentTime - lastFaceDetectedTimeRef.current > 5000
        ) {
          const time = new Date().toLocaleTimeString();
          setCameraMessage(
            `Anda telah tidak terdeteksi di depan kamera selama 5 detik! ${time}`
          );
        }
      } else {
        lastFaceDetectedTimeRef.current = new Date().getTime();
        setCameraMessage('');
      }

      detections.forEach((detection) => {
        if (detection.expressions.surprised > 0.5) {
          setMessage('you open mouth');
        } else {
          setMessage('');
        }
      });

      // Check if more than two faces are detected
      if (detections.length > 1) {
        setFaceMessage(`terdeteksi ${detections.length} wajah disekitar anda!`);
      } else {
        setFaceMessage('');
      }

      const displaySize = {
        width: video.width,
        height: video.height,
      };

      faceapi.matchDimensions(canvas, displaySize);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const context = canvas.getContext('2d');
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
    }, 100);
  };

  async function runObjectDetection(net: ObjectDetection) {
    if (
      canvasDuaRef.current &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      // Set canvas height and width
      canvasDuaRef.current.width = webcamRef.current.video.videoWidth;
      canvasDuaRef.current.height = webcamRef.current.video.videoHeight;

      // Make detections
      const detectedObjects = await net.detect(
        webcamRef.current.video,
        undefined,
        0.5
      );

      console.log('Detect data: ', detectedObjects);

      // Check if any object resembles a camera
      const isCameraDetected = detectedObjects.some(
        (obj) => obj.class === 'cell phone' || obj.class === 'laptop'
      );

      // Check if more than one person is detected
      const numberOfPeople = detectedObjects.filter(
        (obj) => obj.class === 'person'
      ).length;

      const isMultiplePeopleDetected = numberOfPeople > 1;

      if (isCameraDetected) {
        setObjectMessage('Terdeteksi Device lain di dekat Anda!');
      } else if (isMultiplePeopleDetected) {
        setObjectMessage('Ada orang lain disekitar Anda!');
      } else {
        setObjectMessage('');
      }

      // Draw mesh
      const context = canvasDuaRef.current.getContext('2d');

      if (context) {
        // Update drawing utility
        drawRect(detectedObjects, context);
      }
    }
  }

  async function runCoco() {
    // Load network
    const net = await cocoSSDLoad();

    //  Loop to detect objects
    detectInterval.current = setInterval(() => {
      runObjectDetection(net);
    }, 100);
  }

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ageGenderNet.loadFromUri('models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
        faceapi.nets.tinyFaceDetector.loadFromUri('models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('models'),
        faceapi.nets.faceExpressionNet.loadFromUri('models'),
      ]);
      startVideo();
    };

    loadModels();

    setTimeout(() => {
      setCameraMessage('Memulai Model...');
      detectFaces();
      runCoco();
    }, 1000);

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
    <div>
      {/* <h1 className='text-7xl text-center mt-10'>Face Detection</h1> */}
      <div className='flex flex-col h-full items-center justify-center mt-16'>
        <Webcam
          ref={webcamRef}
          width='720'
          height='560'
          // mirrored={true}
          autoPlay
          muted
        ></Webcam>
        <canvas ref={canvasRef} className='absolute'></canvas>
        <canvas ref={canvasDuaRef} className='absolute'></canvas>
        {faceMessage && <p>{faceMessage}</p>}
        {cameraMessage && <p>{cameraMessage}</p>}
        {objectMessage && <p>{objectMessage}</p>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
