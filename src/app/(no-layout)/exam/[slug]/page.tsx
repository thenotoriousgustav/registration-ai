"use client";
import TakePhoto from "@/components/form/take-photo";
import { UploadIDCard } from "@/components/form/upload-id-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import RegistrationForm from "@/components/form/registration-form";
import { dataURLtoBlob } from "@/lib/utils";

export default function FormApplicantData({
  params,
}: {
  params: { slug: string };
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [step, setStep] = useState<string>("1");
  const [formValue, setFormValue] = useState({
    examId: "",
    userId: "",
    name: "",
    photo: null,
    idCard: null,
    idCardType: "",
    nik: "",
    pob: "",
    dob: "",
    gender: "",
    religion: "",
    city: "",
    address: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      console.log("77", formValue);
      const photoData = await dataURLtoBlob(formValue.photo!);
      const idCardData = await dataURLtoBlob(formValue.idCard!);

      const profile = {
        full_name: formValue.name,
        pob: formValue.pob,
        dob: formValue.dob,
      };

      const userId = "COBA";

      const applicantData = new FormData();
      applicantData.append("exam_id", params.slug);
      applicantData.append("user_id", userId);
      applicantData.append("id_card_no", formValue.nik);
      applicantData.append("id_card_file", idCardData);
      applicantData.append("id_card_type", formValue.idCardType);
      applicantData.append("photo_file", photoData);
      applicantData.append("id_card_profile", JSON.stringify(profile));

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
    <div className="w-full h-screen  pb-10 flex justify-center py-10 ">
      <Button
        className="top-8 left-5 absolute  transform hover:scale-105 duration-1000"
        variant="link"
      >
        <IoIosArrowBack />
        Back to home
      </Button>

      <Tabs defaultValue="1" value={step} className="w-[700px] h-[550px]">
        <TabsList className="px-3 border bg-card  shadow w-full grid-cols-3 flex gap-3 justify-evenly items-center">
          <div
            className={`
            w-full h-6 rounded-md flex justify-center items-center font-semibold  ${
              step === "1" ? "bg-primary text-white" : "bg-secondary"
            }`}
          >
            Take a Photo
          </div>
          <div
            className={`
            w-full h-6 rounded-md flex justify-center items-center font-semibold  ${
              step === "2" ? "bg-primary text-white" : "bg-secondary"
            }`}
          >
            Upload KTP/SIM
          </div>
          <div
            className={`
            w-full h-6 rounded-md flex justify-center items-center font-semibold  ${
              step === "3" ? "bg-primary text-white" : "bg-secondary"
            }`}
          >
            Registration Form
          </div>
        </TabsList>
        <TabsContent value="1" className="w-full h-full">
          <TakePhoto
            formValue={formValue}
            setFormValue={setFormValue}
            setStep={setStep}
          />
        </TabsContent>

        <TabsContent value="2" className="w-full h-full">
          <UploadIDCard
            formValue={formValue}
            setFormValue={setFormValue}
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
