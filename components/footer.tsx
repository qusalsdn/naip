"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../public/style/footer.css";

import Image from "next/image";
import flogo from "@/public/img/flogo2.png";
import Slogan from "@/public/img/slogan.png";

export default function Footer() {
  // 마이페이지 푸터숨기기
  const pathname = usePathname();
  const isMyPage = pathname.includes("mypage");
  if (isMyPage) {
    return null;
  }

  //관련사이트 링크로직
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selecttedValue, setSelecttedValue] = useState("");

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value) {
      window.open(value, "_blank");
      setSelecttedValue("");
    }
  };
  return (
    <footer>
      <div className="inner">
        <div className="footer_top">
          <div className="footer_menu">
            <ul>
              <li>
                <Link href="/community/notice">공지사항</Link>
              </li>
              {/* <li>
                <Link href="#">정부공개자료</Link>
              </li> */}
              <li>
                <Link href="/community/faq">FAQ</Link>
              </li>
              {/* <li>
                <Link href="#">고객센터안내</Link>
              </li>
              <li>
                <Link href="#">이용안내</Link>
              </li> */}
            </ul>
            <Image src={Slogan} alt="slogan"></Image>
            <Link href="#">개인정보처리방침</Link>
          </div>
        </div>
        <div className="footer_bottom">
          <Image src={flogo} alt=""></Image>
          <div className="copyright">
            <address>서울특별시 금천구 가산디지털2로 43-14(가산한화비즈메트로 2차), 1113호</address>
            <p>COPYRIGHT &copy; NAEILSQUARE, ALL RIGHTS RESERVED</p>
          </div>
          <div className="call">
            <p className="time">고객센터 : 10:00 ~ 19:00 (평일)</p>
            <p className="tel">02-6207-0610</p>
          </div>
          <div className="family-site">
            <select className="link01">
              <option value="전문기관바로가기">전문기관</option>
            </select>
            <select className="link02" onChange={handleChange} value={selecttedValue}>
              <option value="" disabled selected>
                관련사이트 바로가기
              </option>
              <option value="https://www.ntis.go.kr">국가과학기술지식정보서비스(NTIS)</option>
              <option value="https://www.bizinfo.go.kr">기업마당</option>
              <option value="https://www.g2b.go.kr">나라장터</option>
              <option value="https://www.iris.go.kr">범부처통합연구지원시스템(IRIS)</option>
              <option value="https://www.kdn.com">한전KDN</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
