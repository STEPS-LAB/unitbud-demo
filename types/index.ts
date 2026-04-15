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
  tag?: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  popular: boolean;
  installed?: boolean;
  location?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  houseModel: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  duration: string;
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
}
