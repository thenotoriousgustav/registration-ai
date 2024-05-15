import Link from "next/link";
import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <Container className="my-6 ">
      <section>
        <div>
          <h2 className="text-4xl font-semibold italic">Kemenkeu</h2>
          <h1 className="text-7xl font-semibold">COMPUTER ASSISTED TEST.</h1>
        </div>
        <div className="mt-8">
          <Image
            src="/img/img-1.jpeg"
            alt="asd"
            width="0"
            height="0"
            sizes="100vw"
            className="mx-auto h-80 w-full object-cover rounded-lg"
          />
        </div>

        <Button className="mt-8" asChild>
          <Link href="/exam">Exam</Link>
        </Button>
      </section>
    </Container>
  );
}
