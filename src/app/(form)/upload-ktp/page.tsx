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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TakePhoto() {
  const [fotoKtp, setFotoKtp] = useState<string | null>(null);

  useEffect(() => {
    if (fotoKtp) {
      console.log("ok");
    }
  }, [fotoKtp]);

  const handleFoto = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          setFotoKtp(reader.result as string);
        }
      };
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center ">
      <Card className="w-[750px] h-[500px] overflow-auto p-4">
        <CardHeader>
          <CardTitle>KTP</CardTitle>
          <CardDescription>
            upload foto ktp anda untuk melanjutkan
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          <div className=" flex flex-row   h-56">
            <div className="flex flex-col space-y-1.5 px-5 flex-1 justify-center items-center">
              <Input
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                id="ktp"
                name="ktp"
                onChange={handleFoto}
              />
              {fotoKtp ? (
                <Label htmlFor="name" className="text-red-600 font-bold">
                  Upload ulang ?
                </Label>
              ) : (
                <Label htmlFor="name">Upload disini!</Label>
              )}
            </div>
            <div className="flex flex-col space-y-1.5 flex-1 border-2 rounded-md justify-center items-center">
              {fotoKtp ? (
                <Image
                  src={fotoKtp!}
                  alt="foto ktp"
                  width={200}
                  height={200}
                  className="w-96 h-56 rounded-sm object-cover overflow-hidden"
                />
              ) : (
                <h1 className="font-bold text-black">Foto ktp anda</h1>
              )}
            </div>
          </div>

          <CardFooter>
            {fotoKtp && (
              <div className="flex flex-col">
                <Button type="submit">Lanjutkan</Button>
                <CardDescription>
                  Tekan tombol ini untuk melanjutkan
                </CardDescription>
              </div>
            )}
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
