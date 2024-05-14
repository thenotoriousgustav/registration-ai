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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useEffect } from "react";

export const UploadIDCard = ({
  formValue,
  setFormValue,
  idCard,
  setIdCard,
  setStep,
}: any) => {
  useEffect(() => {
    if (idCard) {
      console.log("40", idCard);
    }
  }, [idCard]);

  const handleFoto = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          setIdCard(reader.result as string);
        }
      };
    }
  };

  const handleSelect = (value: string) => {
    console.log(value);
    setIdCard(null);
    setFormValue((prev: any) => ({ ...prev, cardType: value }));

    console.log(formValue);
  };

  return (
    <Card className="w-full h-full overflow-auto p-4">
      <CardHeader>
        <CardTitle>KTP</CardTitle>
        <CardDescription>
          upload foto ktp anda untuk melanjutkan
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <div>
          <Label htmlFor="cardType">Jenis Kartu Identias:</Label>
          <Select name="cardType" onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue placeholder="pilih" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="KTP">KTP</SelectItem>
              <SelectItem value="SIM">SIM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!idCard ? (
          <div className="flex flex-col space-y-1.5 px-5 flex-1 justify-center items-center">
            <Input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              id="ktp"
              name="ktp"
              onChange={handleFoto}
            />
            {idCard && (
              <Label htmlFor="name" className="text-red-600 font-bold">
                Upload ulang ?
              </Label>
            )}
          </div>
        ) : (
          <div className="mt-32 bg-green-200">
            <Dialog defaultOpen={true}>
              <DialogTrigger asChild>
                <Button size="lg" className="font-bold">
                  Lihat Foto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className="grid gap-4 py-4">
                  <Image
                    id="ktp"
                    src={idCard}
                    width={100}
                    height={100}
                    alt="photo"
                    className="w-auto h-auto"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Tutup
                    </Button>
                  </DialogClose>
                  <Button onClick={() => setIdCard(null)}>Ganti Foto</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-12 p-0 justify-between  px-9">
        <Button onClick={() => setStep("1")}>kembali</Button>
        <Button onClick={() => setStep("3")}>Lanjutkan</Button>
      </CardFooter>
    </Card>
  );
};
