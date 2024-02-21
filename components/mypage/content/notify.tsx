"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "../../../public/style/mypage/notify.css";

import Image from "next/image";

import { SendDiagonal, WarningCircle } from "iconoir-react";

import Type01 from "@/public/img/type01.png";

import MyFooter from "@/components/mypage/myFooter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import useSWR from "swr";
import axios from "axios";
import { SelectFace3d } from "iconoir-react/regular";
import Pagination from "react-js-pagination";
import { useForm } from "react-hook-form";

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
  stateSummary: string;
  stateDetail: string;
}

interface InterestsType {
  keyword: string;
  institution: string;
}

interface DataType {
  fetchData: ResponseDataType[];
  pageCount: number;
  totalCount: number;
  interests: InterestsType;
}

interface FormType {
  dateType: string;
  dateStart: string;
  dateEnd: string;
  reSearch: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    if (res.data.ok) return res.data;
    else alert("유저 정보를 찾을 수 없습니다.");
  });

export default function RecommendComponent({ isOpen }: any) {
  const [url, setUrl] = useState(
    "/api/mypage/keyword/alert?matching=all&page=1&pageCount=10&dateType=all&dateStart=&dateEnd=&reSearch="
  );
  const [matching, setMatching] = useState("all");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const { register, handleSubmit, getValues } = useForm<FormType>();
  const { data } = useSWR<DataType>(url, fetcher);

  console.log(data?.interests.keyword);
  console.log(data?.interests.institution);

  const onChangePage = (pageNumber: number) => {
    setUrl(
      `/api/mypage/keyword/alert?matching=${matching}&page=${pageNumber}&pageCount=${pageCount}&dateType=${getValues(
        "dateType"
      )}&dateStart=${getValues("dateStart")}&dateEnd=${getValues("dateEnd")}&reSearch=${getValues(
        "reSearch"
      )}`
    );
    setPage(pageNumber);
  };

  const onChangePageCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(
      `/api/mypage/keyword/alert?matching=${matching}&page=${1}&pageCount=${
        e.target.value
      }&dateType=${getValues("dateType")}&dateStart=${getValues("dateStart")}&dateEnd=${getValues(
        "dateEnd"
      )}&reSearch=${getValues("reSearch")}`
    );
    setPage(1);
    setPageCount(Number(e.target.value));
  };

  const onChangeMatching = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(
      `/api/mypage/keyword/alert?matching=${
        e.target.value
      }&page=${1}&pageCount=${pageCount}&dateType=${getValues("dateType")}&dateStart=${getValues(
        "dateStart"
      )}&dateEnd=${getValues("dateEnd")}&reSearch=${getValues("reSearch")}`
    );
    setPage(1);
    setMatching(e.target.value);
  };

  const onSubmit = (formData: FormType) => {
    setUrl(
      `/api/mypage/keyword/alert?matching=${matching}&page=${1}&pageCount=${pageCount}&dateType=${
        formData.dateType
      }&dateStart=${formData.dateStart}&dateEnd=${formData.dateEnd}&reSearch=${formData.reSearch}`
    );
    setPage(1);
  };
  const handlePageChange = (pageNumber: number) => {
    // 리스트가 시작되는 form 태그의 위치를 찾아서 그 위치로 부드럽게 스크롤
    const formElement = document.getElementById("tableStartPoint");

    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }

    // 원래의 onChangePage 함수 호출
    onChangePage(pageNumber);
  };

  //나의 등록 키워드 보기
  const [keywordPopup, setKeywordPopup] = useState(false);

  const handleKeywordPopup = () => {
    setKeywordPopup(true);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // body에 overflow: hidden 및 padding-right 추가
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };
  const closeKeywordPopup = () => {
    setKeywordPopup(false);
    // body의 overflow 및 padding-right 스타일 초기화
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };

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
        maxSlide = (data.fetchData.length - 2) * slideAmount;
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

  //키워드, 관심기관 하이라이트 구현

  const [highlightedText, setHighlightedText] = useState<string[]>([]);

  const highlightTitle = (text: string) => {
    if (!data) return text;

    const keywords = data.interests.keyword.split(",");
    let highlighted = text;

    keywords.forEach((keyword) => {
      const regex = new RegExp(keyword, "gi");
      highlighted = highlighted.replace(
        regex,
        (match) => `<span class="highlight-keyword">${match}</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  const highlightInstitution = (text: string) => {
    if (!data) return text;

    const institutions = data.interests.institution.split(",");
    let highlighted = text;

    institutions.forEach((institution) => {
      const regex = new RegExp(institution, "gi");
      highlighted = highlighted.replace(
        regex,
        (match) => `<span class="highlight-institution">${match}</span>`
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  ///알림기능 (NewItem)
  const isNewItem = (list_id: number) => {
    // 사용자가 확인한 공고 리스트를 브라우저의 로컬 스토리지에 저장
    const viewedAnnouncements = localStorage.getItem("viewedAnnouncements");
    const viewedList = viewedAnnouncements ? JSON.parse(viewedAnnouncements) : [];

    // 현재 보고 있는 공고가 확인한 공고 리스트에 있는지 확인
    return !viewedList.includes(list_id);
  };

  const markAsViewed = (list_id: number) => {
    // 사용자가 공고를 확인한 경우, 확인한 공고 리스트에 추가

    const viewedAnnouncements = localStorage.getItem("viewedAnnouncements");
    const viewedList = viewedAnnouncements ? JSON.parse(viewedAnnouncements) : [];
    viewedList.push(list_id);
    localStorage.setItem("viewedAnnouncements", JSON.stringify(viewedList));
  };
  // 모든 공고에 대해 markAsViewed 함수 호출
  useEffect(() => {
    if (data) {
      data.fetchData.forEach((item) => {
        markAsViewed(item.list_id);
      });
    }
  }, [data]);

  return (
    <section id="notify" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <div className="tit_box">
          <h2>키워드 매칭 공고</h2>
          <div className="notify-top">
            <div className="top_box">
              <div className="flex">
                <p className="active">키워드 매칭 공고</p>
                {/* <span>{data?.totalCount}</span> */}
              </div>
              <p>등록하신 키워드에 매칭된 공고입니다.</p>
              <Link href="#" onClick={handleKeywordPopup}>
                나의 등록 키워드 보기
                <span>
                  <SendDiagonal color="#333" height={16} width={16} strokeWidth={1.1} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <article className="project_list_notify">
          <ul
            className="all_list_notify"
            ref={containerRef}
            style={{ transform: `translateX(${slidePosition}px)` }}
          >
            {data?.fetchData.map((item, idx) => {
              return (
                <li key={idx} className="project_box_notify">
                  <Link href={`/announcement/${item.list_id}/${item.name}`} target="_blank">
                    <div className="flex_01">
                      <p>
                        <span className="des1">공고기관</span>
                        {highlightInstitution(item.demand_agency)}
                      </p>
                    </div>
                    <h3>{highlightTitle(item.name)}</h3>

                    <p className="pj_price">
                      사업금액{" "}
                      <span className="no_str">{Number(item.price).toLocaleString("ko-KR")}</span>원
                    </p>
                    <div className="flex_02">
                      <button className="star_on">
                        <span className="blind">스크랩</span>
                      </button>
                      <p>
                        종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
            <li className="lastCardWrap">
              <div className="lastCard">
                <p>
                  아래 공고 리스트에서 <br></br>더 많은 매칭 공고를 확인해보세요
                </p>
              </div>
            </li>
          </ul>
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
        </article>

        <article className="scrap_list">
          <div className="type">
            <h6>
              <span>
                <FontAwesomeIcon icon={faAngleRight} />
              </span>{" "}
              타입
            </h6>
            <Link href="#" className="general">
              일반
            </Link>

            <Link href="#" className="urgent">
              긴급
            </Link>

            <Link href="#" className="beforehand">
              사전
            </Link>
            <Link href="#" className="re-bid">
              재공고
            </Link>
          </div>

          <form className="top" onSubmit={handleSubmit(onSubmit)} id="tableStartPoint">
            <div className="soating">
              <label>보기</label>
              <select onChange={onChangeMatching}>
                <option value="all">전체보기</option>
                <option value="keyword">매칭키워드로 보기</option>
                <option value="institution">매칭기관으로 보기</option>
              </select>
              <select onChange={onChangePageCount}>
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="30">30개씩 보기</option>
                <option value="50">50개씩 보기</option>
                <option value="100">100개씩 보기</option>
              </select>
            </div>
            <div className="dateSelect">
              <label>검색</label>
              <select {...register("dateType")}>
                <option value="all">전체</option>
                <option value="bidEnd">입찰마감일</option>
                <option value="posting">공고게시일</option>
                <option value="bidStart">입찰시작일</option>
              </select>
              <input type="date" {...register("dateStart")} />
              <span>~</span>
              <input type="date" {...register("dateEnd")} />
            </div>
            <div className="re_search">
              <input type="text" placeholder="결과 내 재검색" {...register("reSearch")} />
              <button type="submit">검색하기</button>
            </div>
          </form>

          <div className="middle">
            <div className="division">
              <h6>
                <span>
                  <WarningCircle color="#333" height={20} width={20} strokeWidth={1.5} />
                </span>
                구분 :
              </h6>
              <div className="notify_division">
                <em className="color1">color</em>
                <p>매칭키워드</p>
              </div>
              <div className="notify_division">
                <em className="color2">color</em>
                <p>매칭기관</p>
              </div>
              <div className="notify_division">
                <em className="color3"></em>
                <p>새로 매칭된 공고</p>
              </div>
            </div>
            <div>
              <p>
                최근 업데이트 :<span>2024-01-11 10:00</span>
              </p>
            </div>
          </div>

          <table>
            <colgroup>
              <col width="60px" />
              {/* <col width="100px" /> */}
              <col width="470px" />
              <col width="200px" />
              <col width="200px" />
              <col width="200px" />
              <col width="150px" />
              {/* <col width="140px" /> */}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" rowSpan={2}>
                  No
                  {/* <input type="checkbox" /> */}
                </th>
                {/* <th>매칭키워드</th> */}
                <th scope="col">
                  공고명 <br />
                  공고번호 / 출처 / 업무구분
                </th>

                <th scope="col">사업금액</th>
                {/* <th scope="col">
                    업종 / <br />
                    공고구분
                  </th> */}
                <th scope="col">공고기관</th>
                <th scope="col">수요기관</th>
                <th scope="col">소재지</th>
                {/* <th scope="col">남은시간</th> */}
              </tr>
              <tr className={"even-row"}>
                {/* <th className="left">매칭기관</th> */}
                <th scope="col" className="left">
                  사업기간
                </th>
                <th scope="col">게시일시</th>

                <th scope="col">입찰일시</th>
                <th scope="col" colSpan={2}>
                  입찰마감일시 / <span className="red-color">신청마감일시</span>
                </th>
                {/* <th scope="col">남은시간</th> */}
              </tr>
            </thead>
            <tbody>
              {data?.fetchData?.map((item, idx) => {
                const showNewItem = isNewItem(item.list_id);

                return (
                  <>
                    <tr>
                      <td rowSpan={2} className="index_num">
                        <label>{(page - 1) * data.pageCount + idx + 1}</label>
                        <span className={`newItem ${showNewItem ? "show" : ""}`}></span>
                      </td>
                      <td className="info">
                        <div className="flex">
                          <Image src={Type01} alt="type"></Image>
                          <Link href={`/announcement/${item.list_id}/${item.name}`} target="_blank">
                            {highlightTitle(item.name)}
                          </Link>
                        </div>
                        <p>
                          {item.number} | {item.division} | {item.division_type}
                        </p>
                        <button className="table_scrap star_off"></button>
                      </td>
                      <td>{Number(item.price).toLocaleString("ko-KR")}원</td>
                      <td>{highlightInstitution(item.announcement_agency)}</td>
                      <td>{highlightInstitution(item.demand_agency)}</td>
                      <td>{item.stateSummary}</td>
                    </tr>
                    <tr className="even-row">
                      {/* <td className="left">-</td> */}
                      <td className="left text-left">
                        계약일로부터 <span className="orange-color">45</span>일간 진행
                      </td>
                      <td>{item.input_date}</td>
                      <td>{item.register_date}</td>
                      <td colSpan={2}>
                        {item.end_date}&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="red-color">{item.qualified_date}</span>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className="pager">
            <Pagination
              activePage={page}
              itemsCountPerPage={Number(data?.pageCount) || 10}
              totalItemsCount={data?.totalCount || 10}
              pageRangeDisplayed={10}
              onChange={handlePageChange} // 여기서 새로 추가된 함수를 사용합니다.
              innerClass="innerClass"
              itemClass="itemClass"
              activeLinkClass="activeLinkClass"
              prevPageText={<FontAwesomeIcon icon={faChevronLeft} />}
              nextPageText={<FontAwesomeIcon icon={faChevronRight} />}
              firstPageText={<FontAwesomeIcon icon={faAnglesLeft} />}
              lastPageText={<FontAwesomeIcon icon={faAnglesRight} />}
            />
          </div>
        </article>
      </div>
      <MyFooter></MyFooter>

      {keywordPopup && (
        <div className="modal-popup">
          <div className="popup-content">
            <div className="popup-flex">
              <h4>MY 관심 키워드</h4>
              <Link href="/mypage/keyword" onClick={closeKeywordPopup}>
                키워드 관리 페이지 바로가기
              </Link>
            </div>
            <div className="interest">
              <h5>등록 관심 키워드</h5>
              <p>{data?.interests.keyword}</p>
            </div>
            <div className="interest">
              <h5>등록 관심 기관</h5>
              <p>{data?.interests.institution}</p>
            </div>

            <button onClick={closeKeywordPopup}>확인</button>
          </div>
        </div>
      )}
    </section>
  );
}
