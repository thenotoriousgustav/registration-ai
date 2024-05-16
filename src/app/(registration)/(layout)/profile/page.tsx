import Container from "@/components/container";
import { getProfile } from "@/lib/getProfile";
import { getSession } from "@/lib/session";
import React from "react";

export default async function ProfilePage() {
  const profile = await getProfile();

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
