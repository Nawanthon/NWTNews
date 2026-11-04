import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sans = Noto_Sans_Thai({ variable: "--font-sans", subsets: ["thai", "latin"] });
const serif = Noto_Serif_Thai({ variable: "--font-serif", subsets: ["thai", "latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "NWT WORLD — ข่าวต่างประเทศและบทวิเคราะห์",
  description: "เว็บข่าวอิสระ ข่าวการเมืองและต่างประเทศ พร้อมบริบทและบทวิเคราะห์",
};
export const viewport: Viewport = { themeColor: "#c90016" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
