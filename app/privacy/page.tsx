"use client";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { useLocale } from "@/hooks/useLocale";

export default function PrivacyPage() {
  const { locale } = useLocale();
  const t = locale === "en"
    ? {
        title: "Privacy Policy",
        p1: "Unitbud respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information.",
        h1: "1. Information collection",
        p2: "We collect information you voluntarily provide when filling in forms on our website: name, phone number, and comments.",
        h2: "2. Data usage",
        p3: "Collected data is used only to contact you regarding requested services and provide consultations. We do not share your data with third parties.",
        h3: "3. Data protection",
        p4: "We implement technical and organizational measures to protect your personal data from unauthorized access.",
        h4: "4. Contacts",
        p5: "For questions related to personal data processing, contact us:",
      }
    : {
        title: "Політика конфіденційності",
        p1: "Unitbud поважає вашу конфіденційність та зобов'язується захищати ваші персональні дані. Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо та захищаємо вашу інформацію.",
        h1: "1. Збір інформації",
        p2: "Ми збираємо інформацію, яку ви надаєте добровільно при заповненні форм на нашому сайті: ім'я, номер телефону та коментарі.",
        h2: "2. Використання даних",
        p3: "Зібрані дані використовуються виключно для зв'язку з вами щодо запитаних послуг та надання консультацій. Ми не передаємо ваші дані третім особам.",
        h3: "3. Захист даних",
        p4: "Ми впроваджуємо технічні та організаційні заходи для захисту ваших персональних даних від несанкціонованого доступу.",
        h4: "4. Контакти",
        p5: "З питань щодо обробки персональних даних звертайтесь:",
      };

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-narrow">
          <h1
            className="text-3xl md:text-4xl font-300 text-[#131311] tracking-tight mb-8"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            {t.title}
          </h1>
          <div className="prose prose-sm max-w-none text-[#555552] leading-relaxed space-y-6">
            <p>
              {t.p1}
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">{t.h1}</h2>
            <p>
              {t.p2}
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">{t.h2}</h2>
            <p>
              {t.p3}
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">{t.h3}</h2>
            <p>
              {t.p4}
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">{t.h4}</h2>
            <p>
              {t.p5}{" "}
              <a href="mailto:privacy@unitbud.com" className="text-[#77d14d] hover:underline">
                privacy@unitbud.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
