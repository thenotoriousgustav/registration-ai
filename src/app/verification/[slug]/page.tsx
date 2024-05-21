import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function VerificationPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-10/12">
        <h1 className="text-4xl font-semibold">
          Before starting the exam, please verify your face
        </h1>

        <ul className="mt-6 text-lg">
          <li>
            1. Make sure your face is centered and looking straight at the
            screen.
          </li>
          <li> 2. Ensure your face is not obstructed by any objects.</li>
          <li> 3. Please open your mouth to complete the verification.</li>
        </ul>

        <div className="mt-10">
          <Button variant="default" asChild>
            <Link href={`/verification/face-verification/${params.slug}`}>
              Start Verification
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
