import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export function BackButton({ label, href }: any) {
  return (
    <div className="absolute top-5  left-8 cursor-pointer capitalize  flex justify-start items-center text-black/65 hover:text-black text-sm font-extrabold hover:scale-105">
      <IoMdArrowRoundBack className="text-lg" />
      <Link className="" href={`${href}`}>
        {label}
      </Link>
    </div>
  );
}
