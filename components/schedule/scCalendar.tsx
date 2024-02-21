import React, { useState } from "react";

import "../../public/style/schedule/schedule.css";

export default function Calendar() {
  const bizData = [
    {
      id: 1,
      year: "2024",
      bizName: "지역중소기업 밸류체인 컨버전스지원",
      bizDivision: "2024년도 지역혁신생태계 구축사업(수도권) 공고",
      startMonth: 1,
      endMonth: 1,
      Tooltip:
        "2024년도 지역혁신생태계 구축사업(수도권) 공고 (과제접수기간) 	2024-01-12 ~ 2024-01-20",
      state: "receptionIng",
    },
    {
      id: 2,
      year: "2024",
      bizName: "(비R&D)지역주력산업육성(세종)",
      bizDivision: "2024년도 지역특화 프로젝트 지원사업(세종) 공고 ",
      startMonth: 1,
      endMonth: 1,
      Tooltip:
        "2024년도 지역특화 프로젝트 지원사업(세종) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-19",
      state: "receptionEnd",
    },
    {
      id: 3,
      year: "2024",
      bizName: "(비R&D)지역주력산업육성(제주)",
      bizDivision: "2024년도 지역특화 프로젝트 지원사업(제주) 공고",
      startMonth: 1,
      endMonth: 1,
      Tooltip:
        "2024년도 지역특화 프로젝트 지원사업(제주) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-19",
      state: "receptionEnd",
    },
    {
      id: 4,
      year: "2024",
      bizName: "(비R&D)지역주력산업육성",
      bizDivision: "2024년도 지역특화 프로젝트 지원사업(지원) 공고",
      startMonth: 1,
      endMonth: 1,
      Tooltip:
        "2024년도 지역특화 프로젝트 지원사업(지원) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-20",
      state: "receptionEnd",
    },
    {
      id: 5,
      year: "2024",
      bizName: "산업기술단지거점기능강화",
      bizDivision: "2024년도 테크노파크 생산장비 고도화 지원사업",
      startMonth: 1,
      endMonth: 2,
      Tooltip:
        "2024년도 테크노파크 생산장비 고도화 지원사업 (과제접수기간) 2024-01-19 ~ 2024-02-02",
      state: "receptionIng",
    },
    {
      id: 6,
      year: "2024",
      bizName: "지역주력산업육성(제주)",
      bizDivision: "(지역혁신 선도기업) 2024년 지역특화산업육성+(R&D)(제주) 지원계획 통합공고",
      startMonth: 2,
      endMonth: 2,
      Tooltip:
        "(지역혁신 선도기업) 2024년 지역특화산업육성+(R&D)(제주) 지원계획 통합공고 (과제접수기간) 2024. 02. 05 ~ 2024. 02. 19",
      state: "receptionPrev",
    },
    {
      id: 7,
      year: "2024",
      bizName: "지역주력산업육성(제주)",
      bizDivision: "(자유공모) 2024년 지역특화산업육성+(R&D)(제주) 지원계획 통합공고",
      startMonth: 2,
      endMonth: 3,
      Tooltip:
        "(자유공모) 2024년 지역특화산업육성+(R&D)(제주) 지원계획 통합공고 (과제접수기간) 2024. 02. 05 ~ 2024. 02. 19	",
      state: "receptionPrev",
    },
  ];

  const reversedData = [...bizData].reverse();

  // startMonth와 endMonth를 받아서 width와 left를 계산하는 함수
  const calculateWidthAndLeft = (startMonth: number, endMonth: number) => {
    const width = (endMonth - startMonth + 1) * 65; // 각 월의 너비는 70px
    const left = (startMonth - 1) * 65; // 시작 월의 왼쪽 위치 계산
    return { width, left };
  };

  // 각 행에 대한 tooltip 상태를 관리하는 배열
  const [tooltips, setTooltips] = useState(Array(bizData.length).fill(false));

  // tooltip 상태를 업데이트하는 함수
  const handleTooltip = (index: any) => {
    const newTooltips = [...tooltips];
    newTooltips[index] = !newTooltips[index];
    setTooltips(newTooltips);
  };

  //접수상태에 따라 다른 배경색 주기
  type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";
  const getProgressBarStyle = (state: string) => {
    switch (state) {
      case "receptionPrev":
        return {
          backgroundColor: "#76c2c5a9",
          position: "relative" as Position,
          top: "0px",
          transform: "translateY(0)",
          marginTop: "10px",
          marginBottom: "10px",
        };
      case "receptionIng":
        return {
          backgroundColor: "#ffd47da9",
          position: "absolute" as Position,
          marginTop: "0px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "receptionEnd":
        return {
          backgroundColor: "#cccccca9",
          position: "absolute" as Position,
          marginTop: "0px",
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return {};
    }
  };

  return (
    <article className="calendar">
      <div className="filterBarSC">
        <div className="year">
          <p>사업연도선택</p>
          <select name="" id="">
            <option value="">2024</option>
            <option value="">2023</option>
            <option value="">2022</option>
            <option value="">2021</option>
            <option value="">2020</option>
            <option value="">2019</option>
            <option value="">2018</option>
            <option value="">2017</option>
            <option value="">2016</option>
            <option value="">2015</option>
            <option value="">2014</option>
            <option value="">2013</option>
            <option value="">2012</option>
            <option value="">2011</option>
            <option value="">2010</option>
            <option value="">2009</option>
            <option value="">2008</option>
            <option value="">2007</option>
            <option value="">2006</option>
            <option value="">2005</option>
            <option value="">2004</option>
            <option value="">2003</option>
            <option value="">2002</option>
            <option value="">2001</option>
            <option value="">2000</option>
            <option value="">1999</option>
            <option value="">1998</option>
            <option value="">1997</option>
          </select>
        </div>
        <div className="year">
          <p>상태</p>
          <select name="" id="">
            <option value="">접수예정</option>
            <option value="">접수진행중</option>
            <option value="">접수마감</option>
          </select>
        </div>
        <input type="search" placeholder="사업명으로 검색해 보세요." />
        <button type="submit">검색</button>
        <button type="button">초기화</button>
      </div>

      <div className="calendar_table_wrap">
        <table>
          <colgroup>
            <col width="215px" />
            <col width="285px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
            <col width="65px" />
          </colgroup>
          <thead>
            <tr className="thead1">
              <th rowSpan={2} colSpan={2} className="title">
                사업명 / 공고명
              </th>
              <th colSpan={12} className="monthly">
                월별계획
              </th>
            </tr>
            <tr className="thead2">
              <th>1월</th>
              <th>2월</th>
              <th>3월</th>
              <th>4월</th>
              <th>5월</th>
              <th>6월</th>
              <th>7월</th>
              <th>8월</th>
              <th>9월</th>
              <th>10월</th>
              <th>11월</th>
              <th>12월</th>
            </tr>
          </thead>
          <tbody>
            {reversedData.map((data, index) => {
              return (
                <>
                  <tr key={data.id} className="tbody1">
                    <td className="bizName">{data.bizName}</td>
                    <td className="bizDivision">
                      <span>{data.bizDivision}</span>
                      <button>관심공고</button>
                    </td>
                    <td colSpan={12} className="progressBar">
                      {data.state === "receptionPrev" && (
                        <div
                          className={`additionalDivForReceptionPrev ${
                            data.startMonth === 1 ? "first" : ""
                          }`}
                          style={{
                            position: "relative",
                            left: `${
                              data.startMonth === 1
                                ? calculateWidthAndLeft(data.startMonth, data.endMonth).left
                                : `calc(${
                                    calculateWidthAndLeft(data.startMonth, data.endMonth).left
                                  }px - 65px)`
                            }`,
                            // startMonth가 1인 경우에는 모두 너비를 60으로 설정
                            width: `${data.startMonth === 1 ? 60 : 110}px`,
                          }}
                        >
                          {data.startMonth !== 1 && <p>사업준비기간</p>}
                          <span></span>
                        </div>
                      )}
                      <div
                        className="progressBarActive"
                        style={{
                          ...calculateWidthAndLeft(data.startMonth, data.endMonth),
                          ...getProgressBarStyle(data.state),
                        }}
                        onMouseEnter={() => handleTooltip(index)}
                        onMouseLeave={() => handleTooltip(index)}
                      >
                        {tooltips[index] && (
                          <span
                            className={`${data.startMonth >= 7 ? "right" : ""}`}
                            style={{ zIndex: "99999999" }}
                          >
                            {data.Tooltip}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
}
