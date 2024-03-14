"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/main_logo4.png";

export default function Myheader() {
  return (
    <footer>
      <div className="inner">
        <div className="myfooter_top">
          <ul>
            <li>
              <Link href="/searchpage">공고검색</Link>
            </li>
            <li>
              <Link href="/community/notice">공지사항</Link>
            </li>
            <li>
              <Link href="/community/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/schedule">사업일정</Link>
            </li>
            <li>
              <Link href="#">개인정보처리방침</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
