import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { ToasterProvider } from "@/components/toaster-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen flex flex-col bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <header>
          <Navigation />
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-secondary w-full">
          <Footer />
        </footer>
        <ToasterProvider />
      </body>
    </html>
  );
}