import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <Container className="my-6 ">
      <section>
        <div>
          <h2 className="text-4xl font-semibold italic">
            Kementerian Keuangan
          </h2>
          <h1 className="text-7xl font-semibold">COMPUTER ASSISTED TEST.</h1>
        </div>
        <div className="mt-8">
          <Image
            src="/img/view.jpeg"
            alt="asd"
            width="0"
            height="0"
            sizes="100vw"
            className="mx-auto h-80 w-full object-cover rounded-lg"
          />
        </div>

        <Button className="mt-8" asChild>
          <Link href="/exams">Go to Exams</Link>
        </Button>
      </section>
    </Container>
  );
}
