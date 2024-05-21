export const dynamic = "force-dynamic";

import FaceVerificationAI from "@/components/verification-comp/face-verification-ai";
import { GET } from "@/lib/httpClient";

export default async function VerifikasiPage({
  params,
}: {
  params: { slug: string };
}) {
  const application = await GET(`/applications/${params.slug}`);

  console.log(application);

  return (
    <section>
      <FaceVerificationAI application={application} params={params} />
    </section>
  );
}
