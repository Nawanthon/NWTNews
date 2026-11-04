import type { PortableTextBlock } from "next-sanity";
export type Article = {
  _id: string;
  title: string;
  slug: string;
  category: "politics" | "world";
  summary?: string;
  imageUrl?: string;
  imageAlt?: string;
  publishedAt?: string;
  featured?: boolean;
  body?: PortableTextBlock[];
};

export const CATEGORY_LABEL: Record<string, string> = {
  politics: "การเมือง",
  world: "ต่างประเทศ",
};
