import { notFound } from "next/navigation";
import ArticleGrid from "@/components/ArticleGrid";
import { getByCategory } from "@/lib/data";
import { CATEGORY_LABEL } from "@/lib/types";

export const revalidate = 60;

export function generateStaticParams() {
  return Object.keys(CATEGORY_LABEL).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = CATEGORY_LABEL[slug];
  if (!label) notFound();
  const items = await getByCategory(slug);
  return items.length ? <ArticleGrid title={label} items={items} /> : (
    <>
      <h1 className="page-title">{label}</h1>
      <p className="empty">ยังไม่มีข่าวในหมวดนี้</p>
    </>
  );
}
