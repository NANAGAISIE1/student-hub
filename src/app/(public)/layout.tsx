import Footer from "./_components/footer";
import Header from "./_components/header";

export default function PublicRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" h-full w-full">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
