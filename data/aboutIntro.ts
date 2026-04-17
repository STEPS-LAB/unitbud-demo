/** Текст з https://unitbud.com/uk/about/ — абзаци через подвійний перенос рядка. */
export const aboutIntroByLocale = {
  uk: `Ласкаво просимо до нашої компанії – лідера в галузі модульного будівництва!

Ми – команда фахівців, яка зробила з модульного будівництва справжнє мистецтво. Наша місія полягає в тому, щоб забезпечити людей комфортним і доступним житлом швидше і ефективніше, ніж будь-коли раніше.

У нашій компанії ми дотримуємось високих стандартів якості, інноваційних технологій та сталого розвитку. Наші модульні будинки вирізняються не лише своєю функціональністю та елегантним дизайном, але й відповідають найсуворішим нормам безпеки, енергоефективності та екологічності.

Завдяки нашому індивідуальному підходу і досвіду, ми можемо реалізувати будь-які проєкти – від невеликих осель для одного клієнта до великомасштабних комплексів. Ми розуміємо, що кожен клієнт має свої унікальні потреби та бюджет, тому ми працюємо віддано, щоб забезпечити вам ідеальне житло, яке відповідає вашим вимогам.

Наша команда складається з досвідчених архітекторів, інженерів та майстрів будівництва, які мають глибокі знання і багаторічний досвід у галузі модульного будівництва. Ми ретельно контролюємо кожен етап процесу, починаючи від проєктування і виробництва до доставки та монтажу. Наша мета – забезпечити вам надійні та якісні модульні будинки, які стануть вашим затишним домом на довгі роки.

Також ми пишаємось нашим привітним та професійним сервісом, який ставить ваші потреби на перше місце. Наші фахівці завжди готові надати консультацію, допомогти вам у виборі оптимального проєкту та відповісти на всі ваші запитання.

Якщо ви шукаєте надійного партнера для будівництва вашого будинку мрії – не шукайте далі! Зверніться до нашої компанії і ми з радістю втілимо ваші бажання у реальність. З нами ви отримаєте не просто будинок, а справжній дім, яким ви будете пишатися.`,
  en: `Welcome to our company — a leader in modular construction.

We are a team of specialists who have turned modular building into a craft. Our mission is to give people comfortable, attainable housing faster and more efficiently than ever.

We uphold high standards of quality, innovative technology, and sustainable development. Our modular homes stand out not only for functionality and elegant design, but also for meeting strict safety, energy efficiency, and environmental requirements.

Thanks to our individual approach and experience, we can deliver projects of any scale — from compact homes to large complexes. We know every client has unique needs and budget, so we work with dedication to provide the right home for you.

Our team includes experienced architects, engineers, and builders with deep expertise in modular construction. We carefully control every stage — from design and manufacturing to delivery and installation — so you get reliable homes for years to come.

We are proud of our friendly, professional service that puts your needs first. Our specialists are always ready to advise, help you choose the best project, and answer your questions.

If you are looking for a trusted partner to build the home you have dreamed of, you are in the right place. Contact us and we will gladly turn your ideas into reality — not just a house, but a home you will be proud of.`,
} as const;

export function getAboutIntroParagraphs(locale: "uk" | "en"): string[] {
  const raw = aboutIntroByLocale[locale];
  return raw.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}
