import Container from "@/components/container";
import CardUjian from "@/components/pilih-ujian/card-ujian";
import { Suspense } from "react";

const MOCK_API = process.env.NEXT_PUBLIC_MOCK_API;

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
  const response = await fetch(`${MOCK_API}/exam`);

  if (!response.ok) {
    throw new Error("failed to fetch users");
  }

  return await response.json();
}

export default async function PilihUjianPage() {
  const exams = await getExams();

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
