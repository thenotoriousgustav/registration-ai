import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppContext } from "@/lib/ContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ExamType {
  id: string;
  title: string;
  start: Date;
  end: Date;
  reg_start: Date;
  reg_end: Date;
  status: boolean;
}

export default function CardUjian({
  exam,
}: {
  exam: ExamType;
  redirect: string;
}) {
  const router = useRouter();

  const handleDaftar = () => {
    router.push(`/form-applicant/${exam.id}`);
  };
  return (
    <Card className="w-[350px] hover:-translate-y-2  transform transition-all ">
      <CardHeader className="p-0">
        <Image
          src="/img/img-1.jpeg"
          alt="asdas"
          className="w-full rounded-md object-cover h-46"
          width="0"
          height="0"
          sizes="100vw"
        />
      </CardHeader>
      <CardContent className="pt-6">
        <CardTitle className="text-xl font-semibold">{exam.title}</CardTitle>
        <CardDescription className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet corporis
          illo enim aspernatur odio earum.
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-2">
        <Button onClick={handleDaftar}>Daftar</Button>
      </CardFooter>
    </Card>
  );
}
