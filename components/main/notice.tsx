import React from "react";

import "../../public/style/notice.css";
import Link from "next/link";

import Image from "next/image";
import mlogo from "@/public/img/mini_logo.png";
export default function Notice() {
  return (
    <article className="notice">
      <div className="inner">
        <div className="direct">
          <div className="flex">
            <h4>주요 서비스 바로가기</h4>
            <p>자주 이용하는 서비스를 확인해 보세요.</p>
          </div>
          <Image src={mlogo} alt="minilogo" className="mini_logo"></Image>

          <ul className="direct_box">
            <li>
              <Link href="/community/notice">
                <div className="img-wrap"></div>
                <p>공지사항</p>
              </Link>
            </li>
            <li>
              <Link href="/community/faq">
                <div className="img-wrap"></div>
                <p>자주묻는질문</p>
              </Link>
            </li>
            <li>
              <Link href="mypage/userinfo">
                <div className="img-wrap"></div>
                <p>회원정보</p>
              </Link>
            </li>
            <li>
              <Link href="mypage/latest">
                <div className="img-wrap"></div>
                <p>최근 본 공고</p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="notice_box">
          <div className="flex">
            <h4>공지사항</h4>
            <p>Notice</p>
            <Link href="/community/notice">더보기 +</Link>
          </div>
          <Link href="/community/notice/noticedetail" className="notice_list">
            <h5>2024년 내일스퀘어 출시 안내</h5>
            <p>
              내일스퀘어가 오픈되었습니다. <br></br>
              오픈 베타 테스트가 0월 0일부터 0월 0일까지 진행됩니다. <br></br>
              많은 관심 바랍니다. <br></br>
            </p>
          </Link>
        </div>
      </div>
    </article>
  );
}
