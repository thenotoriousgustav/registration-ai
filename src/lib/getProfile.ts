import { getSession } from "./session";

type Profile = {
  username: string;
  name: string;
  sub: string;
  picture: string;
  iat: number;
  exp: number;
};

export async function getProfile(): Promise<Profile | null> {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;

    console.log(accessToken);

    if (accessToken) {
      const res = await fetch(`http://localhost:3001/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch profile data:", res.statusText);
        return null;
      }
      const profile = await res.json();
      return profile?.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}
