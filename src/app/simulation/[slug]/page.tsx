import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function SimulationPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-10/12">
        <h2 className="text-4xl text-red-500 font-bold">
          Ujian ini diawasi oleh Sistem Ujian Anti Curang berbasis AI
        </h2>

        <ul className="mt-6 text-lg">
          <li>Peserta Ujian dilarang menggunakan device lain untuk ujian</li>
          <li>User dilarang meminta bantuan kepada orang lain</li>
        </ul>

        <p className="mt-4 text-gray-500">
          Dengan melanjutkan ujian, anda menyetujui peraturan yang berlaku
        </p>

        <Button variant={"default"} asChild className="mt-10">
          <Link href={`/simulation/live-exam/${params.slug}`}>
            Lanjut Ujian
          </Link>
        </Button>
      </div>
    </section>
  );
}
