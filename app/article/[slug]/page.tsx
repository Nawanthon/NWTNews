import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import { formatDate } from "@/components/ArticleCard";
import { bodyImageUrl, getArticle } from "@/lib/data";
import { CATEGORY_LABEL } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  return a ? { title: `${a.title} — NWT WORLD`, description: a.summary } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();
  return (
    <article className="article">
      <span className="tag">{CATEGORY_LABEL[a.category]}</span>
      <h1>{a.title}</h1>
      <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
      {a.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="article-img" src={a.imageUrl} alt={a.imageAlt || a.title} />
      )}
      <div className="prose">
        <PortableText
          value={a.body ?? []}
          components={{
            types: {
              image: ({ value }) => {
                const src = bodyImageUrl(value);
                // eslint-disable-next-line @next/next/no-img-element
                return src ? <img src={src} alt="" /> : null;
              },
            },
          }}
        />
      </div>
    </article>
  );
}
