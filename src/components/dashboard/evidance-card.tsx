import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";

export function EvidenceCard({ evidence }: any) {
  return (
    <Card className="w-full mb-5">
      <div className=" mx-5 text-center">
        {/* created_at */}
        <h1 className="text-xl font-extrabold pt-2">{evidence.created_at}</h1>
      </div>
      <CardContent className="flex p-3 gap-4 items-center ">
        {/* image / audio */}
        {evidence.type == "image" && (
          <div className="w-[450px]">
            <Image
              src={evidence.file}
              alt="ok"
              width={50}
              height={50}
              className="object-contain w-full h-56 border-2"
            />
          </div>
        )}

        {evidence.type == "audio" && (
          <div className="w-[450px]">
            <audio src={evidence.file} controls className="w-full mb-4 ">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* <div className="w-[450px]">
          <Image
            src={`/hijab.svg`}
            alt="ok"
            width={50}
            height={50}
            className="object-contain w-full h-56 border-2"
          />
        </div> */}

        {/* <div className="w-[450px]">
          <audio src="/sample.mp3" controls className="w-full mb-4 ">
            Your browser does not support the audio element.
          </audio>
        </div> */}

        <div className=" flex-1 flex flex-col gap-5 ">
          <p className="text-base font-bold flex items-center gap-2">
            Evidence ID :
            <span className="font-normal uppercase text-xs ">
              {evidence.id}
            </span>
          </p>
          <p className="text-base font-bold flex items-center gap-2">
            Application ID :{" "}
            <span className="font-normal uppercase  text-xs">
              {evidence.application_id}
            </span>
          </p>
          <p className="text-base font-bold flex items-center gap-2">
            Note :{" "}
            <span className="font-normal uppercase  text-xs">
              {evidence.note}
            </span>
          </p>
          <p className="text-base font-bold flex items-center gap-2">
            Type :{" "}
            <span className="font-normal uppercase  text-xs">
              {evidence.type}
            </span>
          </p>
          <p className="text-base font-bold flex items-center gap-2">
            Status :{" "}
            <span className="font-normal uppercase  text-xs">
              {evidence.status}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
