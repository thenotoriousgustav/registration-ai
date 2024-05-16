import { getSession } from "./session";

type Application = {
  id: string;
  exam_id: string;
  user_id: string;
  name: string;
  photo: string;
  id_card_no: string;
  id_card_file: string;
  profile: Profile;
  apply_at: string;
  status: string;
};

type Profile = {
  full_name: string;
  pob: string;
  dob: string;
  religion: string;
  address: string;
};

export async function getApplications(): Promise<Application[] | null> {
  try {
    const session = await getSession();

    const accessToken = session?.accessToken;

    if (accessToken) {
      const res = await fetch(`http://localhost:3001/applications`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch applications data:", res.statusText);
        return null;
      }

      const applications = await res.json();
      return applications?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching applications data:", error);
    return null;
  }
}
