import Container from "@/components/container";
import AnimatedGradientText from "@/components/home-comp/animated-gradient-text";

import Bento from "@/components/home-comp/bento";
import DotPattern from "@/components/home-comp/dot-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <section className="h-full w-full mb-16">
      <Container>
        <div className="py-12 relative">
          <div className="flex flex-col items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Introducing Kemenkeu CAT
                </span>
                <ChevronRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-black" />
              </AnimatedGradientText>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-16 z-10">
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

          <div className="flex items-center justify-center gap-x-4 mt-12">
            <Button size="lg" className="rounded-full z-10" asChild>
              <Link href="/exams">Get Started</Link>
            </Button>
            {/* <Button variant="outline" className="rounded-full">
              Login
            </Button> */}
          </div>

          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
            )}
          />
        </div>

        <Bento />
      </Container>
    </section>
  );
}
