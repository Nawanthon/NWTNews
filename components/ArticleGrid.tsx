import Link from "next/link";
import type { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ title, href, items }: { title: string; href?: string; items: Article[] }) {
  if (items.length === 0) return null;
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
        {href && <Link href={href}>ดูทั้งหมด →</Link>}
      </div>
      <div className="grid">
        {items.map((a) => (
          <ArticleCard key={a._id} a={a} />
        ))}
      </div>
    </section>
  );
}
