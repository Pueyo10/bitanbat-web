export type ClassCategory = "dantza" | "fitness" | "wellness";

export interface Location {
  id: string;
  name: string;
  address: string;
  description_es: string;
  description_eu: string;
}

export interface ClassType {
  id: string;
  name: string;
  slug: string;
  description_es: string;
  description_eu: string;
  color: string;
  category: ClassCategory;
  image_url: string | null;
  min_age: number | null;
  max_age: number | null;
}

export interface Schedule {
  id: string;
  class_id: string;
  location_id: string;
  day_of_week: number; // 0=Monday ... 4=Friday
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  notes: string | null;
  is_active: boolean;
  // Joined
  class?: ClassType;
  location?: Location;
}

export interface BlogPost {
  id: string;
  title_es: string;
  title_eu: string;
  slug: string;
  content_es: string;
  content_eu: string;
  excerpt_es: string;
  excerpt_eu: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Price {
  id: string;
  name_es: string;
  name_eu: string;
  description_es: string;
  description_eu: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  order: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption_es: string | null;
  caption_eu: string | null;
  category: string | null;
  order: number;
  created_at: string;
}
