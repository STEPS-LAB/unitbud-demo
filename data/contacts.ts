/** Zhytomyr office — coordinates near Heroiv Chornobylia St, 6a */
export const OFFICE_LAT = 50.27854;
export const OFFICE_LNG = 28.65836;

export const googleMapsEmbedSrc = `https://maps.google.com/maps?q=${OFFICE_LAT},${OFFICE_LNG}&hl=uk&z=17&output=embed`;

export const googleMapsExternalHref =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("вулиця Героїв Чорнобиля, 6а, Житомир, Україна");

/** Як на https://unitbud.com/uk/contacts/ */
export const contactSocialHref = {
  instagram: "https://www.instagram.com/unitbud.ua/",
  youtube: "https://www.youtube.com/@unitbudua",
  viber: "viber://pa?chatURI=unitbud_ua",
  tiktok: "https://www.tiktok.com/@unitbud_ua",
  facebook: "https://www.facebook.com/modulni.budynki.unitbud.ua",
  telegram: "https://t.me/Unitbud",
  pinterest: "https://www.pinterest.com/Unitbud/",
} as const;
