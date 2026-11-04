import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="NWT WORLD หน้าแรก">
          NWT<strong>WORLD</strong>
        </Link>
        <nav className="nav" aria-label="เมนูหลัก">
          <Link href="/">หน้าแรก</Link>
          <Link href="/category/politics">การเมือง</Link>
          <Link href="/category/world">ต่างประเทศ</Link>
          <Link href="/#about">เกี่ยวกับเรา</Link>
          <a href="https://www.youtube.com/@nwtentertainment" target="_blank" rel="noopener noreferrer">
            WATCH ↗
          </a>
        </nav>
        <form action="/search" className="search" role="search">
          <input type="search" name="q" placeholder="ค้นหาข่าว" aria-label="ค้นหาข่าว" />
          <button type="submit">ค้นหา</button>
        </form>
      </div>
    </header>
  );
}
