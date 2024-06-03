/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { useEffect, useState } from "react";

export function ApplicantDetailDialog({ applicantId }: any) {
  const [applicant, setApplicant] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const session = await getSession();
        const accessToken = session?.accessToken;

        const res = await fetch(
          `${BASE_URL}/admin/applications/${applicantId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw errorData;
        }

        const data = await res.json();
        if (data.status !== "success") {
          throw data;
        }

        console.log(data);
        setApplicant(data.data);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setApplicant(null);
      }
    };
    fetchData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl font-bold mb-2">
            Detail Applicant
          </DialogTitle>
        </DialogHeader>
        {/* applicant_id exam_id */}
        <div className="flex gap-5 mx-2">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="applicant_id" className="mb-1 ml-1 text-xs">
              Applicant ID
            </Label>
            <Input
              id="applicant_id"
              defaultValue={applicant.id}
              className=""
              readOnly
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="exam_id" className="mb-1 ml-1 text-xs">
              Exam ID
            </Label>
            <Input
              id="exam_id"
              defaultValue={applicant.exam_id}
              className=""
              readOnly
            />
          </div>
        </div>

        {/* applicant_name user_id */}
        <div className="flex gap-5 mx-2 items-start">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="applicant_name" className="mb-1 ml-1 text-xs">
              Applicant Name
            </Label>
            <Input
              id="applicant_name"
              defaultValue={applicant.name}
              className=""
              readOnly
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="user_id" className="mb-1 ml-1 text-xs">
              User ID
            </Label>
            <Input
              id="user_id"
              defaultValue={applicant.user_id}
              className=""
              readOnly
            />
          </div>
        </div>

        {/* id_card_type id_card_no */}
        <div className="flex gap-5 mx-2 items-start">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="id_card_type" className="mb-1 ml-1 text-xs">
              ID Card Type
            </Label>
            <Input
              id="id_card_type"
              defaultValue={applicant.id_card_type}
              className=""
              readOnly
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="id_card_no" className="mb-1 ml-1 text-xs">
              ID Card No
            </Label>
            <Input
              id="id_card_no"
              defaultValue={applicant.id_card_no}
              className=""
              readOnly
            />
          </div>
        </div>

        {/* id_card_file  id_card_type id_card_no */}
        <div className="flex gap-5 mx-2  items-start">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="applicant_photo" className="mb-1 ml-1 text-xs">
              Applicant Photo
            </Label>
            <Image
              src={applicant.photo}
              alt="ok"
              width={50}
              height={50}
              className="w-full object-contain h-36 border-2 border-black/15 rounded-sm bg-red-200"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="applicant_photo" className="mb-1 ml-1 text-xs">
              ID Card
            </Label>
            <Image
              src={applicant.id_card_file}
              alt="ok"
              width={50}
              height={50}
              className="w-full object-contain h-36 border-2 border-black/15 rounded-sm bg-red-200"
            />
          </div>
        </div>

        {/* pob dob */}
        <div className="flex gap-5 mx-2">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="pob" className="mb-1 ml-1 text-xs">
              Place of Birth
            </Label>
            <Input
              id="pob"
              defaultValue={applicant.id_card_profile.pob}
              className=""
              readOnly
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="dob" className="mb-1 ml-1 text-xs">
              Date of Birth
            </Label>
            <Input
              id="dob"
              defaultValue={applicant.id_card_profile.dob}
              className=""
              readOnly
            />
          </div>
        </div>

        {/* gender religion */}
        <div className="flex gap-5 mx-2">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="gender" className="mb-1 ml-1 text-xs">
              Gender
            </Label>
            <Input
              id="gender"
              defaultValue={applicant.id_card_profile.gender}
              className=""
              readOnly
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="religion" className="mb-1 ml-1 text-xs">
              Religion
            </Label>
            <Input
              id="religion"
              defaultValue={applicant.id_card_profile.religion}
              className=""
              readOnly
            />
          </div>
        </div>

        {/* city address */}
        <div className="flex gap-5 mx-2 items-start">
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="city" className="mb-1 ml-1 text-xs">
              City
            </Label>
            <Input
              id="city"
              defaultValue={applicant.id_card_profile.city}
              className=""
              readOnly
            />
          </div>
          <div className="flex-1 flex flex-col justify-center ">
            <Label htmlFor="address" className="mb-1 ml-1 text-xs">
              Address
            </Label>
            <Textarea
              id="address"
              cols={1}
              rows={1}
              defaultValue={applicant.id_card_profile.address}
              className=""
              readOnly
            />
          </div>
        </div>
        <DialogFooter className="mt-5 w-full">
          <DialogClose asChild>
            <Button size="sm" className="w-full">
              close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
