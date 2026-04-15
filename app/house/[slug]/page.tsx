import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { StickyBookingBar } from "@/components/shared/StickyBookingBar";
import { AiWidget } from "@/components/shared/AiWidget";
import { HousePageClient } from "./HousePageClient";
import { getHouseBySlug, houses } from "@/data/houses";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const house = getHouseBySlug(slug);
  if (!house) return { title: "House not found" };

  return {
    title: `${house.name} — ${house.area} м²`,
    description: house.description,
    openGraph: {
      title: house.name,
      description: house.description,
      images: [{ url: house.thumbnail }],
    },
  };
}

export function generateStaticParams() {
  return houses.map((h) => ({ slug: h.slug }));
}

export default async function HousePage({ params }: Props) {
  const { slug } = await params;
  const house = getHouseBySlug(slug);
  if (!house) notFound();

  return (
    <>
      <Header />
      <main className="pt-20">
        <HousePageClient house={house} />
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
