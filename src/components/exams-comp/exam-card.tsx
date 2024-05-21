"use client";

import Image from "next/image";
import { formatDate, formatTime } from "@/lib/formatDatetime";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import formatDuration from "@/lib/formatDuration";

import { LucideArrowRight } from "lucide-react";

export default function ExamCard({ exam, status, application }: any) {
  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300 ">
      <CardHeader className="p-4 rounded-t-lg ">
        <CardTitle className="text-xl font-semibold">{exam.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-l ">
        <div className="flex justify-between items-center bg-gray-200 rounded-xl p-4 mb-4">
          <div>
            <h1 className="text-sm">Start:</h1>
            <p className="font-bold">{formatTime(exam.start)}</p>
            <p className="text-sm">{formatDate(exam.start)}</p>
          </div>
          <div>
            <LucideArrowRight />
          </div>
          <div>
            <h1 className="text-sm">End:</h1>
            <p className="font-bold">{formatTime(exam.end)}</p>
            <p className="text-sm">{formatDate(exam.end)}</p>
          </div>
        </div>
        <div className="flex justify-between my-5">
          <div>
            <h1 className="text-sm">Duration</h1>
            <p className="font-medium">
              {formatDuration(exam.settings.duration)}
            </p>
          </div>
          <div>
            <h1 className="text-sm">Questions</h1>
            <p className="font-medium">{exam.settings.question_count}</p>
          </div>
        </div>
        <div className="mt-4">
          <h1 className="text-sm">Status</h1>
          <div className="font-semibold">
            {status === "approved" ? (
              <h1>✅ Registered</h1>
            ) : status === "initial" ? (
              <h1>⏳ Waiting</h1>
            ) : status === "rejected" ? (
              <h1>❌ Rejected</h1>
            ) : (
              <h1>😭 Not Registered</h1>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-end items-end">
        <Dialog>
          <ButtonContent status={status} exam={exam} />
          <DialogBody application={application} exam={exam} />
        </Dialog>
      </CardFooter>
    </Card>
  );
}

const ButtonContent = ({ status, exam }: any) => {
  switch (status) {
    case "approved":
      return (
        <DialogTrigger asChild>
          <Button variant="default" className="self-end">
            View Exam Card
          </Button>
        </DialogTrigger>
      );
    case "initial":
      return (
        <Button variant="ghost" className="">
          Wait for Admin Approval
        </Button>
      );
    case "rejected":
      return (
        <Button variant="default" className="" asChild>
          <Link href="/">Reapply</Link>
        </Button>
      );
    default:
      return (
        <Button variant="default" className="" asChild>
          <Link href={`/exams/registration/${exam.id}`}>Register</Link>
        </Button>
      );
  }
};

const DialogBody = ({ application, exam }: any) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <DialogContent className="max-w-[40rem]">
      <DialogHeader>
        <DialogTitle>{exam.title}</DialogTitle>
        <h1 className="text-lg font-semibold">Ministry of Finance - CAT</h1>
      </DialogHeader>
      {application && (
        <div className="flex gap-x-8">
          <div>
            <Image
              src={application.photo}
              alt={application.name}
              height={200}
              width={200}
              className="rounded-lg"
            />
          </div>
          <div className="text-sm font-semibold">
            <h1>Name: {application.name}</h1>
            <h1>NIK: {application.id_card_no}</h1>
            <h1>Place of Birth: {application.profile.pob}</h1>
            <h1>Date of Birth: {application.profile.dob}</h1>
            <h1>Religion: {application.profile.religion}</h1>
          </div>
        </div>
      )}
      <DialogDescription className="mt-4">
        <p>Please do not share this exam card.</p>
      </DialogDescription>
      <div className="py-4 flex justify-between">
        <p className="font-bold">
          {formatTime(exam.start)} - {formatTime(exam.end)}
        </p>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={handlePrint}>
          Print Exam Card
        </Button>
        <Button variant="default" asChild className="mr-4">
          <Link href={`/verification/${application?.id}`}>Start Exam</Link>
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
