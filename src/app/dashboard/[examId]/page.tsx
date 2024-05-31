import { DataTable } from "@/components/dashboard/data-table";
import { Applicant, columns } from "./columns";
import { TopCardDetail } from "@/components/dashboard/top-card-detail";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/dashboard/back-button";
import { getSession } from "@/lib/session";

async function getApplicants({ examId }: any): Promise<Applicant[] | []> {
  try {
    console.log(examId);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await getSession();
    const accessToken = session?.accessToken;

    const res = await fetch(`${BASE_URL}/admin/applications/${examId}`, {
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
    console.error("Error fetching data:", error);
    return [];
  }
}

const getExam = async ({ examId }: any) => {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const session = await getSession();
    const accessToken = session?.accessToken;

    const res = await fetch(`${BASE_URL}/admin/applications/${examId}`, {
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
    console.error("Error fetching data:", error);
  }
};

export default async function Detail({
  params,
}: {
  params: { examId: string };
}) {
  const { examId } = params;
  const data = await getApplicants(examId);
  const exam = await getExam(examId);

  return (
    <div className="container mx-auto py-10">
      <BackButton label="dashboard" href="/dashboard" />
      <TopCardDetail exam={exam} />
      <Separator className="mt-5 mb-2 " />
      <h1 className="text-center text-xl font-extrabold">Applicants List</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
