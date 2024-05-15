"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function CobaPage() {
  const router = useRouter();
  const handleClick = () => {
    localStorage.setItem("message", "Halo bro");
    router.push("/");
  };
  return (
    <div>
      <Button onClick={handleClick}>redirect with message</Button>
    </div>
  );
}
