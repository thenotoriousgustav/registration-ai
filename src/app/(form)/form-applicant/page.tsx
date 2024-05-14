"use client";
import TakePhoto from "@/components/form/take-photo";
import { UploadIDCard } from "@/components/form/upload-id-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import RegistrationForm from "@/components/form/registration-form";

export default function TabsDemo() {
  const [step, setStep] = useState<string>("1");
  const [photo, setPhoto] = useState<any>(null);
  const [idCard, setIdCard] = useState<any>(null);
  const [formValue, setFormValue] = useState({
    examId: "",
    userId: "",
    name: "",
    cardType: "",
    NIK: "",
    pob: "",
    gender: "",
    religion: "",
    city: "",
    address: "",
  });

  // cek examId, kalo gk ada redirect
  // if (!examId) {
  //   localStorage.setItem(
  //     "message",
  //     "Anda dialihkan!, anda belum diizinkan untuk mengakses halaman tersebut."
  //   );
  //   router.push(`/`);
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const applicantData = new FormData();
      applicantData.append("name", event.currentTarget.name);
      applicantData.append("nik", event.currentTarget.nik);

      const id_card_profile = {
        pob: event.currentTarget.pob as string,
        dob: event.currentTarget.dob as string,
      };

      applicantData.append("id_card_profile", id_card_profile as any);

      // const photoData = await dataURLtoBlob(photo);
      // const ktpData = await dataURLtoBlob(ktp);

      // applicantData.append("foto", photoData);
      // applicantData.append("ktp", ktpData);
      applicantData.append("tipeFile", "ktp|sim");
      applicantData.append("user_id", "userId");
      applicantData.append("exam_id", "examId");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: applicantData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen pt-8 pb-12 flex justify-center items-center ">
      <Button
        className="top-8 left-5 absolute  transform hover:scale-105  hover:text-yellow-800 duration-1000"
        variant="link"
      >
        <IoIosArrowBack />
        Kembali
      </Button>

      <Tabs defaultValue="1" value={step} className="w-[800px] h-[500px]">
        <TabsList className="grid w-full grid-cols-3 ">
          <TabsTrigger value="1" disabled className="active:text-red-200">
            Foto Wajah
          </TabsTrigger>
          <TabsTrigger value="2" disabled className="active:text-red-200">
            Upload KTP/SIM
          </TabsTrigger>
          <TabsTrigger value="3" disabled className="active:text-red-200">
            Upload KTP/SIM
          </TabsTrigger>
        </TabsList>
        <TabsContent value="1" className="w-full h-full">
          <TakePhoto photo={photo} setPhoto={setPhoto} setStep={setStep} />
        </TabsContent>

        <TabsContent value="2" className="w-full h-full">
          <UploadIDCard
            formValue={formValue}
            setFormValue={setFormValue}
            idCard={idCard}
            setIdCard={setIdCard}
            setStep={setStep}
          />
        </TabsContent>

        <TabsContent value="3" className="w-full h-full">
          <RegistrationForm
            formValue={formValue}
            setFormValue={setFormValue}
            handleSubmit={handleSubmit}
            setStep={setStep}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
