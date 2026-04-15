import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="container-narrow">
          <h1
            className="text-3xl md:text-4xl font-300 text-[#131311] tracking-tight mb-8"
            style={{ fontFamily: "Montserrat, Inter, sans-serif" }}
          >
            Політика конфіденційності
          </h1>
          <div className="prose prose-sm max-w-none text-[#555552] leading-relaxed space-y-6">
            <p>
              Unitbud поважає вашу конфіденційність та зобов'язується захищати ваші персональні дані.
              Ця Політика конфіденційності пояснює, як ми збираємо, використовуємо та захищаємо
              вашу інформацію.
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">1. Збір інформації</h2>
            <p>
              Ми збираємо інформацію, яку ви надаєте добровільно при заповненні форм на нашому сайті:
              ім'я, номер телефону та коментарі.
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">2. Використання даних</h2>
            <p>
              Зібрані дані використовуються виключно для зв'язку з вами щодо запитаних послуг та
              надання консультацій. Ми не передаємо ваші дані третім особам.
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">3. Захист даних</h2>
            <p>
              Ми впроваджуємо технічні та організаційні заходи для захисту ваших персональних даних
              від несанкціонованого доступу.
            </p>
            <h2 className="text-lg font-500 text-[#131311] mt-8 mb-3">4. Контакти</h2>
            <p>
              З питань щодо обробки персональних даних звертайтесь:{" "}
              <a href="mailto:privacy@unitbud.com" className="text-[#728c4a] hover:underline">
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
