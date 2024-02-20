import React, { useState, useEffect } from "react";

import "../../public/style/searchbar.css";
import Link from "next/link";

interface AnnouncementInfo {
  todayDate: string;
  announcementAllCount: number;
  announcementMonthCount: number;
  announcementWeekCount: number;
  announcementDayCount: number;
}

interface PropsType {
  handleSubmit: any;
  register: any;
  onSubmit: any;
  onChange: any;
  data: AnnouncementInfo;
  onClickApplicable: any;
  dateOnChange: any;
}

export default function SearchBar({ handleSubmit, register, onSubmit, onChange, data, onClickApplicable, dateOnChange }: PropsType) {
  const [searchFrmVisible, setSearchFrmVisible] = useState(false);
  const [exceptKeywordVisible, setExceptKeywordVisible] = useState(false);

  const toggleSearchFrm = () => {
    setSearchFrmVisible(!searchFrmVisible);
  };

  const toggleExceptKeyword = () => {
    setExceptKeywordVisible(!exceptKeywordVisible);
  };

  //공고 수 올라가는 로직
  const [count, setCount] = useState(0); //공고 전체 수

  useEffect(() => {
    let intervalId: any = null;
    const targetNumber = data?.announcementAllCount; // 여기에 전체 공고 수 데이터 기입
    const increment = targetNumber / 1.5;

    let currentNumber = 0;

    const increaseCount = () => {
      if (currentNumber < targetNumber) {
        currentNumber += increment / 30;
        if (currentNumber > targetNumber) {
          currentNumber = targetNumber;
        }
        const formattedNumber = Math.floor(currentNumber); // 숫자 포맷 적용
        setCount(formattedNumber);
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(increaseCount, 1000 / 30); // 1초에 30번 호출하여 부드럽게 증가

    return () => {
      clearInterval(intervalId);
    };
  }, [data?.announcementAllCount]);

  /* **************** */
  const [count2, setCount2] = useState(0); //일간 공고 수

  useEffect(() => {
    let intervalId: any = null;
    const targetNumber2 = data?.announcementDayCount; // 여기에 일간 공고 수 데이터 기입
    const increment2 = targetNumber2 / 1.5;

    let currentNumber2 = 0;

    const increaseCount2 = () => {
      if (currentNumber2 < targetNumber2) {
        currentNumber2 += increment2 / 30;
        if (currentNumber2 > targetNumber2) {
          currentNumber2 = targetNumber2;
        }
        const formattedNumber2 = Math.floor(currentNumber2);
        setCount2(formattedNumber2);
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(increaseCount2, 1000 / 30);

    return () => {
      clearInterval(intervalId);
    };
  }, [data?.announcementDayCount]);

  /* **************** */
  const [count3, setCount3] = useState(0); //주간 공고 수

  useEffect(() => {
    let intervalId: any = null;
    const targetNumber3 = data?.announcementWeekCount; // 여기에 주간 공고 수 데이터 기입
    const increment3 = targetNumber3 / 1.5;

    let currentNumber3 = 0;

    const increaseCount3 = () => {
      if (currentNumber3 < targetNumber3) {
        currentNumber3 += increment3 / 30;
        if (currentNumber3 > targetNumber3) {
          currentNumber3 = targetNumber3;
        }
        const formattedNumber3 = Math.floor(currentNumber3);
        setCount3(formattedNumber3);
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(increaseCount3, 1000 / 30);

    return () => {
      clearInterval(intervalId);
    };
  }, [data?.announcementWeekCount]);

  /* **************** */
  const [count4, setCount4] = useState(0); //월간 공고 수

  useEffect(() => {
    let intervalId: any = null;
    const targetNumber4 = data?.announcementMonthCount; // 여기에 월간 공고 수 데이터 기입
    const increment4 = targetNumber4 / 1.5;

    let currentNumber4 = 0;

    const increaseCount4 = () => {
      if (currentNumber4 < targetNumber4) {
        currentNumber4 += increment4 / 30;
        if (currentNumber4 > targetNumber4) {
          currentNumber4 = targetNumber4;
        }
        const formattedNumber4 = Math.floor(currentNumber4);
        setCount4(formattedNumber4);
      } else {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(increaseCount4, 1000 / 30);

    return () => {
      clearInterval(intervalId);
    };
  }, [data?.announcementMonthCount]);

  return (
    <article className="search">
      <div className="inner">
        <div className="search_wrap">
          <div className="search_bar">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="able">
                <label>
                  <input {...register("dateRadio")} name="dateRadio" type="radio" value="dateAll" onChange={onChange} />
                  전체
                </label>
                <label>
                  <input {...register("dateRadio")} name="dateRadio" type="radio" value="toDayRegistration" onChange={onChange} />
                  오늘 등록
                </label>
                <label>
                  <input {...register("dateRadio")} name="dateRadio" type="radio" value="todayDeadline" onChange={onChange} />
                  오늘 마감
                </label>
                <label>
                  <input {...register("applicable")} type="checkbox" onClick={onClickApplicable} />
                  지원가능공고
                </label>

                <button type="button" className="detail_search" onClick={toggleSearchFrm}>
                  상세조건검색 {searchFrmVisible ? "-" : "+"}
                </button>
              </div>
              <div className="dateSelect">
                <p>날짜</p>
                <select {...register("bidSelect")}>
                  <option value="bidEnd">입찰마감일</option>
                  <option value="announcementPosting">공고게시일</option>
                  <option value="bidStart">입찰시작일</option>
                </select>
                <input {...register("dateStart")} type="date" onChange={dateOnChange} />
                <span>~</span>
                <input {...register("dateEnd")} className="last" type="date" onChange={dateOnChange} />
                <label>
                  <input {...register("dateRadio")} name="dateRadio" type="radio" value="1month" onChange={onChange} />
                  최근 1개월
                </label>
                <label>
                  <input {...register("dateRadio")} name="dateRadio" type="radio" value="3month" onChange={onChange} />
                  최근 3개월
                </label>
                <label>
                  <input {...register("dateRadio")} name="dateRadio" type="radio" value="6month" onChange={onChange} />
                  최근 6개월
                </label>
              </div>
              {searchFrmVisible && (
                <div className="search_frm">
                  <p>출처</p>
                  <select {...register("sourceSelect")}>
                    <option value="">출처기관을 선택해 주세요.</option>
                    <option value="">전체</option>
                    <option value="ntis">국가과학기술지식정보서비스(NTIS)</option>
                    <option value="madang">기업마당</option>
                    <option value="nara">나라장터</option>
                    <option value="iris">범부처통합연구지원시스템(IRIS)</option>
                    <option value="kdn">한전KDN</option>
                  </select>
                  <p>기관</p>
                  <select {...register("announcementSelect")}>
                    <option value="">기관 선택</option>
                    <option value="">전체</option>
                    <option value="public">공고기관</option>
                    <option value="demand">수요기관</option>
                  </select>
                  <input {...register("announcementSelectKeyword")} type="text" placeholder="공고/수요기관을 입력하세요" />
                </div>
              )}

              {searchFrmVisible && (
                <div className="condition">
                  <label>
                    <input {...register("condition")} type="radio" name="condition" value="or" />
                    검색 키워드 OR 조건 검색
                  </label>
                  <label>
                    <input {...register("condition")} type="radio" name="condition" value="and" />
                    검색 키워드 AND 조건 검색
                  </label>
                </div>
              )}

              <div className="search-bar">
                <p>검색 키워드 입력</p>
                <input {...register("searchKeyword")} type="search" placeholder="키워드로 검색해 보세요 (여러 개 입력 시 콤마(,) 로 구분)" />
                <input type="submit" value="검색하기" className={searchFrmVisible ? "active" : ""}></input>
              </div>
              {searchFrmVisible && (
                <div className="except_keyword">
                  <p>제외 키워드 입력</p>
                  <input type="text" {...register("exceptionKeyword")} placeholder="제외하여 검색할 키워드를 입력하세요 (여러 개 입력 시 콤마(,)로 구분)" />
                </div>
              )}
              {/* 마이키워드 적용 / 로그인 시 주석 해제 */}
              {/* <div className="keyword">
                <label>
                  <input type="checkbox" />
                  MY키워드 적용
                </label>
              </div> */}
            </form>
            {/* <div className="popular">
              <p>
                <Image src={solidStar} alt=""></Image>
                인기검색어
              </p>
              <span># 키워드1</span>
              <span># 키워드2</span>
              <span># 키워드3</span>
              <span># 키워드4</span>
            </div> */}
          </div>

          <div className="sb_business">
            <div className="today">{data?.todayDate} 기준</div>
            <div className="lc_flex">
              <h2 className={searchFrmVisible ? "active" : ""}>오늘의 내일스퀘어</h2>
              <div className={searchFrmVisible ? "flex active" : "flex"}>
                <div className="sb_txt-box">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h4>월간</h4>
                    <p>
                      <span>{count4.toLocaleString()}</span>건
                    </p>
                  </Link>
                </div>
                <div className="sb_txt-box">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h4>주간</h4>
                    <p>
                      <span>{count3.toLocaleString()}</span>건
                    </p>
                  </Link>
                </div>
                <div className="sb_txt-box">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h4>일간</h4>
                    <p>
                      <span>{count2.toLocaleString()}</span>건
                    </p>
                  </Link>
                </div>
              </div>
              <div className="total_sb">
                <h4>누적 </h4>
                <p>
                  <span>{count.toLocaleString()}</span> 건
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
