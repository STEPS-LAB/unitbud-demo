export interface House {
  id: string;
  slug: string;
  name: string;
  area: number;
  floors: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  priceFrom: boolean;
  images: string[];
  thumbnail: string;
  category: "compact" | "comfort" | "premium" | "elite";
  material: "frame" | "brick" | "gasoblock" | "sip";
  style: string;
  styleEn?: string;
  tag?: string;
  tagEn?: string;
  description: string;
  descriptionEn?: string;
  features: string[];
  featuresEn?: string[];
  specs: Record<string, string>;
  specsEn?: Record<string, string>;
  popular: boolean;
  installed?: boolean;
  location?: string;
  locationEn?: string;
}

export interface Review {
  id: string;
  name: string;
  location?: string;
  locationEn?: string;
  avatar: string;
  rating: number;
  text: string;
  textEn?: string;
  houseModel?: string;
  date: string;
  dateEn?: string;
}

export interface FAQ {
  id: string;
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
  category: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  duration: string;
  durationEn?: string;
  icon: string;
}

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  title: string;
  area: number;
  price: number;
  image: string;
  slug: string;
  city: string;
  cityEn?: string;
}
