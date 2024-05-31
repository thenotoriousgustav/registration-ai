import { ApplicantDetailCard } from "@/components/dashboard/applicant-detail-card";
import { BackButton } from "@/components/dashboard/back-button";
import { EvidenceCard } from "@/components/dashboard/evidance-card";
import { getSession } from "@/lib/session";

const getEvidences = async ({ applicantId }: any) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await getSession();
    const accessToken = session?.accessToken;

    const res = await fetch(`${BASE_URL}/admin/evidences/${applicantId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    const data = await res.json();
    if (data.status !== "success") {
      throw data;
    }

    console.log(data);
    return data.data;
  } catch (error: any) {
    return [];
  }
};

const getApplicant = async ({ applicantId }: any) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await getSession();
    const accessToken = session?.accessToken;

    const res = await fetch(`${BASE_URL}/admin/applications/${applicantId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw errorData;
    }

    const data = await res.json();
    if (data.status !== "success") {
      throw data;
    }

    console.log(data);
    return data.data;
  } catch (error: any) {
    return null;
  }
};

export default function DetailApplicant({
  params,
}: {
  params: { applicantId: string };
}) {
  const { applicantId } = params;
  console.log(params);

  const evidences = getEvidences(applicantId);
  const applicant = getEvidences(applicantId);

  return (
    <div className="container mx-auto py-10">
      <BackButton label="applicants List" href={`/dashboard/${applicantId}`} />
      {/* nanti ini scroll able untuk list evidence */}
      <div className="bg-red-200 overflow-y-auto">
        <EvidenceCard />
      </div>
    </div>
  );
}
