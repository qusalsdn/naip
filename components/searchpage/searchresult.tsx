"use client";
import React, { useEffect, useState } from "react";

import "../../public/style/searchpage/searchpage.css";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faAngleRight, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Type01 from "@/public/img/type01.png";
import Type02 from "@/public/img/type02.png";
import Type03 from "@/public/img/type03.png";
import Type04 from "@/public/img/type04.png";
import Type05 from "@/public/img/type05.png";
import Type06 from "@/public/img/type06.png";
import Type07 from "@/public/img/type07.png";
import Pagination from "react-js-pagination";

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

interface FilterOptionsType {
  dateRadio: string;
  applicable: boolean;
  bidSelect: string;
  dateStart: string;
  dateEnd: string;
  condition: string;
  searchKeyword: string;
  exceptionKeyword: string;
  sourceSelect: string;
  announcementSelect: string;
  announcementSelectKeyword: string;
  reAnnouncementSelect: string;
  reSearchKeyword: string;
}

interface DataType {
  resData: ResponseDataType[];
  exceptionKeywordArr: string[];
  searchKeywordArr: string[];
  msg: string;
  totalCount: number;
  pageCount: number;
  filterOptions: FilterOptionsType;
}

interface PropsType {
  data: DataType;
  loading: boolean;
  page: number;
  onChangePage: any;
  onChangePageCount: any;
  register: any;
  handleSubmit: any;
  onSubmit: any;
  toggleStar: any;
  onClickToggle: any;
  toggleExecptionStates: any;
  toggleSearchStates: any;
  setToggleExecptionStates: any;
  setToggleSearchStates: any;
}

