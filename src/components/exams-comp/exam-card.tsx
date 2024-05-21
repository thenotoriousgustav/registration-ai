"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate, formatTime } from "@/lib/formatDatetime";
import Image from "next/image";

type Exam = {
  id: string;
  title: string;
  start: string;
  end: string;
  reg_start: string;
  reg_end: string;
  status: ApplicationStatus;
};

type ApplicationStatus = string;

type ExamCardProps = {
  exam: Exam;
  status: ApplicationStatus; // Ensure status is always of type ApplicationStatus
  application: any;
};

export default function ExamCard({ exam, status, application }: ExamCardProps) {
  const getButtonContent = () => {
    switch (status) {
      case "approved":
        return (
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Lihat Kartu Ujian
            </Button>
          </DialogTrigger>
        );
      case "initial":
        return (
          <Button variant="ghost" className="w-full">
            Tunggu Di Approve Admin
          </Button>
        );
      case "rejected":
        return (
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Daftar Ulang</Link>
          </Button>
        );
      default:
        return (
          <Button variant="outline" className="w-full" asChild>
            <Link href={`/exams/registration/${exam.id}`}>Daftar</Link>
          </Button>
        );
    }
  };

  const profile = JSON.parse(application?.profile || "{}");

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="w-full lg:w-[350px] xl:w-[400px] h-auto hover:-translate-y-2 transform transition-all shadow-lg">
      <CardHeader className="p-4 bg-primary text-white rounded-t-lg">
        <CardTitle className="text-2xl font-semibold">{exam.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 text-lg">
        <div className="flex justify-between items-center bg-secondary rounded-xl p-4 mb-4">
          <div>
            <h1 className="text-sm">Mulai:</h1>
            <p className="font-bold">{formatTime(exam.start)};</p>
            <p className="text-sm">{formatDate(exam.start)}</p>
          </div>
          <div>
            <h1 className="text-sm">Selesai:</h1>
            <p className="font-bold">{formatTime(exam.end)}</p>
            <p className="text-sm">{formatDate(exam.end)}</p>
          </div>
        </div>

        <div className="mt-4">
          {status === "approved" ? (
            <h1 className="text-green-500">✅ Terdaftar</h1>
          ) : status === "initial" ? (
            <h1 className="text-yellow-500">⏳ Menunggu</h1>
          ) : status === "rejected" ? (
            <h1 className="text-red-500">❌ Ditolak</h1>
          ) : (
            <h1 className="text-gray-500">😭 Belum Terdaftar</h1>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-100 rounded-b-lg">
        <Dialog>
          {getButtonContent()}
          <DialogContent className="max-w-[40rem]">
            <DialogHeader>
              <DialogTitle>{exam.title}</DialogTitle>
              <h1 className="text-lg font-semibold">
                Kementerian Keuangan - CAT
              </h1>
            </DialogHeader>
            <div className="flex gap-x-8">
              <div>
                <Image
                  src={application?.photo}
                  alt={application?.name}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="w-48 object-cover rounded-lg"
                />
              </div>
              <div className="text-sm font-semibold">
                <h1>Nama: {application?.name}</h1>
                <h1>NIK: {application?.id_card_no}</h1>
                <h1>Tempat Lahir: {profile.pob}</h1>
                <h1>Tanggal Lahir: {profile.dob}</h1>
                <h1>Agama: {profile.religion}</h1>
              </div>
            </div>
            <DialogDescription className="mt-4">
              <p>Harap jangan menyebarkan kartu ujian ini.</p>
            </DialogDescription>
            <div className="py-4 flex justify-between">
              <p className="font-bold">
                {formatTime(exam.start)} - {formatTime(exam.end)}
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handlePrint}>
                Print Kartu Ujian
              </Button>
              <Button variant="default" className="mr-4" asChild>
                <Link href={`/verification/${application?.id}`}>
                  Mulai Ujian
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
