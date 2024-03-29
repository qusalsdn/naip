import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

// fontawesome 새로고침 크기 버그 해결
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "국가과제 통합 플랫폼",
  description: "국가과제 통합 플랫폼",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* 헤더 + 상단메뉴 */}
        <Header></Header>

        <section>{children}</section>

        {/* 푸터 영역 */}
        <Footer></Footer>
      </body>
    </html>
  );
}
