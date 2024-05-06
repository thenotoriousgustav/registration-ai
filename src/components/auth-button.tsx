"use client";

import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { deleteSession } from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function AuthButton({ session }: { session: any }) {
  const router = useRouter();

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push(`http://localhost:3001/auth/google/login`);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await deleteSession();
  };

  return (
    <div>
      {session ? (
        <Button onClick={handleLogout}>Log out</Button>
      ) : (
        <Button onClick={handleLogin}>Log in</Button>
      )}
    </div>
  );
}
