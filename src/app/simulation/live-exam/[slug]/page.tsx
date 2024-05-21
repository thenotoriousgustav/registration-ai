import SimulationAI from "@/components/simulation-comp/simulation-ai";
import VoiceActivityAI from "@/components/simulation-comp/voice-activity-ai";

export const dynamic = "force-dynamic";

export default function LiveExamPage({ params }: { params: { slug: string } }) {
  return (
    <section>
      <div>
        <SimulationAI params={params} />
      </div>
      <div>
        <VoiceActivityAI />
      </div>
    </section>
  );
}
