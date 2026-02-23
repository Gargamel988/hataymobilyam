export type Company = {
  id: string;
  slug: string;
  name: string;
  categories: string[];
  location: string;
  phone: string;
  coverImage: string;
  logoSrc: string;
  productCount: number;
  rating: number;
  verified: boolean;
  description: string;
  yearEstablished: number;
  authorized?: string;
  address?: string;
};
