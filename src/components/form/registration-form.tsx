"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const religions = [
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
  const handleIdCardChange = () => {
    setFormValue((prev: any) => ({ ...prev, idCard: null, idCardType: null }));
    setStep("2");
  };

  const handlePhotoChange = () => {
    setFormValue((prev: any) => ({ ...prev, photo: null }));
    setStep("1");
  };

  return (
    <Card className="flex flex-col w-full h-full p-0">
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col px-5 pt-2 gap-y-2  "
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-center mb-1">
          Formulir Pendaftaran
        </h1>

        {/* idCard photo */}
        <div className=" flex flex-row gap-x-3">
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="ktp">Identity Card :</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Show {formValue.idCardType}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                  {formValue.idCard && (
                    <Image
                      id="ktp"
                      src={formValue.idCard}
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
                      Close
                    </Button>
                  </DialogClose>
                  <Button onClick={handleIdCardChange}>Change File</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="photo">Picture :</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Show Picture
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                  {formValue.photo && (
                    <Image
                      id="photo"
                      src={formValue.photo}
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
                  <Button onClick={handlePhotoChange}>Change Picture</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* nik idCardType */}
        <div className=" flex flex-row gap-x-3">
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="nik">NIK (16 digit) :</Label>
            <Input
              onChange={(e) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  NIK: e.target.value,
                }))
              }
              defaultValue={formValue.nik}
              type="text"
              id="nik"
              name="nik"
              placeholder="3171234567890123"
            />
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="id_type">Type of Identity Card :</Label>
            <Input
              value={formValue.idCardType}
              readOnly
              type="text"
              id="id_type"
              name="id_type"
            />
          </div>
        </div>

        {/* nama city */}
        <div className=" flex flex-row gap-x-3">
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="name">Name :</Label>
            <Input
              onChange={(e) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={formValue.name}
              type="text"
              id="name"
              name="name"
              placeholder="Gustam Mahendra"
            />
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="city">City :</Label>
            <Input
              onChange={(e) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              value={formValue.city}
              type="text"
              id="city"
              name="city"
              placeholder="Bekasi"
            />
          </div>
        </div>

        {/* dob pob */}
        <div className="flex flex-row gap-x-3">
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="pob">Place of Birth :</Label>
            <Input
              onChange={(e) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  pob: e.target.value,
                }))
              }
              value={formValue.pob}
              type="text"
              id="pob"
              name="pob"
              placeholder="Bekasi"
            />
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="dob">Date of Birth :</Label>
            <Input
              onChange={(e) => {
                setFormValue((prev: any) => ({
                  ...prev,
                  dob: e.target.value,
                }));
              }}
              value={formValue.dob}
              type="date"
              id="dob"
              name="dob"
              data-date-format="DD MM YYYY"
            />
          </div>
        </div>

        {/* gender agama */}
        <div className="flex flex-row gap-x-3">
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="gender">Gender :</Label>
            <Select
              name="gender"
              value={formValue.gender}
              onValueChange={(value: string) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  gender: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LAKI-LAKI">Male</SelectItem>
                <SelectItem value="PEREMPUAN">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5 flex-1">
            <Label htmlFor="religion">Religion :</Label>
            <Select
              name="religion"
              value={formValue.religion}
              // defaultValue={formValue.gender == "ISLAM " ? "islam" : ""}
              onValueChange={(value: string) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  religion: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                {religions.map((religion) => (
                  <SelectItem
                    className="capitalize"
                    key={religion}
                    value={religion}
                  >
                    {religion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* address */}
        <div className="flex flex-row gap-x-3 ">
          <div className="flex flex-col space-y-1.5 flex-1 ">
            <Label htmlFor="address">Address :</Label>
            <Textarea
              value={formValue.address}
              onChange={(e) =>
                setFormValue((prev: any) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              rows={1}
              id="address"
              name="adress"
              placeholder="Jl. Merpati Putih, No 29, RW.03/RT.02"
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-1 px-2">
          <Button onClick={() => setStep("2")} variant="outline">
            previous
          </Button>
          <Button type="submit" className="w-24">
            submit
          </Button>
        </div>
      </form>
    </Card>
  );
}
