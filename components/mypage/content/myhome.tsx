"use client";

import Link from "next/link";
import MyFooter from "@/components/mypage/myFooter";
import Milestone from "@/components/mypage/content/milestone";
import Image from "next/image";
import mlogo from "@/public/img/slogan2.png";
import Keyword from "@/public/img/my_direct_01.png";
import Condition from "@/public/img/my_direct_02.png";
import FAQ from "@/public/img/my_direct_05.png";
import Report from "@/public/img/my_direct_04.png";
import "../../../public/style/mypage/myhome.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faQuestion } from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import axios from "axios";
import { useState, useRef } from "react";

import { Star, NavArrowRight } from "iconoir-react";

interface cardDataType {
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

interface ResponseDataType {
  recentData: cardDataType[];
  bookMarkData: cardDataType[];
  keywordData: cardDataType[];
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    return res.data.data;
  });

export default function Myhome({ isOpen, userInfo }: any) {
  const { data, isLoading } = useSWR<ResponseDataType>("/api/mypage/home", fetcher);

  //탭메뉴 구현
  const [scrapTab, setScrapTab] = useState(true);
  const [latestTab, setLatestTab] = useState(false);
  const [keywordTab, setKeywordTab] = useState(false);

  const handleTab1 = () => {
    setScrapTab(true);
    setLatestTab(false);
    setKeywordTab(false);
  };
  const handleTab2 = () => {
    setScrapTab(false);
    setLatestTab(true);
    setKeywordTab(false);
  };
  const handleTab3 = () => {
    setScrapTab(false);
    setLatestTab(false);
    setKeywordTab(true);
  };

  /*** 최근 본 공고 카드 슬라이드 ***/

  //슬라이드 버튼 스타일
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  //카드 슬라이드 구현
  const containerRef = useRef(null);
  const [slidePosition, setSlidePosition] = useState(0);

  const handleSlide = (direction: any) => {
    const container: any = containerRef.current;

    if (container) {
      const containerWidth = container.offsetWidth;
      const slideAmount = containerWidth * 0.3416;
      let maxSlide = 0;
      if (data) {
        maxSlide = (data?.recentData.length - 2) * slideAmount;
      }

      if (direction === "right" && slidePosition > -maxSlide) {
        setSlidePosition((prevPosition) => prevPosition - slideAmount);
        setIsLeftButtonDisabled(false);
        // 오른쪽 끝에 다다랐을 때만 오른쪽 버튼 비활성화
        setIsRightButtonDisabled(slidePosition - slideAmount <= -maxSlide);
      } else if (direction === "left" && slidePosition < 0) {
        setSlidePosition((prevPosition) => prevPosition + slideAmount);
        // 왼쪽 끝에 다다랐을 때만 왼쪽 버튼 비활성화
        setIsLeftButtonDisabled(slidePosition + slideAmount >= 0);
        setIsRightButtonDisabled(false);
      }
    }
  };

  /*** 스크랩 공고 카드 슬라이드 ***/

  //슬라이드 버튼 스타일
  const [isLeftButtonDisabled2, setIsLeftButtonDisabled2] = useState(true);
  const [isRightButtonDisabled2, setIsRightButtonDisabled2] = useState(false);

  //카드 슬라이드 구현
  const containerRef2 = useRef(null);
  const [slidePosition2, setSlidePosition2] = useState(0);

  const handleSlide2 = (direction: any) => {
    const container2: any = containerRef2.current;

    if (container2) {
      const containerWidth2 = container2.offsetWidth;
      const slideAmount2 = containerWidth2 * 0.3416;
      let maxSlide2 = 0;
      if (data) {
        maxSlide2 = (data?.bookMarkData.length - 2) * slideAmount2;
      }

      if (direction === "right2" && slidePosition2 > -maxSlide2) {
        setSlidePosition2((prevPosition2) => prevPosition2 - slideAmount2);
        setIsLeftButtonDisabled2(false);
        // 오른쪽 끝에 다다랐을 때만 오른쪽 버튼 비활성화
        setIsRightButtonDisabled2(slidePosition2 - slideAmount2 <= -maxSlide2);
      } else if (direction === "left2" && slidePosition2 < 0) {
        setSlidePosition2((prevPosition2) => prevPosition2 + slideAmount2);
        // 왼쪽 끝에 다다랐을 때만 왼쪽 버튼 비활성화
        setIsLeftButtonDisabled2(slidePosition2 + slideAmount2 >= 0);
        setIsRightButtonDisabled2(false);
      }
    }
  };

  /*** 스크랩 공고 카드 슬라이드 ***/

  //슬라이드 버튼 스타일
  const [isLeftButtonDisabled3, setIsLeftButtonDisabled3] = useState(true);
  const [isRightButtonDisabled3, setIsRightButtonDisabled3] = useState(false);

  //카드 슬라이드 구현
  const containerRef3 = useRef(null);
  const [slidePosition3, setSlidePosition3] = useState(0);

  const handleSlide3 = (direction: any) => {
    const container3: any = containerRef3.current;

    if (container3) {
      const containerWidth3 = container3.offsetWidth;
      const slideAmount3 = containerWidth3 * 0.3416;
      let maxSlide3 = 0;
      if (data) {
        maxSlide3 = (data?.keywordData.length - 2) * slideAmount3;
      }

      if (direction === "right2" && slidePosition3 > -maxSlide3) {
        setSlidePosition3((prevPosition3) => prevPosition3 - slideAmount3);
        setIsLeftButtonDisabled3(false);
        // 오른쪽 끝에 다다랐을 때만 오른쪽 버튼 비활성화
        setIsRightButtonDisabled3(slidePosition3 - slideAmount3 <= -maxSlide3);
      } else if (direction === "left2" && slidePosition3 < 0) {
        setSlidePosition3((prevPosition3) => prevPosition3 + slideAmount3);
        // 왼쪽 끝에 다다랐을 때만 왼쪽 버튼 비활성화
        setIsLeftButtonDisabled3(slidePosition3 + slideAmount3 >= 0);
        setIsRightButtonDisabled3(false);
      }
    }
  };

  //스케줄일정 설명 팝업
  const [explainPopup, setExplainPopup] = useState(false);

  const handleExplainPopup = () => {
    setExplainPopup(true);
  };
  const handleExplainPopupClose = () => {
    setExplainPopup(false);
  };

  return (
    <section id="myhome" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <article>
          <h2>
            <span>{userInfo?.user?.name}</span>님 반갑습니다
          </h2>
          <Image src={mlogo} alt="slogan" className="slogan"></Image>
          <div className="myhome-top">
            <div className="flex">
              <p className={`${scrapTab ? "active" : ""}`} onClick={handleTab1}>
                나의 관심 공고
              </p>
              <span>{data?.bookMarkData.length === 10 ? "10+" : data?.bookMarkData.length}</span>
            </div>
            <div className="flex">
              <p className={`${latestTab ? "active" : ""}`} onClick={handleTab2}>
                최근 본 공고
              </p>
              <span>{data?.recentData.length === 10 ? "10+" : data?.recentData.length}</span>
            </div>
            <div className="flex">
              <p className={`${keywordTab ? "active" : ""}`} onClick={handleTab3}>
                키워드 매칭 공고
              </p>
              <span>{data?.recentData.length === 10 ? "10+" : data?.keywordData.length}</span>
            </div>
          </div>
        </article>

        {/* 스크랩 */}
        {scrapTab && (
          <article className="project_list_myhome">
            {data?.bookMarkData.length ? (
              <ul
                className="all_list_myhome"
                ref={containerRef2}
                style={{ transform: `translateX(${slidePosition2}px)` }}
              >
                {data.bookMarkData.map((item) => (
                  <li className="project_box_myhome" key={item.list_id}>
                    <Link href={`/announcement/${item.list_id}/${item.name}`}>
                      <div className="flex_01">
                        <p>
                          <span className="des1">공고기관</span>
                          {item.announcement_agency}
                        </p>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="pj_price">
                        사업금액 <span className="no_str">{item.price}</span>원
                      </p>
                      <div className="flex_02">
                        {parseInt(item.terminationDate) <= 0 ? (
                          <p className="endText">마감된 공고입니다</p>
                        ) : (
                          <p>
                            종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="lastCardWrap">
                  <div className="lastCard">
                    <p>
                      더 많은 정보는 <span>나의 관심 공고</span> 페이지에서<br></br> 확인해 주세요.
                    </p>
                    <Link href="/mypage/scrap">나의 관심 공고 페이지 바로가기</Link>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="no-data-message">
                <p>즐겨찾기하신 공고가 없습니다</p>
                <p>공고 검색 페이지에서 공고를 확인해 보세요!</p>
                <Link href="/searchpage">공고 검색 페이지 바로가기</Link>
              </div>
            )}
          </article>
        )}

        {/* 최근 본 공고 */}
        {latestTab && (
          <article className="project_list_myhome">
            {data?.recentData.length ? (
              <ul
                className="all_list_myhome"
                ref={containerRef}
                style={{ transform: `translateX(${slidePosition}px)` }}
              >
                {data.recentData.map((item) => (
                  <li className="project_box_myhome" key={item.list_id}>
                    <Link href={`/announcement/${item.list_id}/${item.name}`}>
                      <div className="flex_01">
                        <p>
                          <span className="des1">공고기관</span>
                          {item.announcement_agency}
                        </p>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="pj_price">
                        사업금액 <span className="no_str">{item.price}</span>원
                      </p>
                      <div className="flex_02">
                        {parseInt(item.terminationDate) <= 0 ? (
                          <p className="endText">마감된 공고입니다</p>
                        ) : (
                          <p>
                            종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="lastCardWrap">
                  <div className="lastCard">
                    <p>
                      더 많은 정보는 <span>최근 본 공고</span> 페이지에서 <br></br>확인해 주세요.
                    </p>
                    <Link href="/mypage/latest">최근 본 공고 페이지 바로가기</Link>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="no-data-message">
                <p>최근 조회하신 공고가 없습니다</p>
                <p>공고 검색 페이지에서 공고를 확인해 보세요!</p>
                <Link href="/searchpage">공고 검색 페이지 바로가기</Link>
              </div>
            )}
          </article>
        )}

        {/* 키워드 매칭 공고 */}
        {keywordTab && (
          <article className="project_list_myhome">
            {data?.keywordData.length ? (
              <ul
                className="all_list_myhome"
                ref={containerRef3}
                style={{ transform: `translateX(${slidePosition3}px)` }}
              >
                {data.keywordData.map((item) => (
                  <li className="project_box_myhome" key={item.list_id}>
                    <Link href={`/announcement/${item.list_id}/${item.name}`}>
                      <div className="flex_01">
                        <p>
                          <span className="des1">공고기관</span>
                          {item.announcement_agency}
                        </p>
                      </div>
                      <h3>{item.name}</h3>
                      <p className="pj_price">
                        사업금액 <span className="no_str">{item.price}</span>원
                      </p>
                      <div className="flex_02">
                        {parseInt(item.terminationDate) <= 0 ? (
                          <p className="endText">마감된 공고입니다</p>
                        ) : (
                          <p>
                            종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="lastCardWrap">
                  <div className="lastCard">
                    <p>
                      더 많은 정보는 <span>키워드 매칭 공고</span> 페이지에서 <br></br>확인해
                      주세요.
                    </p>
                    <Link href="/mypage/notify">키워드 매칭 공고 페이지 바로가기</Link>
                  </div>
                </li>
              </ul>
            ) : (
              <div className="no-data-message">
                <p>키워드 매칭 공고가 없습니다</p>
                <p>공고 검색 페이지에서 공고를 확인해 보세요!</p>
                <Link href="/searchpage">공고 검색 페이지 바로가기</Link>
              </div>
            )}
          </article>
        )}

        {latestTab && data?.recentData && data.recentData.length > 0 && (
          <>
            <div className="slide_btn">
              <button
                onClick={() => handleSlide("left")}
                className={isLeftButtonDisabled ? "disabled" : ""}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              </button>
              <button
                onClick={() => handleSlide("right")}
                className={isRightButtonDisabled ? "disabled" : ""}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </button>
            </div>
          </>
        )}

        {scrapTab && data?.bookMarkData && data.bookMarkData.length > 0 && (
          <>
            <div className="slide_btn">
              <button
                onClick={() => handleSlide2("left2")}
                className={isLeftButtonDisabled2 ? "disabled" : ""}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              </button>
              <button
                onClick={() => handleSlide2("right2")}
                className={isRightButtonDisabled2 ? "disabled" : ""}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </button>
            </div>
          </>
        )}

        {keywordTab && data?.keywordData && data.keywordData.length > 0 && (
          <>
            <div className="slide_btn">
              <button
                onClick={() => handleSlide3("left2")}
                className={isLeftButtonDisabled2 ? "disabled" : ""}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
              </button>
              <button
                onClick={() => handleSlide3("right2")}
                className={isRightButtonDisabled2 ? "disabled" : ""}
              >
                <span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </button>
            </div>
          </>
        )}

        <div className="direct_menu">
          <ul>
            <li>
              <Link href="/searchpage">
                <Image src={Keyword} alt="키워드관리"></Image>
                <div className="direct_text">
                  <h4>공고검색</h4>
                  <p>
                    공고검색 페이지에서 <br></br>
                    나에게 맞는 공고를 검색해보세요.
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/mypage/condition">
                <Image src={Condition} alt="키워드관리"></Image>
                <div className="direct_text">
                  <h4>검색조건관리</h4>
                  <p>
                    나에게 맞는 검색 조건을 저장하고<br></br>
                    손쉽게 불러와 검색해 보세요.
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/mypage/scrap">
                <Image src={FAQ} alt="키워드관리"></Image>
                <div className="direct_text">
                  <h4>나의 관심 공고</h4>
                  <p>
                    내가 즐겨찾기한 공고를 <br></br>한 눈에 확인해 보세요.
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/mypage/userinfo">
                <Image src={Report} alt="키워드관리"></Image>
                <div className="direct_text">
                  <h4>회원정보</h4>
                  <p>
                    회원가입 시 입력하신 정보를 <br></br>
                    편리하게 수정할 수 있어요.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="inner milestone">
        <div className="milestone-txt">
          <h3>관심 공고 스케줄</h3>
          <span
            className="explainMsg"
            onMouseEnter={handleExplainPopup}
            onMouseLeave={handleExplainPopupClose}
          >
            <FontAwesomeIcon icon={faQuestion} />
          </span>
        </div>
        <Milestone data={data?.bookMarkData}></Milestone>

        <div className={`explainPopup ${explainPopup ? "visible" : "hidden"}`}>
          <h5>
            <span>
              <Star color="#f5c35e" height={20} width={20} strokeWidth={1.4} />
            </span>
            회원님께서 즐겨찾기하신 공고 일정이에요
            <span>
              <Star color="#f5c35e" height={20} width={20} strokeWidth={1.4} />
            </span>
          </h5>
          <p>
            <span>
              <NavArrowRight color="#666" height={20} width={20} strokeWidth={1.4} />
            </span>
            회원님께서 즐겨찾기하신 공고의 일정을 10개까지 확인할 수 있어요.
          </p>
          <p>
            <span>
              <NavArrowRight color="#666" height={20} width={20} strokeWidth={1.4} />
            </span>
            해당 공고 막대에 마우스를 올리면 전체 제목을 확인할 수 있어요.
          </p>
        </div>
      </div>
      <MyFooter></MyFooter>
    </section>
  );
}
