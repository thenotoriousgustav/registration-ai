"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function TakePhoto({ formValue, setFormValue, setStep }: any) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(stream);
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [formValue.photo]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // ambil foto
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setFormValue((prev: any) => ({ ...prev, photo: dataUrl }));
      }
    }
  };

  return (
    <Card className="w-full h-full  p-4 ">
      <CardContent className="w-full h-full flex flex-col  items-center ">
        {!formValue.photo ? (
          <>
            <CardTitle className="text-3xl font-bold mb-1 text-center">
              Take a Photo
            </CardTitle>
            <CardDescription className="text-center">
              Please take a photo of your face according to the designated
              place.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle className="text-3xl font-bold mb-1 text-center text-green-600">
              Successfully take a photo
            </CardTitle>
            <CardDescription className="text-center">
              Click the next button to proceed to the next step.
            </CardDescription>
          </>
        )}

        {!formValue.photo && (
          <>
            <div className="mt-6 rounded-lg flex flex-col justify-center items-center mb-5 w-[420px] h-auto">
              {stream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="rounded-lg"
                />
              ) : (
                <div className="h-[300px] font-bold flex justify-center items-center">
                  <h1>Loading camera...</h1>
                </div>
              )}
            </div>
            {stream && (
              <div>
                <Button onClick={captureImage}>Ambil gambar</Button>
              </div>
            )}
          </>
        )}

        {formValue.photo && (
          <>
            <div className="mt-6 rounded-lg flex flex-col justify-center items-center mb-2 w-[420px] h-auto ">
              {formValue.photo && (
                <Image
                  id="ktp"
                  src={formValue.photo}
                  width={100}
                  height={100}
                  alt="photo"
                  className="w-auto h-auto rounded-lg border-black/20 border-4 p-1"
                />
              )}
            </div>
            <div>
              <Button
                onClick={() =>
                  setFormValue((prev: any) => ({ ...prev, photo: null }))
                }
                variant="link"
                className="font-bold  w-[200px] "
              >
                Change Photo
              </Button>
            </div>
          </>
        )}

        <div className="mt-3 flex justify-end w-full">
          {formValue.photo && (
            <Button onClick={() => setStep("2")} className="w-24">
              next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
