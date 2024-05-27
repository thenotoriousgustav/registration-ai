"use client";

import { createSession } from "@/lib/session";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function Auth() {
  return (
    <Suspense fallback={<div>Please wait...</div>}>
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

  return (
    <section className="h-screen w-screen">
      <div className="h-full grid place-content-center text-center">
        <h1 className="text-xl font-semibold">Authenticating</h1>
        <p className="text-gray-500">Cat is validating your identitiy.</p>
        <p className="text-gray-500">Please Wait...</p>
      </div>
    </section>
  );
}
