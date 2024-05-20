import ExamComp from "@/components/exam-comp";
import Vad from "@/components/vad";

export const dynamic = "force-dynamic";

export default function FaceDetectionPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section>
      <div>
        <ExamComp params={params} />
      </div>
      <div>
        <Vad />
      </div>
    </section>
  );
}
