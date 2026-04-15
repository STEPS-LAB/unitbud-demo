import Link from "next/link";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-md">
          <p
            className="text-8xl font-300 text-[#e8e8e5] mb-6 leading-none"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            404
          </p>
          <h1
            className="text-2xl font-500 text-[#131311] mb-4 tracking-tight"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            Сторінку не знайдено
          </h1>
          <p className="text-[#7c7c78] text-sm mb-8">
            Можливо, сторінку було переміщено або видалено.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-primary">
              На головну
            </Link>
            <Link href="/catalog" className="btn-outline">
              До каталогу
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
