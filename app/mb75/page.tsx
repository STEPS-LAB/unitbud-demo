import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { getHouseBySlug } from "@/data/houses";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";
import { Mb75PageClient } from "./Mb75PageClient";

const StickyBookingBar = dynamic(() =>
  import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
);
const AiWidget = dynamic(() =>
  import("@/components/shared/AiWidget").then((m) => m.AiWidget),
);

export const metadata: Metadata = {
  title: "Модульний будинок 75 м²",
  description:
    "Модульний будинок 75 м² — швидке та зручне рішення для проживання з передпокоєм, вітальнею-кухнею та ванною кімнатою.",
  openGraph: {
    title: "Модульний будинок 75 м²",
    description:
      "Модульний будинок 75 м² — швидке та зручне рішення для проживання з передпокоєм, вітальнею-кухнею та ванною кімнатою.",
    images: [{ url: "/images/installed/bud11.webp" }],
  },
};

export default function Mb75Page() {
  const house = getHouseBySlug("mb75");
  if (!house) notFound();

  return (
    <>
      <Header />
      <main className={`pt-20 ${MOBILE_STICKY_MAIN_PAD}`}>
        <Mb75PageClient house={house} />
      </main>
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
