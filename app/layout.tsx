import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";

const mPlus1p = M_PLUS_1p({
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoRate - 映画・ドラマの世界のレビューを手軽にチェック",
  description:
    "映画・ドラマの複数サイトのスコアを一括比較。レビューも投稿できます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${mPlus1p.className} h-full antialiased`}>
      <body className="min-h-full bg-[#131520]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
