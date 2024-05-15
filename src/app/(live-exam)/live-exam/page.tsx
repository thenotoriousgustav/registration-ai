import ExamComp from '@/components/exam-comp';
import Vad from '@/components/vad';

export const dynamic = 'force-dynamic';

export default function FaceDetectionPage() {
  return (
    <section>
      <div>
        <ExamComp />
      </div>
      <div>
        <Vad />
      </div>
    </section>
  );
}
