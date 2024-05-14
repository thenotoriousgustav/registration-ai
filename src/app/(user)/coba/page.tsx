"use client";
import { useRouter } from "next/navigation";

export default function PageCoba() {
  const ids = [1, 2, 3, 4];
  const router = useRouter();
  return (
    <div>
      <h1>Ini halaman Pilih ujian</h1>
      <hr />
      {ids.map((id) => (
        <div key={id} className="bg-blue-500 mb-10">
          <h1>ujian {id}</h1>
          <button onClick={() => router.push(`/coba/${id}`)}>
            Pilih ujian
          </button>
        </div>
      ))}
    </div>
  );
}
