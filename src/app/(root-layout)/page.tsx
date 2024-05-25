import Container from "@/components/container";
import { TextShimmer } from "@/components/home-comp/animated-shiny-test";

import Bento from "@/components/home-comp/bento";
import DotPattern from "@/components/home-comp/dot-pattern";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <section className="mt-8 mb-4 h-full w-full">
      <Container className="flex flex-col items-center justify-center my-20">
        <div
          className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <TextShimmer className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Introducing Kemenkeu CAT</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </TextShimmer>
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-16 mb-20 z-10">
          <h1 className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-8xl font-bold leading-none tracking-tighter text-transparent">
            Computer Assisted Test.
          </h1>
          <h2 className="text-5xl font-medium mt-6">Kementerian Keuangan.</h2>
          <p className="w-7/12 text-gray-600 mt-8">
            Our platform leverages advanced artificial intelligence to ensure
            accurate, fair, and efficient evaluations. Experience unparalleled
            precision in scoring and feedback, tailored to help you understand
            your strengths and areas for improvement.
          </p>
        </div>

        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />

        <Bento />
      </Container>
    </section>
  );
}
