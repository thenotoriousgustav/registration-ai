"use client";

import { formatDate, formatTime } from "@/lib/formatDatetime";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import formatDuration from "@/lib/formatDuration";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getSession } from "@/lib/session";
import { toast } from "../ui/use-toast";
import { useEffect, useState } from "react";

export default function ExamDetailCard({ exam, setIsFetch }: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const status = "ok";

  const handlePublish = async (examId: string, examStatus: any) => {
    try {
      const updatedStatus = { status: !examStatus };

      const session = await getSession();
      const accessToken = session?.accessToken;
      const res = await fetch(`${BASE_URL}/admin/exams/${examId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedStatus),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const data = await res.json();
      if (data.status !== "success") {
        throw data;
      }

      let message = "publish";
      if (!data.data.status) {
        message = "unpublish";
      }

      setIsFetch((prev: any) => !prev);
      toast({
        variant: "default",
        title: `${data.status} ${message}ing exam`,
        description: `${data.data.title} is ${message}ed`,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: `${error.status}`,
        description: error.message,
      });
    }
  };

  const handleDelete = async (examId: string) => {
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;
      const res = await fetch(`${BASE_URL}/admin/exams/${examId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const data = await res.json();
      if (data.status !== "success") {
        throw data;
      }
      setIsFetch((prev: any) => !prev);
      toast({
        variant: "default",
        title: `${data.status}`,
        description: data.message,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: `${error.status}`,
        description: error.message,
      });
    }
  };

  const handleUpdate = async (examId: string) => {
    try {
      const session = await getSession();
      const accessToken = session?.accessToken;
      const res = await fetch(`${BASE_URL}/admin/exams/${examId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const data = await res.json();
      if (data.status !== "success") {
        throw data;
      }
      setIsFetch((prev: any) => !prev);
      toast({
        variant: "default",
        title: `${data.status}`,
        description: data.message,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: `${error.status}`,
        description: error.message,
      });
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300 ">
      <CardHeader className="p-0 pt-4 rounded-t-lg">
        <CardTitle className="text-xl font-extrabold text-center uppercase">
          {exam.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <h1 className="text-lg font-bold  mx-2">Registration Schedule</h1>
        <div className="flex justify-between items-center bg-gray-200 rounded-xl p-4 mb-4">
          <div>
            <h1 className="text-xs font-semibold mb-1">Registration Start:</h1>
            <p className="font-bold">{formatTime(exam.reg_start)}</p>
            <p className="text-xs">{formatDate(exam.reg_start)}</p>
          </div>
          <div>
            <ArrowRightIcon />
          </div>
          <div>
            <h1 className="text-xs font-semibold mb-1">Registration End:</h1>
            <p className="font-bold">{formatTime(exam.reg_end)}</p>
            <p className="text-xs">{formatDate(exam.reg_end)}</p>
          </div>
        </div>

        <h1 className="text-lg font-bold mx-2">Exam Schedule</h1>
        <div className="flex justify-between items-center bg-gray-200 rounded-xl p-4 mb-4">
          <div>
            <h1 className="text-xs font-semibold mb-1">Exam Start:</h1>
            <p className="font-bold">{formatTime(exam.start)}</p>
            <p className="text-xs">{formatDate(exam.start)}</p>
          </div>
          <div>
            <ArrowRightIcon />
          </div>
          <div>
            <h1 className="text-xs font-semibold mb-1">Exam End:</h1>
            <p className="font-bold">{formatTime(exam.end)}</p>
            <p className="text-xs">{formatDate(exam.end)}</p>
          </div>
        </div>
        <div className="flex justify-between mt-5 mx-2">
          <div>
            <h1 className="text-sm font-bold">Durations :</h1>
            <p className="text-xs font-bold">
              {formatDuration(exam.settings.duration)}
            </p>
          </div>
          <div>
            <h1 className="text-sm font-bold">Number of Questions : </h1>
            <p className="text-xs font-bold">
              {exam.settings.question_count} Questions
            </p>
          </div>
        </div>
        <div className="mt-6 mx-2">
          <h1 className="text-lg font-bold">Status of Exam :</h1>
          <div className="font-semibold text-base">
            {exam.label === "registration_not_open" ? (
              <h1>✅Registration is not open yet</h1>
            ) : exam.label === "registration_open" ? (
              <h1>⏳Registration is currently open</h1>
            ) : exam.label === "exam_soon" ? (
              <h1>❌The exam is coming up soon</h1>
            ) : exam.label === "exam_today" ? (
              <h1>😭The exam is scheduled for today</h1>
            ) : exam.label === "exam_ongoing" ? (
              <h1>🏃The exam is currently in ongoing</h1>
            ) : exam.label === "exam_finished" ? (
              <h1>🎉The exam has finished</h1>
            ) : (
              <h1>Unknown Status</h1>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-0 pb-4  mx-5 flex gap-3 justify-center  items-center">
        <Button variant="outline" asChild size="sm" className="flex-1">
          <Link href={`/dashboard/${exam.id}`}>See Applicants</Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => handlePublish(exam.id, exam.status)}
        >
          {exam.status ? "unpublish" : "publish"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => handleUpdate(exam.id)}
        >
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => handleDelete(exam.id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
