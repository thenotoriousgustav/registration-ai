export const dynamic = "force-dynamic";

import Container from "@/components/container";
import ExamCard from "@/components/exams-comp/exam-card";

import { GET } from "@/lib/httpClient";
import { Suspense } from "react";

export default async function ExamsPage() {
  const exams = await GET<any>("/exams");
  const applications = await GET<any>("/applications");

  return (
    <Container className="my-4">
      <Suspense fallback={<p className="text-center text-5xl">Loading...</p>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
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
            <p className="col-span-full text-center">No exams available</p>
          )}
        </div>
      </Suspense>
    </Container>
  );
}
