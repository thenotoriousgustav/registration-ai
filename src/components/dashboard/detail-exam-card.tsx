import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/formatDate";
import { formatDay } from "@/lib/formatDay";

type TExam = {
  id: string;
  title: string;
  start: string;
  end: string;
  reg_start: string;
  reg_end: string;
  status: boolean;
};

// async function getExam(id: string): Promise<{ data: TExam } | null> {
//   try {
//     const session = await getSession();
//     const accessToken = session?.accessToken;

//     if (accessToken) {
//       const res = await fetch(`http://localhost:3001/exams/${id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (!res.ok) {
//         console.error("Failed to fetch exams data:", res.statusText);
//         return null;
//       }
//       return res.json();
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching exams data:", error);
//     return null;
//   }
// }

export const DetailExamCard = async ({ id }: { id: string }) => {
  // const result = await getExam(id);
  // const exam = result?.data;

  // masih nanti
  const exam: TExam = {
    id: "1",
    title: "Exam Future",
    start: "2024-06-01T10:00:00Z", // Mulai ujian pada 1 Juni 2024
    end: "2024-06-01T12:00:00Z", // Selesai ujian pada 1 Juni 2024
    reg_start: "2024-05-25T00:00:00Z", // Pendaftaran mulai pada 25 Mei 2024
    reg_end: "2024-05-31T23:59:59Z", // Pendaftaran selesai pada 31 Mei 2024
    status: true,
  };

  // sudah lewat
  // const exam: TExam = {
  //   id: "2",
  //   title: "Exam Past",
  //   start: "2024-04-01T10:00:00Z", // Mulai ujian pada 1 April 2024
  //   end: "2024-04-01T12:00:00Z", // Selesai ujian pada 1 April 2024
  //   reg_start: "2024-03-25T00:00:00Z", // Pendaftaran mulai pada 25 Maret 2024
  //   reg_end: "2024-03-31T23:59:59Z", // Pendaftaran selesai pada 31 Maret 2024
  //   status: true,
  // };

  if (!exam) {
    return <div>Failed to load exam data</div>;
  }

  const currentDate = new Date();
  const startDate = new Date(exam.start);
  const endDate = new Date(exam.end);
  const regStartDate = new Date(exam.reg_start);
  const regEndDate = new Date(exam.reg_end);

  let statusMessage = "";
  if (currentDate < regStartDate) {
    statusMessage = `Pendaftaran belum dimulai, dan akan dimulai pada: ${formatDate(
      exam.reg_start
    )} - ${formatDate(exam.reg_end)}`;
  } else if (currentDate >= regStartDate && currentDate < startDate) {
    statusMessage = `Pendaftaran sedang berlangsung pada: ${formatDate(
      exam.reg_start
    )} - ${formatDate(exam.reg_end)}`;
  } else if (currentDate >= startDate && currentDate < endDate) {
    statusMessage = `Ujian sedang berlangsung pada: ${formatDate(
      exam.start
    )} - ${formatDate(exam.end)} dan akan selesai pada ${formatDate(exam.end)}`;
  } else {
    statusMessage = `Ujian sudah berakhir pada: ${formatDate(exam.end)}`;
  }

  return (
    <Card className="w-full h-[300px]">
      <CardHeader>
        <CardTitle>{exam.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Exam ID: {exam.id}</p>
        <div className="flex justify-between items-center bg-secondary rounded-xl p-6">
          <div>
            <h1 className="text-sm">Mulai:</h1>
            <p className="font-bold">{formatDate(exam.start)}</p>
            <p className="text-sm">{formatDay(exam.start)}</p>
          </div>
          <div>
            <h1 className="text-sm">Selesai:</h1>
            <p className="font-bold">{formatDate(exam.end)}</p>
            <p className="text-sm">{formatDay(exam.end)}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg">{statusMessage}</p>
        </div>
      </CardContent>
    </Card>
  );
};
