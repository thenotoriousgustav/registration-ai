/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExamDetailCard from "@/components/dashboard/detail-exam-card";
import { assignLabel } from "@/lib/utils";
import { AddExamCard } from "@/components/dashboard/add-exam-card";
import { getSession } from "@/lib/session";
import { BackButton } from "@/components/dashboard/back-button";

const DashboardPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [filter, setFilter] = useState("all");
  const [data, setData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        const accessToken = session?.accessToken;

        const res = await fetch(`${BASE_URL}/admin/exams`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw errorData;
        }

        const fetchedData = await res.json();
        if (fetchedData.status !== "success") {
          throw data;
        }

        setData(assignLabel(fetchedData.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [BASE_URL, isFetch]);

  useEffect(() => {
    const newData =
      filter !== "all"
        ? data.filter((exam: any) => exam.status === filter)
        : data;
    setFilteredData(newData);
  }, [filter, data]);

  return (
    <div className="container mx-auto py-10">
      <BackButton label="home" href="/" />
      <div className="mt-3 flex gap-5">
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-[180px] mb-4">
            <SelectValue placeholder="Filter exams by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">All Exams</SelectItem>
              <SelectItem value="registration_not_open">
                Upcoming Registration
              </SelectItem>
              <SelectItem value="registration_open">
                Open for Registration
              </SelectItem>
              <SelectItem value="exam_soon">Upcoming Exams</SelectItem>
              <SelectItem value="exam_today">Today's Exams</SelectItem>
              <SelectItem value="exam_ongoing">Ongoing Exams</SelectItem>
              <SelectItem value="exam_finished">Finished Exams</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <AddExamCard setIsFetch={setIsFetch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
        {filteredData.length > 0 ? (
          filteredData.map((exam: any) => (
            <ExamDetailCard key={exam.id} exam={exam} setIsFetch={setIsFetch} />
          ))
        ) : (
          <p>There is no data</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
