import ArticleGrid from "@/components/ArticleGrid";
import { searchArticles } from "@/lib/data";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const items = await searchArticles(q);
  return (
    <>
      <h1 className="page-title">ผลการค้นหา{q && `: “${q}”`}</h1>
      {!q.trim() ? (
        <p className="empty">พิมพ์คำที่ต้องการค้นหาในช่องค้นหาด้านบน</p>
      ) : items.length ? (
        <ArticleGrid title={`พบ ${items.length} รายการ`} items={items} />
      ) : (
        <p className="empty">ไม่พบข่าวที่ตรงกับคำค้นหา</p>
      )}
    </>
  );
}
