import Container from "@/components/container";
import { GET } from "@/lib/httpClient";

export default async function ProfilePage() {
  const profile = await GET("/auth/profile");
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
