export type Identifier = number;

export interface User {
  id: Identifier;
  name: string;
  email: string;
}

export interface Product {
  id: Identifier;
  name: string;
  price: number;
}

export interface PostItem {
  id: Identifier;
  title: string;
  body: string;
}

export type ServiceCategory = "beleza" | "mecânico" | "construção" | "limpeza" | "outro";
export type WorkingDay = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type DiaryStatus = "available" | "not-available" | "booked";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface WorkingHours {
  day: WorkingDay;
  hours: string;
}

export interface DiaryEntry {
  date: string;
  time: string;
  status: DiaryStatus;
}

export interface Professional {
  id: Identifier;
  name: string;
  services: ServiceCategory[];
  basePrice: number;
  rating: number;
  reviewCount: number;
  location: GeoLocation;
  city: string;
  workingHours: WorkingHours[];
  diary: DiaryEntry[];
}

export interface DatabaseShape {
  users: User[];
  products: Product[];
  posts: PostItem[];
  professionals: Professional[];
}


