import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GET } from "@/lib/httpClient";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { formatDate } from "@/lib/formatDatetime";

type TProfile = {
  username: string;
  name: string;
  sub: string;
  picture: string;
  iat: number;
  exp: number;
};

type TExam = {
  id: string;
  title: string;
  start: string;
  end: string;
  status: boolean;
  applications: any[];
  application: any;
};

export default async function ProfilePage() {
  const profileData = await GET<TProfile>("/auth/profile");
  const examsData = await GET<TExam[]>("/exams");

  const [profile, exams] = await Promise.all([profileData, examsData]);

  // const examsWithApplications = exams?.map((exam) => ({
  //   ...exam,
  //   application: exam.applications.find(
  //     (application) => application.user_id === profile?.sub
  //   ),
  // }));

  const registeredExams = exams?.filter((exam) =>
    exam.applications.some(
      (application) => application.user_id === profile?.sub
    )
  );

  return (
    <section>
      <Container>
        <h1 className="text-9xl">{profile?.name}</h1>
        <div className="mt-10 flex items-center gap-x-4">
          <Avatar>
            <AvatarImage src={profile?.picture} />
            <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="font-semibold">{profile?.username}</p>
        </div>
      </Container>
      <Separator className="my-10" />
      <Container>
        <h2 className="text-2xl font-semibold">Registered Exams</h2>
        <Suspense fallback={<p className="text-center text-5xl">Loading...</p>}>
          <div className="flex gap-x-10 mt-8">
            {registeredExams && registeredExams.length > 0 ? (
              registeredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="w-80 p-6 bg-secondary rounded-md "
                >
                  <h3 className="text-xl font-bold">{exam.title}</h3>
                  <div className="mt-4">
                    <p className="text-sm">Start: {formatDate(exam.start)}</p>
                    <p className="text-sm">End: {formatDate(exam.end)}</p>

                    <p className="text-sm">Status: {exam.application.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center">
                You have not registered for any exams.
              </p>
            )}
          </div>
        </Suspense>
      </Container>
    </section>
  );
}
