"use client";
import * as React from "react";
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
import { useState } from "react";

export default function CardWithForm({ foto, fotoKtp }: any) {
  // const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  // const [fotoKtp, setFotoKtp] = useState<any>(null);

  // const handleFoto = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const fileSize = file.size / 1024 / 1024; // Convert bytes to MB
  //     const fileType = file.type;
  //     const allowedExtensions = ["image/jpeg", "image/png"];

  //     // Check file extension and size
  //     if (!allowedExtensions.includes(fileType)) {
  //       alert("File type not supported. Please upload a JPG or PNG file.");
  //       event.target.value = ""; // Clear input value
  //     } else if (fileSize > 2) {
  //       alert("File size exceeds the limit of 2MB.");
  //       event.target.value = ""; // Clear input value
  //     } else {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file); // Membaca file sebagai URL data
  //       reader.onload = () => {
  //         if (reader.result) {
  //           setFotoBase64(reader.result.toString()); // Mengatur base64 data ke state
  //         }
  //       };
  //       reader.onerror = (error) => {
  //         console.error("Error:", error);
  //       };
  //     }
  //   }
  // };

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name") as string,
      foto: foto, // Menggunakan base64 data yang telah diset sebelumnya
      fotoKtp: fotoKtp,
      nik: formData.get("nik") as string,
      id_card_profile: {
        pob: formData.get("pob") as string,
        dob: formData.get("dob") as string,
      },
    };
    console.log(data);
  };
  return (
    <div className="flex w-full h-screen justify-center items-center ">
      <form onSubmit={handleForm} className="h-full flex items-center">
        <Card className="w-[750px] h-[500px] overflow-auto p-4">
          <CardHeader>
            <CardTitle>Formulir</CardTitle>
            <CardDescription>isi dong bang....</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-6">
            {/* name nik */}
            <div className=" flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">Nama:</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">NIK</Label>
                <Input
                  type="text"
                  id="nik"
                  name="nik"
                  placeholder="Masukkan nik anda..."
                />
              </div>
            </div>

            {/* dob pob */}
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="gender">Tempat Lahir :</Label>
                <Input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Foto kelamin anda"
                />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="gender">Tanggal Lahir :</Label>
                <Input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Foto kelamin anda"
                />
              </div>
            </div>

            {/* gender agama */}
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="gender">Jenis Kelamin :</Label>
                <select name="" id="">
                  <option value="islam">Pria</option>
                  <option value="islam">Wanita</option>
                </select>
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="agama">Agama :</Label>
                <select name="" id="" defaultValue="ga islam">
                  <option value="islam">islam</option>
                  <option value="ga islam">ga islam</option>
                </select>
              </div>
            </div>

            {/* kota alamat */}
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">Kota :</Label>
                <Input
                  type="text"
                  id="kota"
                  name="kota"
                  placeholder="e.g Bekasi"
                />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="alamat">Alamat :</Label>
                <textarea
                  rows={3}
                  id="alamat"
                  name="alamat"
                  placeholder="Jl. Tikus bau, No 29, RW/RT 04921"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            {/* <Button variant="outline" className="absolute top-10 left-5">
              Back
            </Button> */}
            <Button type="submit">Daftar</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

{
  /* <div className="flex flex-col space-y-1.5 flex-1">
<Label htmlFor="name">Foto</Label>
<Input
  type="file"
  accept=".jpg, .png"
  onChange={handleFoto}
  id="foto"
  name="foto"
/>
</div> */
}
