import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { DialogUjian } from "./dialog-ujian";

export default function CardUjian({ redirect }: { redirect: string }) {
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
        <CardTitle className="text-xl font-semibold">Lorem, ipsum.</CardTitle>
        <CardDescription className="mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet corporis
          illo enim aspernatur odio earum.
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-2">
        {/* <Button asChild>
          <Link href={redirect}>Daftar</Link>
        </Button> */}
        <DialogUjian />
      </CardFooter>
    </Card>
  );
}
