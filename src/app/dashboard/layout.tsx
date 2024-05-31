export const dynamic = "force-dynamic";

import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function ExamsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "min-h-screen flex flex-col bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <main className="flex-grow">{children}</main>
    </div>
  );
}
