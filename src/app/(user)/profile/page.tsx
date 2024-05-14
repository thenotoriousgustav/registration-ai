import Container from "@/components/container";
import { getSession } from "@/lib/session";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function getProfile() {
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
      return res.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return null;
  }
}

export default async function ProfilePage() {
  const profile = await getProfile();
  const session = await getSession();
  console.log(profile);

  return (
    <section>
      <Container>
        <code>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </code>
      </Container>
    </section>
  );
}
