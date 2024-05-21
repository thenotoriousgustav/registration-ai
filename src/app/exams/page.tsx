import Container from "@/components/container";
import ExamCard from "@/components/exams-comp/exam-card";

import { GET } from "@/lib/httpClient";
import { Suspense } from "react";

export default async function ExamPage() {
  const exams = await GET<any>("/exams");
  const applications = await GET<any>("/applications");

  return (
    <Container className="my-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        <Suspense fallback={<p className="text-center text-5xl">Loading...</p>}>
          {exams?.length > 0 ? (
            exams?.map(async (exam: any) => {
              const application = applications?.find(
                (app: any) => app.exam_id === exam.id
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
