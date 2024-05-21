import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Container from "./container";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { getSession } from "@/lib/session";
import { AuthButton } from "./auth-button";
import { GET } from "@/lib/httpClient";

type Profile = {
  username: string;
  name: string;
  sub: string;
  picture: string;
  iat: number;
  exp: number;
};

export default async function Navigation() {
  const profile = await GET<Profile>("/auth/profile");
  const session = await getSession();

  return (
    <Container className="py-4">
      <nav className="flex justify-between">
        <div>
          <Link href="/" className="text-lg font-semibold">
            Kemenkeu CAT
          </Link>
        </div>

        <div className="flex items-center">
          <AuthButton session={session} profile={profile} />
          <NavigationSheet />
        </div>
      </nav>
    </Container>
  );
}

const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="p-0">
          <TextAlignJustifyIcon width="36" height="36" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="with-cutout">
        <SheetHeader>
          <SheetTitle>Kemenkeu</SheetTitle>
          <SheetDescription>Computer Assisted Test</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start mt-10">
          <Button variant="link" className="p-0 text-lg font-medium" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="link" className="p-0 text-lg font-medium" asChild>
            <Link href="/exams">Exams</Link>
          </Button>
        </div>
        <Separator className="my-6" />
      </SheetContent>
    </Sheet>
  );
};
