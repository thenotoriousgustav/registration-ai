import { Button } from "@/components/ui/button";
import { GET } from "@/lib/httpClient";
import Link from "next/link";

export default async function VerifPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-8/12">
        <h1 className="text-4xl font-semibold">
          Sebelum memulai ujian silahkan verifikasi wajah anda
        </h1>

        <ul className="mt-6 text-lg">
          <li>
            1. Pastikan wajah anda ada ditengah dan pandangan lurus ke layar
          </li>
          <li>2. Pastikan wajah anda tidak terhalang oleh benda apapun</li>
          <li>3. Tolong membuka mulut untuk memverifikasi</li>
        </ul>

        <div className="mt-10">
          <Button variant="default" asChild>
            <Link href={`/verification/face-verification/${params.slug}`}>
              Mulai Verifikasi
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
