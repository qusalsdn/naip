"use client";

import React from "react";
import Link from "next/link";

import "../../../public/style/community/notice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Notice() {
  const data = [
    {
      number: 1,
      category: "한전KDN",
      title: "전자입찰 신원확인 방법 변경 사전 공지('24.1.1부)",
      author: "관리자",
      date: "2023.12.18",
      views: 121,
      link: "/community/notice/noticedetail01", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 2,
      category: "나라장터",
      title: "연말 입찰마감 집중에 따른 입찰참여 시 유의사항",
      author: "관리자",
      date: "2023.12.22",
      views: 141,
      link: "/community/notice/noticedetail02", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 3,
      category: "나라장터",
      title: "「조달청 시설공사 집행기준」 개정·시행 알림 (건설안전 평가강화)",
      author: "관리자",
      date: "2023.12.26",
      views: 144,
      link: "/community/notice/noticedetail03", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 4,
      category: "한국수력원자력",
      title: "지문보안 토큰 사용의무 폐지 안내",
      author: "관리자",
      date: "2023.12.29",
      views: 111,
      link: "/community/notice/noticedetail04", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 5,
      category: "나라장터",
      title: "「조달청 군수품 선택계약 업무처리규정」 폐지 안내",
      author: "관리자",
      date: "2023.12.29",
      views: 111,
      link: "/community/notice/noticedetail05", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 6,
      category: "나라장터",
      title: "나라장터 지문보안 토큰 사용의무 폐지 안내(24.1.1.)",
      author: "관리자",
      date: "2024.01.02",
      views: 111,
      link: "/community/notice/noticedetail06", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 7,
      category: "나라장터",
      title: "2024년도 기술용역 발주정보 등록 요청",
      author: "관리자",
      date: "2024.01.03",
      views: 111,
      link: "/community/notice/noticedetail07", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 8,
      category: "한전KDN",
      title: "[필독] 지문인식 예외신청 추가 안내",
      author: "관리자",
      date: "2024.01.08",
      views: 111,
      link: "/community/notice/noticedetail08", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 9,
      category: "나라장터",
      title: "「조달청 시설공사 적격심사세부기준」 개정·시행 알림",
      author: "관리자",
      date: "2024.01.08",
      views: 111,
      link: "/community/notice/noticedetail09", // 링크 주소를 적절하게 변경해주세요
    },
    {
      number: 10,
      category: "나라장터",
      title: "콜센터 상담사가 직접 알려주는 나라장터 이용방법 ‘유튜브 영상’추가 게시(2차)",
      author: "관리자",
      date: "2024.01.10",
      views: 111,
      link: "/community/notice/noticedetail10", // 링크 주소를 적절하게 변경해주세요
    },
  ];

  const reversedData = [...data].reverse();

  return (
    <article id="notice">
      <div className="inner">
        <h2>공지사항</h2>

        <div className="filter_bar">
          <select name="" id="">
            <option value="">전체</option>
            <option value="">최근 1개월</option>
            <option value="">최근 3개월</option>
            <option value="">최근 1년</option>
          </select>
          <select name="" id="">
            <option value="">제목</option>
            <option value="">제목 + 내용</option>
            <option value="">내용</option>
            <option value="">작성자</option>
          </select>
          <input type="search" />
          <button>검색</button>
        </div>

        <div>
          <table>
            <colgroup>
              <col width="60px" />
              <col width="800px" />
              <col width="160px" />
              <col width="160px" />
              {/* <col width="100px" /> */}
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
                {/* <th>조회수</th> */}
              </tr>
            </thead>
            <tbody>
              {reversedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.number}</td>
                  <td className="title">
                    <Link href={item.link}>
                      <span className="category">{item.category}</span>
                      &nbsp;
                      {item.title}
                    </Link>
                  </td>
                  <td>{item.author}</td>
                  <td>{item.date}</td>
                  {/* <td>{item.views}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pager">
            <button className="itemClass2 disabled">
              <em>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
              </em>
            </button>
            <button className="itemClass2 active">1</button>
            <button className="itemClass2 disabled">
              <em>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
              </em>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
