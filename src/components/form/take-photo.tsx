"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/lib/ContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TakePhoto({ photo, setPhoto, setStep }: any) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (photo) {
      console.log("31", photo);
    }
  }, [photo]);

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
    <Card className="w-full h-full  p-4 ">
      <CardHeader className="p-2 h-auto ">
        <CardTitle className="text-3xl font-bold text-center">
          Foto Wajah
        </CardTitle>
        <CardDescription className="text-center">
          Silahkan foto wajah anda sesuai dengan tempatnya.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-[300px]  flex flex-col  items-center  ">
        {!photo && (
          <>
            <div className="rounded-lg flex flex-col justify-center items-center mb-5 w-[400px] h-auto ">
              {stream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="rounded-lg"
                />
              ) : (
                <p className="font-bold">Memuat kamera...</p>
              )}
            </div>
            <div>
              <Button onClick={captureImage}>Ambil gambar</Button>
            </div>
          </>
        )}

        {photo && (
          <div className="mt-32 bg-green-200">
            <Dialog defaultOpen={true}>
              <DialogTrigger asChild>
                <Button size="lg" className="font-bold">
                  Lihat Foto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                  {photo && (
                    <Image
                      id="ktp"
                      src={photo}
                      width={100}
                      height={100}
                      alt="photo"
                      className="w-auto h-auto"
                    />
                  )}
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Tutup
                    </Button>
                  </DialogClose>
                  <Button onClick={() => setPhoto(null)}>Ganti Foto</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {/* </div> */}
      </CardContent>

      <CardFooter className=" flex items-center justify-end gap-x-5 p-0 pr-10">
        {photo && (
          <Button onClick={() => setStep("2")} variant="outline">
            lanjutkan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
