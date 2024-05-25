import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "./bento-grid";
import Globe from "./globe";
import Marquee from "./marquee";
import {
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { GET } from "@/lib/httpClient";

export default async function Bento() {
  const exams = await GET<any>("/exams");
  const profile = await GET<any>("/auth/profile");

  const features = [
    {
      Icon: FileTextIcon,
      name: "Your Profile",
      description: "View and edit your profile information.",
      href: "/profile",
      cta: "Go to Profile",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute top-10 left-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] cursor-pointer">
          <figure
            key={profile?.id}
            className={cn("relative w-full h-36 cursor-pointer ")}
          >
            <div className="font-medium">
              <figcaption className="text-3xl font-semibold">
                {profile?.name}
              </figcaption>
              <p className="text-sm mt-1">{profile?.username}</p>
            </div>
          </figure>
        </div>
      ),
    },
    {
      Icon: InputIcon,
      name: "Exams",
      description: "Search through all your exams in one place.",
      href: "/exams",
      cta: "Go to exams",
      className: "col-span-3 lg:col-span-2",
      background: (
        <Marquee
          pauseOnHover
          className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
        >
          {exams?.map((exam: any) => (
            <figure
              key={exam?.id}
              className={cn(
                "relative w-48 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
              )}
            >
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-col">
                  <figcaption className="text-sm font-medium dark:text-white ">
                    {exam?.title}
                  </figcaption>
                </div>
              </div>
              <div>
                <p></p>
                <p className="mt-2 text-xs">{exam.title}</p>
              </div>
            </figure>
          ))}
        </Marquee>
      ),
    },
    {
      Icon: GlobeIcon,
      name: "About Kemenkeu CAT",
      description: "Get to know about Kemenkeu CAT",
      href: "/",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: (
        <Globe className="top-0 h-[600px] w-[600px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40" />
      ),
    },
    {
      Icon: CalendarIcon,
      name: "Contact us",
      description: "Get in touch with our team for support.",
      className: "col-span-3 lg:col-span-1",
      href: "/",
      cta: "Contact Us",
      // background: (
      //   <Calendar
      //     mode="single"
      //     selected={new Date(2022, 4, 11, 0, 0, 0)}
      //     className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      //   />
      // ),
    },
  ];

  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
