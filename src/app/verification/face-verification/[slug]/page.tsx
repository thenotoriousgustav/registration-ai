export const dynamic = "force-dynamic";

import FaceVerificationAI from "@/components/verification-comp/face-verification-ai";
import { GET } from "@/lib/httpClient";

type Application = {
  photo: string;
};

export default async function FaceVerificationPage({
  params,
}: {
  params: { slug: string };
}) {
  const application = await GET<Application>(`/applications/${params.slug}`);

  if (!application) {
    return (
      <section>
        <p>Photo not found please retake your applicant</p>
      </section>
    );
  }

  return (
    <section>
      <FaceVerificationAI photo={application?.photo} params={params} />
    </section>
  );
}
