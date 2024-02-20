"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";
import "../../../public/style/announcement/announcement.css";

import Image from "next/image";

import Type01 from "@/public/img/type01.png";
import Type02 from "@/public/img/type02.png";
import Type04 from "@/public/img/type04.png";
import Type07 from "@/public/img/type07.png";

import division01 from "@/public/img/division01.png"; // 나라장터 로고
import division02 from "@/public/img/division02.svg"; // NTIS 로고
import division03 from "@/public/img/division03.png"; // 기업마당 로고
import division04 from "@/public/img/division04.png"; // IRIS 로고
import division05 from "@/public/img/division05.png"; // 한전KDN 로고

import axios from "axios";
import useSWR from "swr";

interface ResponseDataType {
  list_id: number;
  search: string;
  work: string;
  number: string;
  URL: string;
  division: string;
  division_type: string;
  name: string;
  announcement_agency: string;
  demand_agency: string;
  contract: string;
  input_date: string;
  register_date: string;
  end_date: string;
  qualified_date: string;
  price: string;
  terminationDate: string;
  bookMarkCheck: boolean;
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    if (res.data.ok) return res.data.resData;
  });

export default function Announcement({ params }: { params: { slug: string[] } }) {
  const { data, isLoading, mutate } = useSWR<ResponseDataType>(
    `/api/announcement?id=${params.slug[0]}&name=${params.slug[1]}`,
    fetcher
  );
  const [showFixedMenu, setShowFixedMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition >= 550) {
        setShowFixedMenu(true);
      } else {
        setShowFixedMenu(false);
      }
    };

    axios.get(`/api/announcement/recent?id=${params.slug[0]}`);

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [params.slug]);

  const copyToClipboard = () => {
    // 현재 페이지 URL을 가져오기
    const currentURL = window.location.href;

    // 임시 input 엘리먼트를 생성하고 value를 현재 페이지 URL로 설정
    const tempInput = document.createElement("input");
    tempInput.value = currentURL;

    // body에 임시 input 엘리먼트 추가
    document.body.appendChild(tempInput);

    // input을 선택하고 복사
    tempInput.select();
    document.execCommand("copy");

    // body에서 임시 input 엘리먼트 제거
    document.body.removeChild(tempInput);

    alert("현재 URL이 복사되었습니다.");
    // 예: 알림 메시지 등
  };

  const handlePrint = () => {
    print();
  };

  const onClickBookMarkBtn = () => {
    axios
      .post("/api/bookMark", { listId: data?.list_id, bookMarkCheck: data?.bookMarkCheck })
      .then((res) => {
        if (res.data.ok) mutate();
        else alert("유저 정보가 존재하지 않습니다.");
      });
  };

  return (
    <>
      <article id="announceDetail">
        <div className="inner">
          <div className="tit_wrap">
            <div className="flex_wrap">
              <div className="flex">
                <p>
                  <span className="agency">공고기관</span>
                  <span>{data?.announcement_agency}</span>
                </p>
                <p>
                  <span className="agency">수요기관</span>
                  <span>{data?.demand_agency}</span>
                </p>
              </div>
            </div>
            <div className="detail_tit_box">
              <h2>
                {data?.name}
                {data?.division_type === "일반" && (
                  <span>
                    <Image src={Type01} alt="일반"></Image>
                  </span>
                )}
                {data?.division_type === "긴급" && (
                  <span>
                    <Image src={Type02} alt="긴급"></Image>
                  </span>
                )}
                {data?.division_type === "사전" && (
                  <span>
                    <Image src={Type04} alt="사전"></Image>
                  </span>
                )}
                {data?.division_type === "재공고" && (
                  <span>
                    <Image src={Type07} alt="일반"></Image>
                  </span>
                )}
                {data?.division_type !== "일반" &&
                  data?.division_type !== "긴급" &&
                  data?.division_type !== "사전" &&
                  data?.division_type !== "재공고" && (
                    <span>
                      <Image src={Type01} alt="일반"></Image>
                    </span>
                  )}
              </h2>
              <div>
                {data?.division === "나라장터" && <Image src={division01} alt="출처"></Image>}
                {data?.division === "국가과학기술지식정보서비스(NTIS)" && (
                  <Image src={division02} alt="출처"></Image>
                )}
                {data?.division === "기업마당" && <Image src={division03} alt="출처"></Image>}
                {data?.division === "범부처통합연구지원시스템(IRIS)" && (
                  <Image src={division04} alt="출처"></Image>
                )}
                {data?.division === "한전KDN" && <Image src={division05} alt="출처"></Image>}
              </div>
            </div>
            <div className="announceContent">
              <h3>공고일반</h3>
              <div className="list-wrap">
                <div>
                  <dl>
                    <dt>게시일시</dt>
                    <dd>{data?.input_date}</dd>
                  </dl>
                  <dl>
                    <dt>입찰일시</dt>
                    <dd>
                      <span className="blue-color">{data?.register_date}</span>
                    </dd>
                  </dl>
                  <dl>
                    <dt>입찰마감</dt>
                    <dd>{data?.end_date}</dd>
                  </dl>
                  <dl>
                    <dt>신청마감</dt>
                    <dd>
                      <span className="red-color">{data?.qualified_date}</span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt>공고번호</dt>
                    <dd>{data?.number}</dd>
                  </dl>
                  <dl>
                    <dt>용역구분</dt>
                    <dd>기술용역</dd>
                  </dl>
                  <dl>
                    <dt>사업금액</dt>
                    <dd>
                      <span className="orange-color">{data?.price}</span>원
                    </dd>
                  </dl>
                </div>
              </div>

              {/* <div className="announceContent"> 
              <h3>담당자 연락처</h3>
              <div className="list-wrap">
                  <div>
                    <dl>
                      <dt>담당자</dt>
                      <dd>김명선</dd>
                    </dl>
                  </div>

                  <div>
                    <dl>
                      <dt>전화번호</dt>
                      <dd>(031-481-2909)</dd>
                    </dl>
                  </div>
                  
              </div>
              <div className="warnning-msg">
                  <p className="red-color">* 공고와 관련되지 않은 목적으로 연락처를 이용할 경우 법적 처벌을 받을 수 있습니다.</p>
              </div>
            </div> */}
              {/* <div className="detail_summary">
                <h3>공고서 내려받기</h3>
                <div className="file_download">
                  <Link href="#">20231201712-00_1701419730715_공고문(고잔연립4구역 등 3개소).hwp</Link>
                </div>
              </div> */}
              {/* <div className="detail_summary">
                <h3>공고내용</h3>
                <div className="summary">
                  <p>공고 내용 요약이 들어갈 공간입니다.</p>
                </div>
              </div> */}

              <div className="btn_wrap" id="scrollEnd">
                <Link href="/searchpage">돌아가기</Link>
                <div>
                  <button
                    className={data?.bookMarkCheck ? "star_on" : "star_off"}
                    onClick={onClickBookMarkBtn}
                  >
                    스크랩
                  </button>
                </div>
                <div>
                  <button className="share" onClick={copyToClipboard}>
                    페이지 URL 복사
                  </button>
                </div>
                <Link href={`${data?.URL}`} target="_blank">
                  공고원문 바로가기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={`fixed_menu ${showFixedMenu ? "visible" : ""}`}>
          <div className="inner">
            <div>
              <button className={data?.bookMarkCheck ? "star_on" : "star_off"} onClick={onClickBookMarkBtn}>
                스크랩
              </button>
            </div>
            <div>
              <button className="share" onClick={copyToClipboard}>
                페이지 URL 복사
              </button>
            </div>
            <div>
              <button className="print" onClick={handlePrint}>
                현재 페이지 프린트
              </button>
            </div>
            <Link href={`${data?.URL}`} target="_blank">
              공고 원문 보기
            </Link>
          </div>
        </div> */}
      </article>
    </>
  );
}
