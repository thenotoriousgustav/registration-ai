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
} from "../../ui/dialog";
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

export default function CardUjian({ exam }: { exam: TExam }) {
  let status = "";

  return (
    <Card className="w-[600px] md:w-[500px] h-[350px] hover:-translate-y-2  transform transition-all ">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{exam.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-lg">
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

        <div>
          {status === "terdaftar" ? (
            <h1>✅ Terdaftar</h1>
          ) : status === "menunggu" ? (
            <h1>⏳ Menunggu</h1>
          ) : status === "ditolak" ? (
            <h1>❌ Ditolak</h1>
          ) : (
            <h1>😭 Belum Terdaftar</h1>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-2">
        {status === "terdaftar" ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Lihat Kartu Ujian</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{exam.title}</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <div>
                <span>
                  {new Date(exam.start).toLocaleTimeString()} -{" "}
                  {new Date(exam.end).toLocaleTimeString()}
                </span>
              </div>
              <DialogFooter>
                <Button variant="outline" asChild>
                  <Link href="/">Mulai Ujian</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : status === "menunggu" ? null : status === "ditolak" ? null : (
          <Button asChild>
            <Link href={"/exam/" + exam.id}>Daftar</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
