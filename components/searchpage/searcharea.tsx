"use client";

import React, { KeyboardEvent, useState } from "react";
import "../../public/style/searchpage/searchpage.css";
import axios from "axios";
import { useUser } from "@/libs/useUser";

export default function SearchArea({
  handleSubmit,
  register,
  onSubmit,
  onChange,
  onClickApplicable,
  dateOnChange,
  setValue,
  onClickSearchFilterSaveBtn,
  filterNames,
  formReset,
  getValues,
}: any) {
  const [detailSearchVisible, setDetailSearchVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleDetail = (event: any) => {
    event.preventDefault();
    setDetailSearchVisible(!detailSearchVisible);
  };

  const onClickSearchFilter = () => {
    axios.get(`/api/searchFilter?filterName=${getValues("searchFilter")}`).then((res) => {
      if (res.data.ok) {
        const searchFilter = res.data.searchFilter[0];
        for (const key in searchFilter) {
          if (key === "applicable") {
            searchFilter[key] === "true" ? setValue(key, true) : setValue(key, false);
          } else if (key === "conditionAndOr") setValue("condition", searchFilter[key]);
          else setValue(key, searchFilter[key]);
        }
      } else alert("유저 정보가 존재하지 않습니다.");
    });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const { data, isLoading } = useUser();

  const [isDivVisible, setDivVisible] = useState(false);
  const handleToggleDiv = () => {
    setDivVisible(!isDivVisible);
  };

  return (
    <article className="searchPage">
      <div className="inner">
        <h2>공고 정보 검색</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="dateSelect" style={{ justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <select {...register("bidSelect")}>
                <option value="bidEnd">입찰마감일</option>
                <option value="announcementPosting">공고게시일</option>
                <option value="bidStart">입찰시작일</option>
              </select>
              <input {...register("dateStart")} type="date" onChange={dateOnChange} />
              <span>~</span>
              <input
                {...register("dateEnd")}
                className="last"
                type="date"
                onChange={dateOnChange}
              />
              <label>
                <input
                  {...register("dateRadio")}
                  type="radio"
                  name="dateRadio"
                  value="1month"
                  onChange={onChange}
                />
                최근 1개월
              </label>
              <label>
                <input
                  {...register("dateRadio")}
                  type="radio"
                  name="dateRadio"
                  value="3month"
                  onChange={onChange}
                />
                최근 3개월
              </label>
              <label>
                <input
                  {...register("dateRadio")}
                  type="radio"
                  name="dateRadio"
                  value="6month"
                  onChange={onChange}
                />
                최근 6개월
              </label>
              <label>
                <input {...register("applicable")} type="checkbox" onClick={onClickApplicable} />
                지원가능공고
              </label>

              {/* <div className="label_wrap">
              <label>
                <input {...register("dateRadio")} type="radio" name="dateRadio" value="dateAll" onChange={onChange} />
                <span>전체</span>
              </label>

              <label>
                <input {...register("dateRadio")} type="radio" name="dateRadio" value="toDayRegistration" onChange={onChange} />
                <span>오늘등록</span>
              </label>
              <label>
                <input {...register("dateRadio")} type="radio" name="dateRadio" value="todayDeadline" onChange={onChange} />
                <span>오늘마감</span>
              </label>
              <label>
                <input {...register("applicable")} type="checkbox" onChange={onChange} />
                <span>지원 가능공고만</span>
              </label>
            </div> */}
            </div>
            {data?.ok && !isLoading && (
              <button className="conditionSave" onClick={handleToggleDiv}>
                검색조건 저장 / 불러오기 {isDivVisible ? "-" : "+"}{" "}
              </button>
            )}
          </div>
          {data?.ok && !isLoading && isDivVisible && (
            <div className="my_search_condition">
              <div className="flex2" style={{ display: "flex", alignItems: "center" }}>
                <p>현재 검색조건 저장하기</p>
                <input
                  {...register("filterName")}
                  type="text"
                  className="condition_name"
                  placeholder="검색조건 이름을 입력해주세요. (최대 30글자)"
                  style={{ padding: "10px 20px", marginRight: "10px", fontSize: "15px" }}
                  onKeyDown={handleKeyPress}
                  maxLength={30}
                />
                <button
                  type="button"
                  className="condition_save"
                  onClick={onClickSearchFilterSaveBtn}
                >
                  {loading ? "저장중..." : "검색조건 저장"}
                </button>
              </div>
              <div className="flex" style={{ alignItems: "center" }}>
                <p>MY 검색조건 불러오기</p>
                <select {...register("searchFilter")} style={{ width: "auto" }}>
                  <option value="">검색조건 선택</option>
                  {filterNames?.map((item: any, idx: number) => {
                    return (
                      <option key={idx} value={item.filterName}>
                        {item.filterName}
                      </option>
                    );
                  })}
                </select>
                <button type="button" className="condition_apply" onClick={onClickSearchFilter}>
                  적용하기
                </button>
              </div>
            </div>
          )}
          <div className="searchpage_box">
            <input
              {...register("searchKeyword")}
              type="search"
              placeholder="키워드로 검색해보세요 (여러 개 입력 시 콤마(,)로 구분)"
            />
            <div className="condition_select">
              <label>
                <input {...register("condition")} type="radio" name="condition" value="or" />
                <p>입력 키워드 OR 조건 검색</p>
              </label>
              <label>
                <input {...register("condition")} type="radio" name="condition" value="and" />
                <p>입력 키워드 AND 조건 검색</p>
              </label>
            </div>
            <div className="typeSelect">
              <label>타입 선택</label>
              <select {...register("divisionType")}>
                <option value="">전체</option>
                <option value="일반">일반</option>
                <option value="긴급">긴급</option>
                <option value="사전">사전</option>
                <option value="재공고">재공고</option>
              </select>
            </div>
            {/* <button type="button" className="detail" onClick={toggleDetail}>
              {detailSearchVisible ? "-" : "+"}
              <br></br>상세조건
            </button> */}
          </div>

          {/* {detailSearchVisible && ( */}

          <div className="searchDetail">
            <input
              {...register("exceptionKeyword")}
              type="search"
              placeholder="제외키워드를 입력하세요 (여러 개 입력 시 콤마(,)로 구분, OR 조건 검색)"
            />
            <select {...register("sourceSelect")} className="select_agency sa1">
              <option value="">출처기관을 선택해 주세요.</option>
              <option value="">전체</option>
              <option value="ntis">국가과학기술지식정보서비스(NTIS)</option>
              <option value="madang">기업마당</option>
              <option value="nara">나라장터</option>
              <option value="iris">범부처통합연구지원시스템(IRIS)</option>
              <option value="kdn">한전KDN</option>
            </select>
            <select {...register("announcementSelect")} className="select_agency sa2">
              <option value="">기관을 선택하세요.</option>
              <option value="">전체</option>
              <option value="public">공고기관</option>
              <option value="demand">수요기관</option>
            </select>
            <input
              {...register("announcementSelectKeyword")}
              type="search"
              placeholder="공고/수요기관을 입력하세요"
              className="sa3"
            />
          </div>

          <div>
            <div className="s_btn_wrap">
              <button type="submit">검색하기</button>

              <button type="button" onClick={formReset}>
                초기화
              </button>
            </div>
          </div>
        </form>
      </div>
    </article>
  );
}
