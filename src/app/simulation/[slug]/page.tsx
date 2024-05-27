import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function VerificationPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1 className="text-4xl font-semibold text-red-500">
        This Exam is Monitored by an AI-based Anti-Cheating System
      </h1>

      <ul className="mt-6 text-lg list-disc list-inside">
        <li>
          Candidates are prohibited from using any other device during the exam
        </li>
        <li>Candidates are forbidden from seeking assistance from others</li>
        <li>
          Ensure you are alone in a quiet environment with no interruptions
        </li>
        <li>Make sure your webcam and microphone are working properly</li>
        <li>
          Any suspicious activity will be flagged and may result in
          disqualification
        </li>
      </ul>
      <p className="mt-4 text-gray-500">
        By proceeding with the exam, you agree to comply with all the rules and
        regulations set forth.
      </p>

      <div className="mt-6">
        <Button variant={"default"} asChild className="mt-10">
          <Link href={`/simulation/live-exam/${params.slug}`}>Start Exam</Link>
        </Button>
      </div>
    </div>
  );
}
