export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand: string;
  type: string;
  is_best_seller?: boolean;
  created_at?: string;
  badge?: string;
  gallery_images?: string[];
  colors?: string[];
  color_image_map?: Record<string, string>;
}
