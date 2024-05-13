"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/lib/ContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

export default function TakePhotoPage() {
  const router = useRouter();
  const { photo, setPhoto, examId } = useAppContext();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!examId) {
      localStorage.setItem(
        "message",
        "Anda dialihkan!, anda belum diizinkan untuk mengakses halaman tersebut."
      );
      router.push(`/`);
    }

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
  }, []);

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
        setPhoto(dataUrl);
        setIsOpen(true);
      }
    }
  };

  const handleCancel = () => {
    setPhoto(null);
    setIsOpen(false);
  };

  return (
    <div className="flex w-full h-screen justify-center items-center ">
      <Card className="w-[600px] h-[500px]  p-4">
        <CardHeader className="p-2">
          <CardTitle className="text-3xl font-bold text-center">
            Foto Wajah
          </CardTitle>
          <CardDescription className="text-center">
            Silahkan foto wajah anda sesuai dengan tempatnya.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center gap-y-6 ">
          <div className=" flex flex-col justify-center items-center gap-y-4 w-[400px] h-[300px] ">
            {stream ? (
              <video ref={videoRef} autoPlay playsInline className="" />
            ) : (
              <p className="font-bold">Memuat kamera...</p>
            )}
          </div>
          <div>
            <Button onClick={captureImage}>Ambil gambar</Button>
          </div>
          <Dialog open={isOpen}>
            <DialogContent className="sm:max-w-[425px]">
              {photo && (
                <Image
                  src={photo}
                  width={100}
                  height={100}
                  className="w-auto h-auto"
                  alt="Captured"
                />
              )}
              <DialogFooter>
                <Button onClick={handleCancel}>Ambil ulang</Button>
                <Button onClick={() => router.push("/form-applicant")}>
                  Simpan & lanjutkan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
