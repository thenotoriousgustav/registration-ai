"use client";
import Container from "@/components/container";
import CardUjian from "@/components/pilih-ujian/card-ujian";
import axios, { AxiosError } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function PilihUjianPage() {
  const MOCK_API = process.env.NEXT_PUBLIC_MOCK_API;

  // const queryClient = useQueryClient();

  const { data: exams, isLoading } = useQuery<any>({
    queryKey: ["exam"],
    queryFn: async () => {
      try {
        const res = await axios.get(`${MOCK_API}/exam`);
        console.log(res);
        return res.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          const res = axiosError.response;
          console.log(res);
          return [];
        } else {
          console.log("Unknown Error:", error);
          return [];
        }
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <h1 className="text-2xl font-bold mt-3">loading...</h1>
      </div>
    );
  }

  return (
    <Container className="my-6">
      <div className="flex justify-between items-center gap-x-10">
        {exams.length > 0 ? (
          exams.map((exam: any) => (
            <CardUjian key={exam.id} exam={exam} redirect="/take-photo" />
          ))
        ) : (
          <p>Tidak ada ujian tersedia</p>
        )}
      </div>
    </Container>
  );
}
