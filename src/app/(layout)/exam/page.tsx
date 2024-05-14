import Container from "@/components/container";
import CardUjian from "@/components/pilih-ujian/card-ujian";
import { getSession } from "@/lib/session";
import { Suspense } from "react";

type TExam = {
  id: string;
  title: string;
  start: string;
  end: string;
  reg_start: string;
  reg_end: string;
  status: boolean;
};

async function getExams() {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (accessToken) {
      const res = await fetch("http://localhost:3001/exams", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch exams data:", res.statusText);
        return [];
      }
      return res.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching exams data:", error);
    return [];
  }
}

export default async function ExamPage() {
  const { data: exams } = await getExams();
  return (
    <Container className="my-6">
      <div className="flex flex-wrap justify-center items-center gap-10">
        <Suspense fallback={<p className="text-center text-5xl">Loading...</p>}>
          {exams.length > 0 ? (
            exams.map((exam: TExam) => <CardUjian key={exam.id} exam={exam} />)
          ) : (
            <p>Tidak ada ujian tersedia</p>
          )}
        </Suspense>
      </div>
    </Container>
  );
}
