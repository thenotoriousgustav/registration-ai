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
import { Textarea } from "../ui/textarea";
import Image from "next/image";

export function ApplicationDetailCard({ application }: any) {
  return (
    <Card className="w-[380px] mt-5 overflow-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-extrabold">
          Detail Application
        </CardTitle>
      </CardHeader>
      <CardContent className="m-0 px-5 flex flex-col gap-2">
        {/* applicant_id  */}
        <div className="flex-1 flex items-center text-xs ">
          <Label htmlFor="applicant_id" className="w-[115px] font-bold">
            Application ID
          </Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id}
          </p>
        </div>

        {/* exam_id */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label htmlFor="applicant_id" className="w-[115px] font-bold">
            Exam ID
          </Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.exam_id}
          </p>
        </div>

        {/* applicant_name  */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label htmlFor="applicant_name" className="w-[115px] font-bold">
            Applicant Name
          </Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.name}
          </p>
        </div>

        {/* user_id  */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label htmlFor="user_id" className="w-[115px] font-bold">
            User ID
          </Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.user_id}
          </p>
        </div>

        {/* applicant photo */}
        <div className="flex-1 flex flex-col justify-center gap-2 my-2">
          <div className="flex">
            <Label className="w-[115px] block font-bold ">
              Applicant Photo
            </Label>
            <span className="text-xs font-bold mr-1">:</span>
          </div>
          <Image
            src={application.photo}
            alt="ok"
            width={50}
            height={50}
            className="w-full object-contain h-44 border-2 border-black/15 rounded-sm"
          />
        </div>

        {/* id_card_type  */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label htmlFor="user_id" className="w-[115px] font-bold">
            ID Card Type
          </Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_type}
          </p>
        </div>

        {/* id_card_no  */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label htmlFor="user_id" className="w-[115px] font-bold">
            ID Card No
          </Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_no}
          </p>
        </div>

        {/* id card photo */}
        <div className="flex-1 flex flex-col justify-center gap-2 my-2">
          <div className="flex">
            <Label className="w-[115px] block font-bold ">ID Card Photo</Label>
            <span className="text-xs font-bold mr-1">:</span>
          </div>
          <Image
            src={application.id_card_file}
            alt="ok"
            width={50}
            height={50}
            className="w-full object-contain h-44 border-2 border-black/15 rounded-sm "
          />
        </div>

        {/* pob  */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label className="w-[115px] font-bold">Place of Birth</Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_profile.pob}
          </p>
        </div>

        {/* dob */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label className="w-[115px] font-bold">Date of Birth</Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_profile.dob}
          </p>
        </div>

        {/* gender */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label className="w-[115px] font-bold">Gender</Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_profile.gender}
          </p>
        </div>

        {/* religion */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label className="w-[115px] font-bold">Religion</Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_profile.religion}
          </p>
        </div>

        {/* city */}
        <div className="flex-1 flex  items-center text-xs ">
          <Label className="w-[115px] font-bold">City</Label>
          <p className="uppercase font-medium">
            <span className="font-bold mr-1">:</span>
            {application.id_card_profile.city}
          </p>
        </div>

        {/* address */}
        <div className="flex-1 flex  text-xs ">
          {/* <div className="flex mb-1"> */}
          <Label className=" w-[115px] block font-bold ">Address</Label>
          <span className="font-bold mr-1">:</span>
          <p className=" font-medium  text-black/70">
            {application.id_card_profile.address}
          </p>
          {/* </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