export default function SearchResult({
  data,
  loading,
  page,
  onChangePage,
  onChangePageCount,
  register,
  handleSubmit,
  onSubmit,
  toggleStar,
  onClickToggle,
  toggleExecptionStates,
  toggleSearchStates,
  setToggleExecptionStates,
  setToggleSearchStates,
}: PropsType) {
  //포함 키워드 토글설명
  const [isExplainVisible, setIsExplainVisible] = useState(false);
  const handleMouseEnter = () => {
    setIsExplainVisible(true);
  };

  const handleMouseLeave = () => {
    setIsExplainVisible(false);
  };

  //제외 키워드 토글설명
  const [isExplainVisible2, setIsExplainVisible2] = useState(false);
  const handleMouseEnter2 = () => {
    setIsExplainVisible2(true);
  };

  const handleMouseLeave2 = () => {
    setIsExplainVisible2(false);
  };

  //키워드 하이라이트 구현
  const highlightKeywords = (text: any) => {
    const regex = new RegExp(Object.keys(toggleObj.search).join("|"), "gi");
    return text.replace(regex, (match: any) => `<span class="highlight">${match}</span>`);
  };

  //키워드 토글 로직
  const [toggleObj, setToggleObj] = useState<any>({ exception: {}, search: {} });

  useEffect(() => {
    let obj: any = {};
    data.exceptionKeywordArr.forEach((item) => {
      if (item.split(",")[1] === "true") obj[item.split(",")[0]] = true;
      else obj[item.split(",")[0]] = false;
    });
    setToggleObj((prevObj: any) => ({ ...prevObj, exception: obj }));
  }, [data.exceptionKeywordArr]);
  useEffect(() => {
    let obj: any = {};
    data.searchKeywordArr.forEach((item) => {
      if (item.split(",")[1] === "true") obj[item.split(",")[0]] = true;
      else obj[item.split(",")[0]] = false;
    });
    setToggleObj((prevObj: any) => ({ ...prevObj, search: obj }));
  }, [data.searchKeywordArr]);

  const onClickToggleException = (idx: number, keyword: string) => {
    setToggleExecptionStates((prevState: any) => {
      const newToggleStates = [...prevState];
      newToggleStates[idx] = !newToggleStates[idx];
      return newToggleStates;
    });
    setToggleObj((prevObj: any) => {
      const updatedObj = { ...prevObj, exception: { ...prevObj.exception, [keyword.split(",")[0]]: !prevObj.exception[keyword.split(",")[0]] } };
      onClickToggle(updatedObj);
      return updatedObj;
    });
  };

  const onClickToggleSearch = (idx: number, keyword: string) => {
    setToggleSearchStates((prevState: any) => {
      const newToggleStates = [...prevState];
      newToggleStates[idx] = !newToggleStates[idx];
      return newToggleStates;
    });
    setToggleObj((prevObj: any) => {
      const updatedObj = { ...prevObj, search: { ...prevObj.search, [keyword.split(",")[0]]: !prevObj.search[keyword.split(",")[0]] } };
      onClickToggle(updatedObj);
      return updatedObj;
    });

    // 키워드 토글 시 키워드 강조 함수 호출
    // const updatedText = highlightKeywords(data.resData[idx].name); // 수정된 부분
    // 업데이트된 텍스트를 어떻게 처리할지는 여기서 결정
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

  return (
    <article className="searchResult" id="tableStartPoint">
      <div className="inner">
        {/* 타입 선택 */}

        {/* 타입 선택  끝 */}
        <div className="result_list">
          <div className="bottom flex">
            <div className="keyword_result">
              <p>
                포함 키워드
                <em className="question" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <FontAwesomeIcon icon={faQuestion} />
                </em>
              </p>
              <div className={`explain ${isExplainVisible ? "visible" : "hidden"}`}>
                입력하신 키워드입니다.
                <br></br>
                클릭 시 해당 키워드를 제외한 결과를 확인하실 수 있습니다.
              </div>
              <div className="keyword-wrap">
                {data.searchKeywordArr[0] !== "null" && data.searchKeywordArr.length !== 0 ? (
                  data.searchKeywordArr.map((item, idx) => {
                    return (
                      <span
                        key={idx}
                        style={{ pointerEvents: `${loading ? "none" : "auto"}` }}
                        className={`include_keyword ${toggleSearchStates[idx] === true ? "" : "toggle_on"}`}
                        onClick={() => onClickToggleSearch(idx, item)}
                      >
                        {item.split(",")[0]}
                      </span>
                    );
                  })
                ) : (
                  <span style={{ cursor: "auto" }}>포함된 키워드가 없습니다.</span>
                )}
              </div>
            </div>
            <div className="except_keyword_result">
              <p>
                제외 키워드
                <em className="question" onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
                  <FontAwesomeIcon icon={faQuestion} />
                </em>
              </p>
              <div className={`explain ${isExplainVisible2 ? "visible" : "hidden"}`}>
                입력하신 제외 키워드입니다.
                <br></br>
                클릭 시 해당 키워드를 포함한 결과를 확인하실 수 있습니다.
              </div>
              <div className="keyword-wrap">
                {data.exceptionKeywordArr[0] !== "null" && data.exceptionKeywordArr.length !== 0 ? (
                  data.exceptionKeywordArr.map((item, idx) => (
                    <span
                      key={idx}
                      style={{ pointerEvents: `${loading ? "none" : "auto"}` }}
                      className={`exclude_keyword ${toggleExecptionStates[idx] === true ? "" : "toggle_on"}`}
                      onClick={() => onClickToggleException(idx, item)}
                    >
                      {item.split(",")[0]}
                    </span>
                  ))
                ) : (
                  <span style={{ cursor: "auto" }}>제외된 키워드가 없습니다.</span>
                )}
              </div>
            </div>
          </div>
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

            {/* <Link href="#" className="change">
              변경
            </Link> */}

            <Link href="#" className="beforehand">
              사전
            </Link>

            {/* <Link href="#" className="bid">
              입찰
            </Link>

            <Link href="#" className="announce">
              공지
            </Link> */}

            <Link href="#" className="re-bid">
              재공고
            </Link>
          </div>
          <div className="top">
            <p>
              검색된 공고 수 : <span>{data.totalCount}</span> 건 [{page}/{Math.ceil(data.totalCount / data.pageCount)}]
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <select {...register("pageCount")} onChange={onChangePageCount}>
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="30">30개씩 보기</option>
                <option value="50">50개씩 보기</option>
                <option value="100">100개씩 보기</option>
              </select>
              <select {...register("reAnnouncementSelect")}>
                <option value="name">공고명</option>
                <option value="public">공고기관명</option>
                <option value="demand">수요기관명</option>
              </select>
              <input {...register("reSearchKeyword")} type="search" />
              <button type="submit">결과 내 재검색</button>
            </form>
          </div>
          <div>
            <table>
              <colgroup>
                <col width="60px" />
                <col width="470px" />
                <col width="200px" />
                {/* <col width="100px" /> */}
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
                {data.resData.length !== 0 ? (
                  data.resData.map((item, idx) => {
                    let divisionType;
                    switch (item.division_type) {
                      case "일반":
                        divisionType = Type01;
                        break;
                      case "긴급":
                        divisionType = Type02;
                        break;
                      case "사전":
                        divisionType = Type04;
                        break;
                      case "재공고":
                        divisionType = Type07;
                        break;
                      default:
                        divisionType = Type01;
                        break;
                    }

                    return (
                      <>
                        <tr key={idx}>
                          <td rowSpan={2}>
                            <label>{(page - 1) * data.pageCount + idx + 1}</label>
                            {/* <input type="checkbox" /> */}
                          </td>
                          <td className="info">
                            <div className="flex">
                              <Image src={divisionType} alt="일반"></Image>
                              <a href={`/announcement/${item.list_id}/${item.name}`} target="_blank">
                                <span dangerouslySetInnerHTML={{ __html: highlightKeywords(item.name) }} />
                              </a>
                            </div>
                            <p>
                              {item.number} | {item.division} | 용역
                            </p>
                            {loading ? (
                              <button className="table_scrap star_off"></button>
                            ) : (
                              <button
                                className={`table_scrap ${item.bookMarkCheck ? "star_on" : "star_off"}`}
                                onClick={() => toggleStar(item.list_id, item.bookMarkCheck)}
                              ></button>
                            )}
                          </td>
                          <td className={`right ${item.price === "-" ? "none" : ""}`}>
                            {item.price === "-" ? "공고 원문에서 확인" : `${Number(item.price).toLocaleString("ko-KR")}원`}
                          </td>
                          {/* <td>
                          기타용역
                          <br />
                          <br />
                          <span className="blue-color">용역</span>
                        </td> */}
                          <td>{item.announcement_agency}</td>
                          <td>{item.demand_agency}</td>
                          <td className={`${item.stateDetail === "-" ? "none" : ""}`}>
                            {item.stateSummary === "-" ? "정보없음" : `${item.stateSummary} ${item.stateDetail}`}
                          </td>
                          {/* <td>
                          <span className="red-color">{item.terminationDate}</span>
                        </td> */}
                        </tr>

                        <tr className={"even-row"}>
                          <td className="left text-left">
                            계약일로부터 <span className="orange-color">45</span>일간 진행
                          </td>
                          <td>{item.input_date}</td>
                          <td>{item.register_date}</td>
                          <td colSpan={2}>
                            {item.end_date}&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;<span className="red-color">{item.qualified_date}</span>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8}>데이터가 존재하지 않습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pager">
              <Pagination
                activePage={page}
                itemsCountPerPage={Number(data.pageCount)}
                totalItemsCount={data.totalCount}
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
          </div>
        </div>
      </div>
    </article>
  );
}
