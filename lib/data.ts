import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";
import type { SanityImageSource } from "@sanity/image-url";
import type { Article } from "./types";
import { mockArticles } from "./mock";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "1";

const client = sanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
const builder = client ? imageUrlBuilder(client) : null;

const FIELDS = `_id, title, "slug": slug.current, category, summary, publishedAt, featured,
  "imageUrl": image.asset->url, "imageAlt": image.alt`;

async function fetchList(filter: string, params: Record<string, string> = {}, limit = 60): Promise<Article[]> {
  if (!client) return [];
  return client.fetch(
    `*[_type == "article" && defined(slug.current) ${filter}] | order(publishedAt desc)[0...${limit}]{${FIELDS}}`,
    params,
    { next: { revalidate: 60 } },
  );
}

export async function getAllArticles(): Promise<Article[]> {
  if (useMock) return mockArticles;
  return fetchList("");
}

export async function getByCategory(category: string): Promise<Article[]> {
  if (useMock) return mockArticles.filter((a) => a.category === category);
  return fetchList("&& category == $category", { category });
}

export async function searchArticles(q: string): Promise<Article[]> {
  const term = q.trim();
  if (!term) return [];
  if (useMock) return mockArticles.filter((a) => a.title.includes(term));
  return fetchList("&& (title match $m || summary match $m)", { m: `*${term}*` });
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (useMock) return mockArticles.find((a) => a.slug === slug) ?? null;
  if (!client) return null;
  return client.fetch(
    `*[_type == "article" && slug.current == $slug][0]{${FIELDS}, body}`,
    { slug },
    { next: { revalidate: 60 } },
  );
}

export function bodyImageUrl(source: unknown): string | undefined {
  return builder ? builder.image(source as SanityImageSource).width(1200).url() : undefined;
}
