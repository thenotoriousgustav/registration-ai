import Link from "next/link";
import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Container className="my-6 ">
      <div className="flex items-center mb-14">
        <Avatar>
          <AvatarImage src="https://github.com/thenotoriousgustav.png" />
          <AvatarFallback>Gustam Rheza</AvatarFallback>
        </Avatar>
        <h1 className="text-xl ml-4">Home Page</h1>
      </div>
      <Button className="mt-4" asChild>
        <Link href="/pilih-ujian">Pilih Ujian</Link>
      </Button>
    </Container>
  );
}
