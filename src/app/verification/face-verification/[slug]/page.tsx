import FaceVerificationComp from "@/components/face-verification-comp";
import { GET } from "@/lib/httpClient";

export const dynamic = "force-dynamic";

export default async function VerifikasiPage({
  params,
}: {
  params: { slug: string };
}) {
  const applications = await GET("/applications");

  return (
    <section>
      <FaceVerificationComp applications={applications} params={params} />
    </section>
  );
}
