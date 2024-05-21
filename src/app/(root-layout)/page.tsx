import Link from "next/link";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="mt-2 mb-4">
      <Container className="flex flex-col lg:flex-row gap-y-8 lg:gap-y-0 gap-x-3">
        <div className="relative lg:w-4/12 w-full ">
          <div className="bg-yellow-300 with-cutout p-6 h-[30rem] lg:h-[40rem] flex flex-col justify-between rounded-sm">
            <div>
              <h1 className="text-6xl font-bold ">Kemenkeu</h1>
              <h1 className="text-2xl font-medium mt-2">
                Computer Assisted Test Powered With AI Technology 🤖
              </h1>
            </div>
            <p className="mb-20 text-lg">
              Welcome to the future of assessments. Our AI-powered exams
              revolutionize the way you evaluate and excel
            </p>
          </div>
          <div className="bg-orange-500 p-6 with-cutout absolute w-full bottom-0 left-0 h-5/12 h-20 rounded-sm">
            <Button className="ml-4" variant="roundedNone" asChild>
              <Link href="/exams">Go to Exams</Link>
            </Button>
          </div>
        </div>

        {/* //!sadasdas */}
        <div className="relative lg:w-8/12 w-full ">
          <div className="bg-gray-200 with-cutout p-5 h-full lg:h-[40rem] flex flex-col justify-between gap-y-6 lg:gap-y-0 rounded-sm">
            <div className="bg-red-200 p-6 with-cutout">
              <h1 className="text-7xl font-semibold">Exam With AI</h1>
              <p className="mt-8 text-sm">
                Discover the next generation of examinations with our AI-powered
                testing platform. Designed to provide a seamless, intelligent,
                and personalized assessment experience, our platform leverages
                the power of artificial intelligence to revolutionize the way
                you evaluate and excel.
              </p>
            </div>
            <div className="mb-20">
              <Image
                src="/img/view.jpeg"
                alt="asd"
                width="0"
                height="0"
                sizes="100vw"
                className="mx-auto h-64 w-full object-cover with-cutout"
              />
            </div>
          </div>
          <div className="bg-orange-500 p-6 with-cutout absolute w-full bottom-0 left-0 h-20 rounded-sm">
            <Button className="ml-4" variant="roundedNone" asChild>
              <Link href="/profile">Go to Profile</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
