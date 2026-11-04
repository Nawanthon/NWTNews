import Link from "next/link";
import { CATEGORY_LABEL, type Article } from "@/lib/types";

export function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Bangkok" });
}

export default function ArticleCard({ a, big = false }: { a: Article; big?: boolean }) {
  return (
    <article className={big ? "card card-big" : "card"}>
      <Link href={`/article/${a.slug}`}>
        {a.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={a.imageUrl} alt={a.imageAlt || a.title} loading={big ? "eager" : "lazy"} />
        ) : (
          <div className="img-placeholder" aria-hidden />
        )}
        <span className="tag">{CATEGORY_LABEL[a.category]}</span>
        <h3>{a.title}</h3>
        {big && a.summary && <p>{a.summary}</p>}
        <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
      </Link>
    </article>
  );
}
