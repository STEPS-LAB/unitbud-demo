import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { ContactsView } from "@/components/sections/contacts/ContactsView";
import { MOBILE_STICKY_MAIN_PAD } from "@/lib/mobileSticky";

const ConsultationSection = dynamic(() =>
  import("@/components/sections/ConsultationSection").then((m) => m.ConsultationSection),
);
const StickyBookingBar = dynamic(() =>
  import("@/components/shared/StickyBookingBar").then((m) => m.StickyBookingBar),
);
const AiWidget = dynamic(() => import("@/components/shared/AiWidget").then((m) => m.AiWidget));

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Unitbud: телефон, email, соцмережі та офіс у Житомирі. Запишіться на перегляд будинку або отримайте консультацію.",
};

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className={MOBILE_STICKY_MAIN_PAD}>
        <ContactsView />
        <ConsultationSection mode="viewing" />
      </main>
      <Footer className={MOBILE_STICKY_MAIN_PAD} />
      <StickyBookingBar />
      <AiWidget />
    </>
  );
}
