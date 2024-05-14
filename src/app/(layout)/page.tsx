import Link from "next/link";
import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Container className="my-6 ">
      <h1 className="text-3xl font-semibold">Home Page</h1>

      <Button className="mt-8" asChild>
        <Link href="/exam">Exam</Link>
      </Button>
    </Container>
  );
}
