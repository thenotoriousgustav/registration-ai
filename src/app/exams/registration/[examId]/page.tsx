"use client";

import TakePhoto from "@/components/exams-comp/registration-comp/take-photo";
import { UploadIDCard } from "@/components/exams-comp/registration-comp/upload-id-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import RegistrationForm from "@/components/exams-comp/registration-comp/registration-form";
import { dataURLtoBlob } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";

export default function RegistrationExamPage({
  params,
}: {
  params: { examId: string };
}) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();

  const [step, setStep] = useState<string>("1");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      event.preventDefault();
      const session = await getSession();
      const accessToken = session?.accessToken;

      const photoData = await dataURLtoBlob(formValue.photo!);
      const idCardData = await dataURLtoBlob(formValue.idCard!);

      const profile = {
        full_name: formValue.name,
        pob: formValue.pob,
        dob: formValue.dob,
        religion: formValue.religion,
        gender: formValue.religion,
        address: formValue.address,
        city: formValue.city,
      };

      const filePhoto = new File([photoData], "picture.png", {
        type: "image/png",
      });
      const fileIdCard = new File([idCardData], "picture.png", {
        type: "image/png",
      });

      console.log(filePhoto);

      const applicantData = new FormData();
      applicantData.append("exam_id", params.examId);
      applicantData.append("name", formValue.name);
      applicantData.append("photo", filePhoto);
      applicantData.append("id_card_type", formValue.idCardType);
      applicantData.append("id_card_no", formValue.nik);
      applicantData.append("id_card_file", fileIdCard);
      applicantData.append("profile", JSON.stringify(profile) as string);

      const { status, message, data } = await fetch(
        `${BASE_URL}/applications`,
        {
          method: "POST",
          body: applicantData,
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((res) => res.json());

      console.log(status);
      if (status == "success") {
        localStorage.setItem(
          "message",
          "Successfully apply, please wait for further information"
        );
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen  pb-10 flex justify-center py-10 ">
      {loading && <Spinner />}
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
