import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { HousePageClient } from "./HousePageClient";
import { getHouseBySlug, houses } from "@/data/houses";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

const StickyBookingBar = dynamic(() =>
  import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
);
const AiWidget = dynamic(() =>
  import("@/components/shared/AiWidget").then((m) => m.AiWidget),
);

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
      <main className={`pt-20 ${MOBILE_STICKY_MAIN_PAD}`}>
        <HousePageClient house={house} />
      </main>
      <Footer />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
