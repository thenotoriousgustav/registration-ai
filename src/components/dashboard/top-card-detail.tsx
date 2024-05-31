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

export function TopCardDetail({ exam }: any) {
  return (
    <Card className="mt-5 w-full hover:shadow-md transition-shadow duration-300 ">
      <CardHeader className="p-0 pt-4 rounded-t-lg">
        <CardTitle className="text-xl font-extrabold text-center uppercase">
          {exam.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-center gap-10 ">
          <div className="flex-1">
            <h1 className="text-lg font-bold  mx-2">Registration Schedule</h1>
            <div className="flex justify-between items-center bg-gray-200 rounded-xl p-4 mb-4">
              <div>
                <h1 className="text-xs font-semibold mb-1">
                  Registration Start:
                </h1>
                <p className="font-bold">{formatTime(exam.reg_start)}</p>
                <p className="text-xs">{formatDate(exam.reg_start)}</p>
              </div>
              <div>
                <ArrowRightIcon />
              </div>
              <div>
                <h1 className="text-xs font-semibold mb-1">
                  Registration End:
                </h1>
                <p className="font-bold">{formatTime(exam.reg_end)}</p>
                <p className="text-xs">{formatDate(exam.reg_end)}</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
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
          </div>
        </div>

        <div className="flex mx-2  justify-between">
          <div>
            <h1 className="text-lg font-bold">Durations :</h1>
            <p className="text-base font-semibold">
              {formatDuration(exam.settings.duration)}
            </p>
          </div>
          {/* questions */}
          <div>
            <h1 className="text-lg font-bold">Number of Questions : </h1>
            <p className="text-base font-semibold">
              {exam.settings.question_count} Questions
            </p>
          </div>
          {/* status */}
          <div className="mx-2">
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
        </div>
      </CardContent>
    </Card>
  );
}
