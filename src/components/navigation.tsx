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

async function getProfile() {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    console.log(accessToken);

    if (accessToken) {
      const res = await fetch("http://localhost:3001/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch profile data:", res.statusText);
        return null;
      }
      return res.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}

export default async function Navigation() {
  const profile = await getProfile();
  const session = await getSession();

  return (
    <Container className="border-b py-6">
      <nav className="flex justify-between">
        <Sheet key="left">
          <SheetTrigger asChild>
            <Button variant="link" className="p-0">
              <TextAlignJustifyIcon width="36" height="36" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>CAT</SheetTitle>
              <SheetDescription>Ini Navigasi Cat</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col items-start mt-10">
              <Button
                variant="link"
                className="p-0 text-lg font-medium"
                asChild
              >
                <Link href="/">Home</Link>
              </Button>
              <Button
                variant="link"
                className="p-0 text-lg font-medium"
                asChild
              >
                <Link href="/pilih-ujian">Pilih Ujian</Link>
              </Button>
            </div>

            <Separator className="my-6" />
          </SheetContent>
        </Sheet>

        <AuthButton session={session} profile={profile} />
      </nav>
    </Container>
  );
}
