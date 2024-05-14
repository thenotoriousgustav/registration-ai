"use client";
import TakePhoto from "@/components/form/take-photo";
import { UploadIDCard } from "@/components/form/upload-id-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import RegistrationForm from "@/components/form/registration-form";
import { dataURLtoBlob } from "@/lib/utils";

export default function FormApplicantData() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
    dob: "",
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

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   try {
  //     event.preventDefault();
  //     const applicantData = new FormData();
  //     applicantData.append("exam_id", formValue.examId);
  //     // applicantData.append("user_id", formValue.userId);
  //     applicantData.append("id_card_type", formValue.cardType);
  //     applicantData.append("id_card_no", formValue.NIK);

  //     const profile = {
  //       full_name: formValue.name,
  //       pob: formValue.pob as string,
  //       dob: formValue.dob as string,
  //     };
  //     applicantData.append("profile", JSON.stringify(profile));

  //     const photoData = await dataURLtoBlob(photo);
  //     const idCardData = await dataURLtoBlob(idCard);
  //     applicantData.append("photo_file", photoData);
  //     applicantData.append("id_card_file", idCardData);

  //     const res = await fetch(`${BASE_URL}/applications`, {
  //       method: "POST",
  //       body: applicantData,
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log(res);
  //     return res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("77", formValue);
    const photoData = await dataURLtoBlob(photo);
    const idCardData = await dataURLtoBlob(idCard);
    console.log("80", photoData);
    console.log("81", idCardData);
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
