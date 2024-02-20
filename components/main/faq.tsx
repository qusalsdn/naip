import React from "react";

import Link from "next/link";
import "../../public/style/faq.css";

export default function FAQ() {
  return (
    <article className="faq">
      <div className="inner">
        <div className="public_data">
          <div className="title_box">
            <h5>공지사항</h5>
            <Link href="/community/notice">more +</Link>
          </div>
          <ul className="public_list">
            <li>
              <h6>나라장터</h6>
              <Link href="/community/notice/noticedetail10">
                콜센터 상담사가 직접 알려주는 나라장터 이용방법 ‘유튜브 영상’추가 게시(2차)
              </Link>
            </li>
            <li>
              <h6>나라장터</h6>
              <Link href="/community/notice/noticedetail09">
                「조달청 시설공사 적격심사세부기준」 개정·시행 알림
              </Link>
            </li>
            <li>
              <h6>한전KDN</h6>
              <Link href="/community/notice/noticedetail08">
                [필독] 지문인식 예외신청 추가 안내
              </Link>
            </li>
            <li>
              <h6>나라장터</h6>
              <Link href="/community/notice/noticedetail07">
                2024년도 기술용역 발주정보 등록 요청
              </Link>
            </li>
            <li>
              <h6>나라장터</h6>
              <Link href="/community/notice/noticedetail06">
                나라장터 지문보안 토큰 사용의무 폐지 안내(24.1.1.)
              </Link>
            </li>
          </ul>
        </div>
        <div className="faq_box">
          <div className="title_box">
            <h5>FAQ / 자주묻는질문</h5>
            <Link href="/community/faq">more +</Link>
          </div>
          <ul className="faq_list">
            <li>
              <h6>Q</h6>
              <Link href="/community/faq">
                마이페이지의 &apos;등록 키워드 관리&apos;와 &apos;검색 조건 관리&apos;의 차이는
                무엇인가요?
              </Link>
            </li>
            <li>
              <h6>Q</h6>
              <Link href="/community/faq">
                검색한 입찰공고 중 관심 있는 입찰공고를 저장하여 확인할 수 있나요?
              </Link>
            </li>
            <li>
              <h6>Q</h6>
              <Link href="/community/faq">뉴스레터는 무엇인가요?</Link>
            </li>
            <li>
              <h6>Q</h6>
              <Link href="/community/faq">뉴스레터를 받고 싶지 않습니다.</Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
