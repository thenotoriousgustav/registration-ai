import FaceVerificationComp from "@/components/face-verification-comp";
import { getApplications } from "@/lib/getApplications";

export const dynamic = "force-dynamic";

export default async function VerifikasiPage() {
  const applications = await getApplications();

  return (
    <section>
      <FaceVerificationComp applications={applications} />
    </section>
  );
}
