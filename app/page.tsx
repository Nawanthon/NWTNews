import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import ArticleGrid from "@/components/ArticleGrid";
import { getAllArticles } from "@/lib/data";

export const revalidate = 60;

export default async function Home() {
  const all = await getAllArticles();
  const top = all.find((a) => a.featured) ?? all[0];
  const rest = all.filter((a) => a._id !== top?._id);
  const side = rest.slice(0, 4);
  const politics = rest.filter((a) => a.category === "politics").slice(0, 4);
  const world = rest.filter((a) => a.category === "world").slice(0, 4);

  return (
    <>
      <div className="top-banner">
        <span>TOP STORIES</span> ข่าวต่างประเทศและบทวิเคราะห์ที่ต้องจับตา
      </div>

      {top ? (
        <section className="hero">
          <ArticleCard a={top} big />
          <div className="hero-side">
            {side.map((a) => (
              <ArticleCard key={a._id} a={a} />
            ))}
          </div>
        </section>
      ) : (
        <p className="empty">ยังไม่มีข่าว — เพิ่มข่าวได้ที่ <Link href="/studio">หน้าจัดการข่าว</Link></p>
      )}

      <ArticleGrid title="การเมือง" href="/category/politics" items={politics} />
      <ArticleGrid title="ต่างประเทศ" href="/category/world" items={world} />

      <section id="about" className="about">
        <h2>เกี่ยวกับ NWT WORLD</h2>
        <p>
          เว็บข่าวอิสระที่ดำเนินงานโดยนักศึกษา มจธ. นำเสนอข่าวการเมืองและต่างประเทศ พร้อมบริบทและบทวิเคราะห์
          บรรณาธิการ: นวันธร บุญประเสริฐ — แจ้งแก้ไขข่าวได้ที่{" "}
          <a href="mailto:Nawanthorn.boon@gmail.com">Nawanthorn.boon@gmail.com</a>
        </p>
        <ol className="principles">
          <li><b>01 แหล่งที่มา</b> ลิงก์ไปยังต้นทางข่าวเสมอ</li>
          <li><b>02 บริบท</b> อธิบายภูมิหลังให้เข้าใจเหตุการณ์</li>
          <li><b>03 ความรับผิดชอบ</b> ตรวจสอบผู้มีอำนาจและแก้ไขเมื่อผิดพลาด</li>
        </ol>
      </section>
    </>
  );
}
