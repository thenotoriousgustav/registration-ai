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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";

const agamaData = [
  "islam",
  "kristen protestan",
  "katolik",
  "buddha",
  "konghucu",
];

export default function RegistrationForm({
  formValue,
  setFormValue,
  handleSubmit,
  setStep,
}: any) {
  return (
    <div
      className="flex w-full h-screen
     justify-center items-center py-10"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex items-center justify-center"
        encType="multipart/form-data"
      >
        <Card className="w-[700px] h-[620px] overflow-auto ">
          <CardHeader className="">
            <CardTitle className=" text-center text-3xl font-bold ">
              Formulir Ujian
            </CardTitle>
            {/* <CardDescription className="text-center ">
              Lengkapkan data diri untuk mendaftar ujian secara resmi.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4 ">
            {/* foto ktp */}
            {/* <div className=" flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="ktp">KTP:</Label>
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="photo">Foto</Label>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Lihat Foto</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <div className="grid gap-4 py-4">
                      {photo && (
                        <Image
                          id="photo"
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
                      <Button type="submit">Ganti Foto</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div> */}

            {/* nama nik */}
            <div className=" flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">Nama :</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Gustam Mahendra"
                />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">NIK (16 digit) :</Label>
                <Input
                  type="text"
                  id="nik"
                  name="nik"
                  placeholder="3171234567890123"
                />
              </div>
            </div>

            {/* dob pob */}
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="pob">Tempat Lahir :</Label>
                <Input type="text" id="pob" name="pob" placeholder="Bekasi" />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="dob">Tanggal Lahir :</Label>
                <Input type="date" id="dob" name="dob" placeholder="" />
              </div>
            </div>

            {/* gender agama */}
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="gender">Jenis Kelamin :</Label>
                <Select
                  name="gender"
                  // onValueChange={field.onChange}
                  // defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pria">Pria</SelectItem>
                    <SelectItem value="wanita">wanita</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="agama">Agama :</Label>
                <Select name="agama">
                  <SelectTrigger>
                    <SelectValue placeholder="pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    {agamaData.map((agama) => (
                      <SelectItem
                        className="capitalize"
                        key={agama}
                        value={agama}
                      >
                        {agama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* kota alamat */}
            <div className="flex flex-row gap-x-3">
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="name">Kota :</Label>
                <Input type="text" id="kota" name="kota" placeholder="Bekasi" />
              </div>
              <div className="flex flex-col space-y-1.5 flex-1">
                <Label htmlFor="tipe">Tipe file :</Label>
                <Select name="tipe">
                  <SelectTrigger>
                    <SelectValue placeholder="pilih" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="KTP">KTP</SelectItem>
                    <SelectItem value="SIM">SIM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* address */}
            <div className="flex flex-row gap-x-3 ">
              <div className="flex flex-col space-y-1.5 flex-1 ">
                <Label htmlFor="address">Alamat :</Label>
                <Textarea
                  rows={3}
                  id="address"
                  name="adress"
                  placeholder="Jl. Merpati Putih, No 29, RW.03/RT.02"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-x-5">
            <Button onClick={() => setStep("2")} variant="outline">
              back
            </Button>
            <Button type="submit">Daftar</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
