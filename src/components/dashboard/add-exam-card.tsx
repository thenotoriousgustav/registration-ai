/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "./date-picker-range";
import { cache, useEffect, useState } from "react";
import { getCombinedDateTime } from "@/lib/utils";
import { getSession } from "@/lib/session";
import { toast } from "../ui/use-toast";

export const revalidate = 0;

export function AddExamCard({ setIsFetch }: any) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [formValue, setFormValue] = useState<any>({
    title: "",
    reg_start_date: "",
    reg_end_date: "",
    reg_start_time: "",
    reg_end_time: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    settings: {
      use_ai: "",
      duration: "",
      question_count: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   console.log(formValue);
  // }, [formValue]);

  const handleSelectTime = (e: any, type: string) => {
    setFormValue((prev: any) => ({
      ...prev,
      [type]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: formValue.title,
      reg_start: getCombinedDateTime(
        formValue.reg_start_date,
        formValue.reg_start_time
      ),
      reg_end: getCombinedDateTime(
        formValue.reg_end_date,
        formValue.reg_end_time
      ),
      start: getCombinedDateTime(formValue.start_date, formValue.start_time),
      end: getCombinedDateTime(formValue.end_date, formValue.end_time),
      settings: formValue.settings,
    };

    try {
      const session = await getSession();
      const accessToken = session?.accessToken;
      const res = await fetch(`${BASE_URL}/admin/exams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const result = await res.json();
      if (result.status !== "success") {
        throw result;
      }

      setIsFetch((prev: any) => !prev);
      setIsOpen(false);

      toast({
        variant: "default",
        title: `${result.status}`,
        description: `${result.message}`,
      });
    } catch (error: any) {
      console.log("Error:", error);
      toast({
        variant: "destructive",
        title: `${error.status}`,
        description: `${error.message}`,
      });
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Add Exam
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add new exam</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col  gap-4">
          {/* title */}
          <div>
            <div className="flex flex-col">
              <Label htmlFor="title" className="text-start mb-1">
                Exam Title
              </Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Enter exam title"
                onChange={(e: any) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          {/* registration date */}
          <div className="flex flex-row gap-2 ">
            <div className="flex flex-col flex-1">
              <Label htmlFor="reg_date" className="text-start mb-1">
                Exam Registration Dates
              </Label>

              <DatePickerWithRange setFormValue={setFormValue} type="reg" />
            </div>
          </div>

          {/* registration time */}
          <div className="flex flex-row gap-2  pr-24">
            <div className="flex flex-col flex-1">
              <Label htmlFor="title" className="text-xs text-start mb-1">
                Exam Registration Start Time
              </Label>
              <Input
                type="time"
                required
                onChange={(e) => handleSelectTime(e, "reg_start_time")}
              />
            </div>

            <div className="flex flex-col flex-1">
              <Label htmlFor="title" className="text-xs text-start mb-1">
                Exam Registration End Time
              </Label>
              <Input
                type="time"
                required
                onChange={(e) => handleSelectTime(e, "reg_end_time")}
              />
            </div>
          </div>

          {/* start date */}
          <div className="flex flex-row gap-2 ">
            <div className="flex flex-col flex-1">
              <Label htmlFor="title" className="text-start mb-1">
                Exam Start and End Dates
              </Label>

              <DatePickerWithRange setFormValue={setFormValue} />
            </div>
          </div>

          {/* start time */}
          <div className="flex flex-row gap-2 pr-20">
            <div className="flex flex-col flex-1">
              <Label htmlFor="title" className="text-xs text-start mb-1">
                Exam Start Times
              </Label>
              <Input
                type="time"
                required
                onChange={(e) => handleSelectTime(e, "start_time")}
              />
            </div>

            <div className="flex flex-col flex-1">
              <Label htmlFor="title" className="text-xs text-start mb-1">
                Exam End Times
              </Label>
              <Input
                type="time"
                required
                onChange={(e) => handleSelectTime(e, "end_time")}
              />
            </div>
          </div>

          {/* configuration */}
          <Label
            htmlFor="title"
            className="text-base font-semibold text-start "
          >
            Configurations
          </Label>
          <div className="flex flex-row gap-2 pr-14">
            <div className="flex flex-col ">
              <Label htmlFor="title" className="text-xs text-start mb-1">
                Use AI ?
              </Label>

              <Select
                required
                onValueChange={(value: string) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    settings: { ...prev.settings, use_ai: value },
                  }))
                }
              >
                <SelectTrigger className="w-[110px] text-xs">
                  <SelectValue placeholder="Yes or No ?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col flex-1 ">
              <Label htmlFor="durations" className="text-xs text-start mb-1">
                Durations (in minute)
              </Label>
              <Input
                type="number"
                id="durations"
                name="durations"
                min="1"
                step="1"
                placeholder="Time in minute"
                className="text-xs"
                onChange={(e: any) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    settings: { ...prev.settings, duration: e.target.value },
                  }))
                }
              />
            </div>

            <div className="flex flex-col flex-1 ">
              <Label htmlFor="questions" className="text-xs text-start mb-1">
                Number of Questions
              </Label>
              <Input
                type="number"
                id="questions"
                name="questions"
                min="1"
                step="1"
                placeholder="Question count"
                required
                className="text-xs"
                onChange={(e: any) =>
                  setFormValue((prev: any) => ({
                    ...prev,
                    settings: {
                      ...prev.settings,
                      question_count: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </div>
          <div className=" w-full flex justify-end items-end gap-4 mt-5">
            <Button
              className="w-1/2"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              cancel
            </Button>
            <Button className="w-full" size="sm" type="submit">
              create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
