/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as faceapi from '@vladmandic/face-api';

export default function VerifikasiPage() {
  const imageRef = useRef<HTMLImageElement>(null);

  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [matches, setMatches] = useState<string>('');

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

  useEffect(() => {
    // loading the models
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
        faceapi.nets.tinyFaceDetector.loadFromUri('models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('models'),
        faceapi.nets.faceExpressionNet.loadFromUri('models'),
        faceapi.nets.ageGenderNet.loadFromUri('models'),
      ]);
    };

    startVideo();
    loadModels();

    intervalRef.current = setInterval(() => {
      detectFaces();
    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const detectFaces = async () => {
    const canvas = canvasRef.current!;
    const image = imageRef.current!;
    const webcam = webcamRef.current!;

    // if (image) {
    //   // Fetch an image from a valid URL
    //   const imageUrl =
    //     'https://images.unsplash.com/photo-1713145872144-351db3748385?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; // Replace this with the URL of the image you want to fetch
    //   const fetchedImage = await faceapi.fetchImage(imageUrl);
    //   // Set the src of the image element
    //   image.src = fetchedImage.src;
    // }

    const detections = await faceapi
      .detectAllFaces(webcam, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    console.log(detections);

    detections.forEach((detection) => {
      if (detection.expressions.surprised > 0.5) {
        console.log('you open mouth');
      }
    });

    const displaySize = {
      width: webcam.width,
      height: webcam.height,
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

    // ID card and selfie face detection
    const imageFaceDetection = await faceapi
      .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    const webcamFaceDetection = await faceapi
      .detectSingleFace(webcam, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!imageFaceDetection || !webcamFaceDetection) {
      setMatches('no face detected');
      return;
    }

    if (imageFaceDetection && webcamFaceDetection) {
      const distance = faceapi.euclideanDistance(
        imageFaceDetection.descriptor,
        webcamFaceDetection.descriptor
      );
      console.log('Face comparison distance:', distance);

      if (distance < 0.5) {
        setMatches('Face matches!');
      } else {
        setMatches('Face does not match!');
      }
    }
  };

  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <div>
        <canvas ref={canvasRef} className='absolute'></canvas>
        <video ref={webcamRef} autoPlay muted height={480} width={640}></video>
      </div>

      <p>{matches}</p>
      <div>
        <img
          ref={imageRef}
          src='/img/gustam.jpg'
          alt='Selfie'
          className='h-auto w-80 hidden'
        />
      </div>
    </div>
  );
}
