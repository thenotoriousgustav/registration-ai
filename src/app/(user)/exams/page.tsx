import Container from "@/components/container";
import ExamCard from "@/components/exams-comp/exam-card";

import { GET } from "@/lib/httpClient";
import { Suspense } from "react";

type Exam = {
  id: string;
  title: string;
  start: string;
  end: string;
  reg_start: string;
  reg_end: string;
  status: string;
};

type Application = {
  status: string;
  exam_id: string;
};

export default async function ExamPage() {
  const exams = await GET<any>("/exams");
  const applications = await GET<Application[]>(`/applications`);

  return (
    <Container className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        <Suspense fallback={<p className="text-center text-5xl">Loading...</p>}>
          {exams?.length > 0 ? (
            exams?.map(async (exam: Exam) => {
              const application = applications?.find(
                (app) => app.exam_id === exam.id
              );
              const status = application ? application.status : "";

              return (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  status={status}
                  application={application}
                />
              );
            })
          ) : (
            <p className="col-span-full text-center">
              Tidak ada ujian tersedia
            </p>
          )}
        </Suspense>
      </div>
    </Container>
  );
}
