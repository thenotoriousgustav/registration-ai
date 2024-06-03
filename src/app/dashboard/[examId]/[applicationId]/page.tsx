import { ApplicationDetailCard } from "@/components/dashboard/application-detail-card";
import { BackButton } from "@/components/dashboard/back-button";
import { EvidenceCard } from "@/components/dashboard/evidance-card";
import { getSession } from "@/lib/session";

const getEvidences = async ({ applicationId }: any) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await getSession();
    const accessToken = session?.accessToken;

    const res = await fetch(`${BASE_URL}/admin/evidences/${applicationId}`, {
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

const getApplicant = async ({ applicationId }: any) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await getSession();
    const accessToken = session?.accessToken;

    const res = await fetch(`${BASE_URL}/admin/applications/${applicationId}`, {
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

export default async function DetailApplicant({
  params,
}: {
  params: { examId: string; applicationId: string };
}) {
  const { examId, applicationId } = params;
  console.log(params);

  const evidences = await getEvidences(applicationId);
  const application = await getApplicant(applicationId);

  // const application = {
  //   id: "dddjj-ajsjjs-cjcjcj",
  //   exam_id: "EX12345-sjsjd-sjsjsj",
  //   user_id: "USR001",
  //   name: "John Doe",
  //   photo: "/hijab.svg",
  //   id_card_no: "123456789",
  //   id_card_type: "KTP",
  //   id_card_file: "/hijab.svg",
  //   id_card_profile: {
  //     pob: "Jakarta",
  //     dob: "1990-01-01",
  //     gender: "Male",
  //     religion: "Islam",
  //     city: "Jakarta",
  //     address: "Jl. Merdeka No.1, Jakarta jdjdj",
  //   },
  //   created_at: "",
  //   status: "approved",
  // };

  return (
    <div className="container h-screen mx-auto py-8 flex gap-4 ">
      <BackButton label="applicants List" href={`/dashboard/${examId}`} />
      {/* nanti ini scroll able untuk list evidence */}
      <ApplicationDetailCard application={application} />
      <div className="mt-5 flex-1 w-full h-full  flex flex-col gap-5 bg-primary-foreground">
        <h1 className="text-xl font-extrabold text-center">List Evidence</h1>
        <div className="w-full h-full overflow-y-auto ">
          {evidences.map((evidence: any) => (
            <EvidenceCard key={evidence.id} evidence={evidence} />
          ))}
        </div>
      </div>
    </div>
  );
}
