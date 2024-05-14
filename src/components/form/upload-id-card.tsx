"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Tesseract from "tesseract.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { IoArrowDownOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Spinner } from "../spinner";

export const UploadIDCard = ({ formValue, setFormValue, setStep }: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formValue) {
      console.log("23", formValue);
    }
  }, [formValue]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  const formatDate = (date: any) => {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleUpload = (e: any) => {
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const imageData = reader.result;
        setFormValue((prev: any) => ({ ...prev, idCard: imageData }));
        const { data } = await Tesseract.recognize(imageData as any, "ind", {
          // logger: (m) => console.log(m),
        });

        const extractedData: any = extract(data.text);

        const r = extractedData.religion.toLowerCase() as string;
        console.log("51", r);

        const a = extractedData.dob.split("-") as string;
        console.log(a);

        setFormValue((prev: any) => ({
          ...prev,
          name: extractedData.name,
          nik: extractedData.nik,
          pob: extractedData.pob,
          dob: formatDate(extractedData.dob),
          gender: extractedData.gender.trim() as string,
          address: `${extractedData.address} ${extractedData.kelurahan} ${extractedData.kecamatan}`,
          city: extractedData.province,
          religion: r.trim(),
        }));
      } catch (error) {
        console.error(error);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const extract = (ocrResult: any) => {
    const lines = ocrResult.split("\n");
    let extractedData = {
      name: "",
      nik: "",
      pob: "",
      dob: "",
      gender: "",
      address: "",
      kelurahan: "",
      kecamatan: "",
      city: "",
      province: "",
      religion: "",
    };

    lines.forEach((line: any) => {
      if (line.includes("Nama")) {
        extractedData.name = line.split("Nama")[1]?.trim() || "";
      } else if (line.includes("NIK")) {
        extractedData.nik = line.split(":")[1]?.trim() || "";
      } else if (
        line.includes("Tempat") ||
        line.includes("Tempat/Tgi Lahir") ||
        line.includes("Tempau")
      ) {
        const [tempatLahir, tanggalLahir] = line.split(":")[1]?.split(",") || [
          "",
          "",
        ];
        extractedData.pob = tempatLahir.trim();
        extractedData.dob = tanggalLahir.trim();
      } else if (
        line.includes("Tgl Lahir") ||
        line.includes("Tgl/Tgl Lahir") ||
        line.includes("Tgl")
      ) {
        extractedData.dob =
          line.split(":")[1]?.trim() || line.split("Lahir")[1]?.trim() || "";
      } else if (line.includes("Jenis Kelamin") || line.includes("Jenis")) {
        extractedData.gender = line.split(":")[1]?.trim().split("—")[0] || "";
      } else if (line.includes("Alamat")) {
        extractedData.address = line.split("Alamat")[1]?.trim() || "";
      } else if (line.includes("Kel/Desa") || line.includes("KellDesa")) {
        extractedData.kelurahan = line.split(":")[1]?.trim() || "";
      } else if (line.includes("Kecamatan")) {
        extractedData.kecamatan = line.split(":")[1]?.trim() || "";
      } else if (line.includes("Agama")) {
        extractedData.religion =
          line.split("Agama ")[1]?.trim().split("vk")[0] || "";
      } else if (line.includes("KO")) {
        extractedData.city = line.trim();
      } else if (line.includes("PROVINSI") || line.includes("PR0VINSI")) {
        extractedData.province = line.split("PROVINSI")[1]?.trim() || "";
      }
    });

    return extractedData;
  };

  const handleSelect = (value: string) => {
    setFormValue((prev: any) => ({ ...prev, idCard: null, idCardType: value }));
  };

  return (
    <Card className="w-full h-full overflow-auto p-4">
      {loading && <Spinner />}
      <CardContent className="flex flex-col gap-y-6">
        {!formValue.idCard ? (
          <h1 className="text-2xl text-center font-bold">
            Upload Identity Card
          </h1>
        ) : (
          <h1 className="text-2xl text-center text-green-600 font-bold">
            Successfully Upload {formValue.idCardType}
          </h1>
        )}

        {!formValue.idCard && (
          <div className="flex flex-col  h-[350px] justify-center items-center  px-10">
            {/* Select Kartu Identitas */}
            {formValue.idCardType == "SIM" ? (
              <h1 className="text-sm font-medium mb-1">
                Surat Izin Mengemudi (SIM)
              </h1>
            ) : formValue.idCardType == "KTP" ? (
              <h1 className="text-sm font-medium mb-1">
                Kartu Tanda Pengenal (KTP)
              </h1>
            ) : (
              <h1 className="text-sm font-medium mb-1">Select ID card type</h1>
            )}

            <div className="font-bold w-48  text-xs">
              <Select name="cardType" onValueChange={handleSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Identity Card Type" />
                </SelectTrigger>
                <SelectContent className="font-bold">
                  <SelectItem value="KTP">KTP</SelectItem>
                  <SelectItem value="SIM">SIM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* upload input */}
            {formValue.idCardType ? (
              <div className="w-full my-5 mx-6 flex flex-col space-y-2 px-5 flex-1 justify-center items-center border-2 border-dotted border-black/15">
                <h1 className="font-semibold">
                  Please upload your{" "}
                  <span className="font-bold">{formValue.idCardType}</span>{" "}
                  below
                </h1>
                <IoArrowDownOutline />

                <Input
                  className="w-56"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  id="id_card"
                  name="id_card"
                  onChange={handleUpload}
                  placeholder="ok"
                />
              </div>
            ) : (
              <div className="flex w-full my-5 mx-6 border-2 border-dotted border-black/15 p-4 flex-col space-y-1.5 px-5 flex-1 justify-center items-center font-semibold ">
                <h1>Please select the type of identity card first.</h1>
              </div>
            )}
          </div>
        )}

        {formValue.idCard && (
          <>
            <div className="flex flex-col h-[350px] justify-center items-center px-10">
              <Image
                src={formValue.idCard}
                width={300}
                height={300}
                className="object-cover h-[300px] w-[450px] rounded-lg border-4 p-1"
                alt="kartu identias"
              />
              <Button
                onClick={() =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    idCard: null,
                    idCardType: null,
                  }))
                }
                variant="link"
                className="font-bold mt-2 w-[200px] "
              >
                Change File
              </Button>
            </div>
          </>
        )}

        <div className="flex justify-between pt-5">
          <Button onClick={() => setStep("1")} variant="outline">
            previous
          </Button>
          {formValue.idCard && (
            <Button onClick={() => setStep("3")} className="w-24">
              next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
