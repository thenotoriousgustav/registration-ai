"use client";

import { createSession } from "@/lib/session";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function GoogleCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallbackContent />
    </Suspense>
  );
}

function GoogleCallbackContent() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function handleGoogleResponse() {
      const accessToken = params.get("token");

      if (accessToken) {
        // Simpan access token ke cookies menggunakan createSession()
        await createSession(accessToken as string);

        // Redirect ke halaman home setelah berhasil menyimpan access token
        router.push("/");
      }
    }

    handleGoogleResponse();
  }, [params, router]);

  return <div>Loading...</div>;
}

export default GoogleCallback;
