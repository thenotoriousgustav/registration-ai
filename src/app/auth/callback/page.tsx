"use client";

import { createSession } from "@/lib/session";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallback />
    </Suspense>
  );
}

function GoogleCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function handleGoogleResponse() {
      const accessToken = params.get("token");

      if (accessToken) {
        await createSession(accessToken);

        router.push("/");
      }
    }

    handleGoogleResponse();
  }, [params, router]);

  return <div>Loading...</div>;
}
