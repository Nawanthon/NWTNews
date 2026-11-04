import type { Article } from "./types";

// ใช้เฉพาะตอนพัฒนา เมื่อตั้ง NEXT_PUBLIC_USE_MOCK=1 เพื่อดูหน้าตาเว็บโดยยังไม่มี Sanity
const img = (n: number) => `https://picsum.photos/seed/nwt${n}/1200/675`;
const mk = (i: number, category: Article["category"], featured = false): Article => ({
  _id: `mock-${i}`,
  title: `ข้อความทดสอบหัวข้อข่าวที่ ${i}`,
  slug: `mock-${i}`,
  category,
  summary: "ข้อความทดสอบสำหรับดูเลย์เอาต์ ไม่ใช่ข่าวจริง",
  imageUrl: img(i),
  publishedAt: new Date(Date.now() - i * 3600_000).toISOString(),
  featured,
  body: [{ _type: "block", _key: "a", style: "normal", children: [{ _type: "span", _key: "b", text: "เนื้อหาทดสอบ", marks: [] }], markDefs: [] }],
});

export const mockArticles: Article[] = [
  mk(1, "world", true),
  ...[2, 3, 4, 5, 6].map((i) => mk(i, i % 2 ? "politics" : "world")),
  ...[7, 8, 9, 10].map((i) => mk(i, i % 2 ? "politics" : "world")),
];
