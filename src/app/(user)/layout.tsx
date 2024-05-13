import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-secondary w-full">
        <Footer />
      </footer>
    </>
  );
}
