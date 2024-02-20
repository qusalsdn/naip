"use client";

import React, { KeyboardEvent, useState, useEffect } from "react";
import "../../public/style/searchpage/searchpageNew.css";
import axios from "axios";
import useUser from "@/libs/useUser";
import { Refresh, Settings, InfoCircle, Xmark } from "iconoir-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function SearchAreaNew({
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
  checked,
  applicableChecked,
  buttonStates,
  buttonData,
  handleButtonClick,
  buttonStates2,
  buttonData2,
  handleButtonClick2,
  markers,
  val1,
  setVal1,
  conditionChecked,
  handleCondtionChecked,
  conditionChecked2,
  handleCondtionChecked2,
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
          } else if (key === "conditionAndOr") {
            setValue("condition", searchFilter[key]);
          } else if (key === "sourceSelect") {
            if (searchFilter[key] !== "sourceSelectAll") {
              searchFilter[key].split(",").forEach((id: any) => handleButtonClick(id));
            }
          } else if (key === "announcementType") {
            if (searchFilter[key] !== "typeAll") {
              searchFilter[key].split(",").forEach((id: any) => handleButtonClick2(id));
            }
          } else if (key === "amountStart") {
            setVal1((prevValue: any) => {
              for (const markerKey in markers) {
                if (markers[markerKey] === searchFilter[key]) return [markerKey, prevValue[1]];
              }
            });
          } else if (key === "amountEnd") {
            setVal1((prevValue: any) => {
              for (const markerKey in markers) {
                if (markers[markerKey] === searchFilter[key]) return [prevValue[0], markerKey];
              }
            });
          } else {
            setValue(key, searchFilter[key]);
          }
        }
        handleCondtionChecked2(searchFilter["announcementSelect"]);
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

  //상세보기
  const [searchFrmVisible, setSearchFrmVisible] = useState(false);
  const toggleSearchFrm = () => {
    setSearchFrmVisible(!searchFrmVisible);
  };

  //키워드 숫자세는 로직
  const [keywords, setKeywords] = useState({ search: "", exception: "" });
  const [count, setCount] = useState({ search: 0, exception: 0 });

  useEffect(() => {
    // 키워드가 변경될 때마다 콤마로 분리하고 개수를 업데이트
    const updateCount = (type: any, value: any) => {
      const keywordArray = value.split(",").filter((keyword: any) => keyword.trim() !== "");
      const keywordCount = keywordArray.length > 100 ? 100 : keywordArray.length;
      setCount((prevCount) => ({ ...prevCount, [type]: keywordCount }));
    };

    updateCount("search", keywords.search);
    updateCount("exception", keywords.exception);
  }, [keywords]);

  const handleInputChange = (type: any, event: any) => {
    const { value } = event.target;
    setKeywords((prevKeywords) => ({ ...prevKeywords, [type]: value }));
  };

  //사업기간 버튼 토글
  const buttonData3 = [
    { id: "", text: "전체" },
    { id: "period01", text: "1주일 ~ 1개월" },
    { id: "period02", text: "1개월 ~ 3개월" },
    { id: "period03", text: "3개월 ~ 6개월" },
    { id: "period04", text: "6개월 ~ 1년" },
    { id: "period05", text: "1년이상" },
  ];

  const [buttonStates3, setButtonStates3] = useState(
    buttonData3.reduce((acc: any, button: any) => {
      acc[button.id] = button.id === "";
      return acc;
    }, {})
  );

  const handleButtonClick3 = (button: any) => {
    if (button === "") {
      const updatedStates3 = Object.keys(buttonStates).reduce((acc: any, key) => {
        acc[key] = key === "";
        return acc;
      }, {});
      setButtonStates3(updatedStates3);
    } else {
      setButtonStates3((prevStates3: any) => ({
        ...prevStates3,
        "": false,
        [button]: !prevStates3[button],
      }));
    }
  };

  // const handleVal1Change = (value: any) => {
  //   setVal1([value, val1[1]]);
  //   setMarkers((prevMarkers: any) => ({
  //     ...prevMarkers,
  //     0: `${value}원`,
  //   }));
  // };

  //제외 키워드에 대한 설명 팝업
  const [exceptExplain, setExceptExplain] = useState(true);

  const closeExcept = () => {
    setExceptExplain(false);
  };

  //상세조건 검색에 대한 설명 팝업
  const [detailExplain, setDetailExplain] = useState(false);

  const handleDetailExplain = () => {
    setDetailExplain(!detailExplain);
  };

  //검색조건 저장에 대한 설명 팝업
  const [conditionExplain, setConditionExplain] = useState(false);

  const handleConditionExplain = () => {
    setConditionExplain(!conditionExplain);
  };

  return (
    <article className="searchPage">
      <div className="inner">
        <h2>공고 정보 검색</h2>
        <div className="condition_save_load">
          {data?.ok && !isLoading && (
            <div className="saveload">
              <p>검색조건 저장 / 불러오기</p>
              <button onClick={handleToggleDiv}>
                <span>
                  <Settings></Settings>
                </span>
              </button>
            </div>
          )}
          {data?.ok && !isLoading && isDivVisible && (
            <div className="saveload_popup">
              <h4>
                검색조건 저장 / 불러오기
                <span onClick={handleConditionExplain}>
                  <InfoCircle></InfoCircle>
                </span>
                <div className={`explainConditon ${conditionExplain ? "visible" : "hidden"}`}>
                  현재 검색조건을 저장하거나 저장해둔 검색조건을 적용하실 수 있습니다. <br></br>
                  검색조건삭제는 마이페이지 {">"} 검색조건관리 페이지에서 가능합니다.
                </div>
              </h4>
              <div className="conditon_save">
                <p>현재 검색조건 저장하기</p>
                <input
                  {...register("filterName")}
                  type="text"
                  placeholder="검색조건 이름을 입력해주세요. (최대 30글자)"
                  style={{ padding: "10px 20px", marginRight: "10px", fontSize: "15px" }}
                  onKeyDown={handleKeyPress}
                  maxLength={30}
                />
                <button type="button" onClick={onClickSearchFilterSaveBtn}>
                  {loading ? "저장중..." : "검색조건 저장"}
                </button>
              </div>
              <div className="condition_load">
                <p>나의 검색조건 불러오기</p>
                <select {...register("searchFilter")}>
                  <option value="">검색조건 선택</option>
                  {filterNames?.map((item: any, idx: number) => {
                    return (
                      <option key={idx} value={item.filterName}>
                        {item.filterName}
                      </option>
                    );
                  })}
                </select>
                <button type="button" onClick={onClickSearchFilter}>
                  적용하기
                </button>
              </div>
              <button className="Xmark" onClick={handleToggleDiv}>
                <span>
                  <Xmark></Xmark>
                </span>
              </button>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} id="searchForm">
          <div className="form_line">
            <h3>날짜</h3>
            <select {...register("bidSelect")}>
              <option value="bidEnd">입찰마감일</option>
              <option value="announcementPosting">공고게시일</option>
              <option value="bidStart">입찰시작일</option>
            </select>
            <input {...register("dateStart")} type="date" onChange={dateOnChange} />
            <span>~</span>
            <input {...register("dateEnd")} type="date" onChange={dateOnChange} />
            <label>
              <input
                {...register("dateRadio")}
                type="radio"
                name="dateRadio"
                value="1month"
                onChange={onChange}
              />
              <span className={`custom_radio ${checked === "1month" && "checkedRadio"}`}></span>
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
              <span className={`custom_radio ${checked === "3month" && "checkedRadio"}`}></span>
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
              <span className={`custom_radio ${checked === "6month" && "checkedRadio"}`}></span>
              최근 6개월
            </label>
            <div className="check_box">
              <div className="cntr">
                <input
                  {...register("applicable")}
                  type="checkbox"
                  onClick={onClickApplicable}
                  className="hidden-xs-up"
                  id="cbx"
                />
                <label
                  htmlFor="cbx"
                  className={`cbx ${applicableChecked ? "checked2" : ""}`}
                ></label>
              </div>
              <label htmlFor="cbx">지원 가능 공고만</label>
            </div>

            <button
              type="button"
              className="detailToggle"
              onClick={toggleSearchFrm}
              onMouseEnter={handleDetailExplain}
              onMouseLeave={handleDetailExplain}
            >
              상세조건 검색 {searchFrmVisible ? "-" : "+"}
            </button>
            <div className={`explainDetail ${detailExplain ? "visible" : "hidden"}`}>
              출처, 기관, 소재지, 타입, 사업금액 등 상세조건 검색이 가능합니다.
            </div>
          </div>
          <div className="form_line">
            <h3>검색조건</h3>
            <label>
              <input
                {...register("condition")}
                type="radio"
                name="condition"
                value="or"
                onChange={() => handleCondtionChecked("or")}
                checked={conditionChecked === "or"}
              />
              <span
                className={`custom_radio ${conditionChecked === "or" ? "checkedRadio" : ""}`}
              ></span>
              <p>입력 키워드 OR 조건 검색</p>
            </label>
            <label>
              <input
                {...register("condition")}
                type="radio"
                name="condition"
                value="and"
                onChange={() => handleCondtionChecked("and")}
                checked={conditionChecked === "and"}
              />
              <span
                className={`custom_radio ${conditionChecked === "and" ? "checkedRadio" : ""}`}
              ></span>
              <p>입력 키워드 AND 조건 검색</p>
            </label>
          </div>
          <div className="form_line search_frm_line">
            <h3>키워드</h3>
            <div className="keywordWrap">
              <div className="keywordInput">
                <label>
                  포함&nbsp;
                  <span>
                    (<em className={`${count.search === 100 ? "limit" : ""}`}>{count.search}</em>/
                    <em className={`${count.search === 100 ? "limit" : "limit_color"}`}>100</em>)
                  </span>
                </label>
                <input
                  {...register("searchKeyword")}
                  type="search"
                  // value={keywords.search}
                  onChange={(e) => handleInputChange("search", e)}
                  placeholder="검색키워드를 입력하세요 (여러 개 입력 시 콤마(,)로 구분)"
                />
              </div>
              <div className="keywordInput">
                <label>
                  제외&nbsp;
                  <span>
                    (
                    <em className={`${count.exception === 100 ? "limit" : ""}`}>
                      {count.exception}
                    </em>
                    /<em className={`${count.exception === 100 ? "limit" : "limit_color"}`}>100</em>
                    )
                  </span>
                </label>
                <input
                  {...register("exceptionKeyword")}
                  type="search"
                  // value={keywords.exception}
                  onChange={(e) => handleInputChange("exception", e)}
                  placeholder="제외키워드를 입력하세요 (여러 개 입력 시 콤마(,)로 구분)"
                />
                {exceptExplain && (
                  <div className="explainExcept">
                    <p>
                      Tip) 해당 키워드를 제외하는 결과를 확인하실 수 있어요.
                      <button onClick={closeExcept}>
                        <Xmark></Xmark>
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="submitBtn">
              검색하기
            </button>
            <button
              type="button"
              onClick={formReset}
              className={`refreshBtn ${searchFrmVisible ? "active" : ""}`}
            >
              <span>
                <Refresh width={16} height={16} strokeWidth={1.5} />
              </span>
              초기화
            </button>
          </div>
          {searchFrmVisible && (
            <>
              <div className="form_line frmdetail">
                <h3>상세조건검색</h3>
                <p>출처, 기관, 소재지, 타입, 사업금액 등 상세검색이 가능합니다.</p>
              </div>
              <div className="form_line">
                <h3>출처선택</h3>
                {buttonData.map((button: any) => (
                  <button
                    key={button.id}
                    type="button"
                    className={`toggleBtn ${buttonStates[button.id] ? "active" : ""}`}
                    onClick={() => handleButtonClick(button.id)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
              <div className="form_line">
                <div className="form_line2">
                  <h3>기관명</h3>
                  <label>
                    <input
                      {...register("announcementSelect")}
                      type="radio"
                      name="announcementSelect"
                      value="announcementAll"
                      onChange={() => handleCondtionChecked2("announcementAll")}
                      checked={conditionChecked2 === "announcementAll"}
                    />
                    <span
                      className={`custom_radio ${
                        conditionChecked2 === "announcementAll" ? "checkedRadio" : ""
                      }`}
                    ></span>
                    <p>전체</p>
                  </label>
                  <label>
                    <input
                      {...register("announcementSelect")}
                      type="radio"
                      name="announcementSelect"
                      value="public"
                      onChange={() => handleCondtionChecked2("public")}
                      checked={conditionChecked2 === "public"}
                    />
                    <span
                      className={`custom_radio ${
                        conditionChecked2 === "public" ? "checkedRadio" : ""
                      }`}
                    ></span>
                    <p>공고기관</p>
                  </label>
                  <label>
                    <input
                      {...register("announcementSelect")}
                      type="radio"
                      name="announcementSelect"
                      value="demand"
                      onChange={() => handleCondtionChecked2("demand")}
                      checked={conditionChecked2 === "demand"}
                    />
                    <span
                      className={`custom_radio ${
                        conditionChecked2 === "demand" ? "checkedRadio" : ""
                      }`}
                    ></span>
                    <p>수요기관</p>
                  </label>
                  <input
                    className="announcementInput"
                    {...register("announcementSelectKeyword")}
                    type="search"
                    placeholder="기관명을 입력하세요"
                  />
                </div>
                <div className="form_line3">
                  <h3>소재지</h3>
                  <select {...register("location")}>
                    <option value="locationAll">전국</option>
                    <option value="서울특별시">서울특별시</option>
                    <option value="부산광역시">부산광역시</option>
                    <option value="인천광역시">인천광역시</option>
                    <option value="대구광역시">대구광역시</option>
                    <option value="광주광역시">광주광역시</option>
                    <option value="대전광역시">대전광역시</option>
                    <option value="울산광역시">울산광역시</option>
                    <option value="세종시">세종시</option>
                    <option value="경기도">경기도</option>
                    <option value="강원도">강원도</option>
                    <option value="충청북도">충청북도</option>
                    <option value="충청남도">충청남도</option>
                    <option value="전라북도">전라북도</option>
                    <option value="전라남도">전라남도</option>
                    <option value="경상북도">경상북도</option>
                    <option value="경상남도">경상남도</option>
                    <option value="제주">제주</option>
                  </select>
                </div>
              </div>
            </>
          )}
          {searchFrmVisible && (
            <div className="form_line">
              <div className="form_line2">
                <h3>타입선택</h3>
                {buttonData2.map((button: any) => (
                  <button
                    key={button.id}
                    type="button"
                    className={`toggleBtn ${buttonStates2[button.id] ? "active" : ""}`}
                    onClick={() => handleButtonClick2(button.id)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
              {/* <div className="form_line3">
                <h3>업무분야</h3>
                <select>
                  <option value="">전체</option>
                  <option value="">물품</option>
                  <option value="">공사</option>
                  <option value="">용역</option>
                  <option value="">리스</option>
                  <option value="">외자</option>
                  <option value="">비축</option>
                  <option value="">기타</option>
                  <option value="">민간</option>
                </select>
              </div> */}
            </div>
          )}
          {searchFrmVisible && (
            <div className="form_line form_line_price">
              <h3>사업금액</h3>
              <input type="text" value={markers[val1[0]]} />
              <span style={{ marginRight: "10px" }}>~</span>
              <input type="text" value={markers[val1[1]]} />
              <div className="rangeWrap">
                <Slider
                  range //range버튼을 두 개로 만들어줌
                  min={0} //시작 지점 지정
                  max={9} //마지막 지점 지정
                  step={1} //몇칸씩 이동할지 설정
                  dots={true} //step별로 dot 추가
                  marks={markers} //각 dots별 이름 추가
                  value={val1}
                  keyboard={true}
                  onChange={(value: any) => setVal1(value)}
                />
              </div>
            </div>
          )}
          {/* {searchFrmVisible && (
            <div className="form_line">
              <h3>사업기간</h3>
              {buttonData3.map((button) => (
                <button key={button.id} type="button" className={`toggleBtn ${buttonStates3[button.id] ? "active" : ""}`} onClick={() => handleButtonClick3(button.id)}>
                  {button.text}
                </button>
              ))}
            </div>
          )} */}
        </form>
      </div>
    </article>
  );
}
