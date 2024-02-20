import React from "react";

import '../../public/style/schedule/schedule.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faAngleRight, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";


export default function ScheduleList (){

  const bizData = [
      { id: 1,
        year: "2024",
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "산업기술단지거점기능강화",
        startMonth: 1,
        endMonth: 2,
        title: "2024년도 테크노파크 생산장비 고도화 지원사업 ",
        accept: "2024-01-19 ~ 2024-02-02",
        Tooltip: "2024년도 테크노파크 생산장비 고도화 지원사업 (과제접수기간) 2024-01-19 ~ 2024-02-02",
        state: "receptionPrev",
      },
      { id: 2,
        year: "2024",  
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "(비R&D)지역주력산업육성",
        startMonth: 5,
        endMonth: 12,
        title: "2024년도 지역특화 프로젝트 지원사업(지원) 공고",
        accept: "2024-01-12 ~ 2024-01-20",
        Tooltip: "2024년도 지역특화 프로젝트 지원사업(지원) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-20",
        state: "receptionIng",
      },
      { id: 3,
        year: "2024",
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "(비R&D)지역주력산업육성(제주)",
        startMonth: 8,
        endMonth: 9,
        title: "2024년도 지역특화 프로젝트 지원사업(제주) 공고",
        accept: "2024-01-12 ~ 2024-01-19",
        Tooltip: "2024년도 지역특화 프로젝트 지원사업(제주) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-19",
        state: "receptionIng",
      },
      { id: 4,
        year: "2024",
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "(비R&D)지역주력산업육성(세종)",
        startMonth: 11,
        endMonth: 12,
        title: "2024년도 지역특화 프로젝트 지원사업(세종) 공고",
        accept: "2024-01-12 ~ 2024-01-19",
        Tooltip: "2024년도 지역특화 프로젝트 지원사업(세종) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-19",
        state: "receptionIng",
      },
      { id: 5,
        year: "2024",
        bizName: "기술혁신기반조성",
        bizDivision: "지역중소기업 밸류체인 컨버전스지원",
        startMonth: 1,
        endMonth: 1,
        title: "2024년도 지역혁신생태계 구축사업(수도권) 공고",
        accept: "2024-01-12 ~ 2024-01-20",
        Tooltip: "2024년도 지역혁신생태계 구축사업(수도권) 공고 (과제접수기간) 	2024-01-12 ~ 2024-01-20",
        state: "receptionEnd",
      },
      { id: 6,
        year: "2024",  
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "(비R&D)지역주력산업육성",
        startMonth: 5,
        endMonth: 12,
        title: "2024년도 지역특화 프로젝트 지원사업(지원) 공고",
        accept: "2024-01-12 ~ 2024-01-20",
        Tooltip: "2024년도 지역특화 프로젝트 지원사업(지원) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-20",
        state: "receptionIng",
      },
      { id: 7,
        year: "2024",
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "(비R&D)지역주력산업육성(제주)",
        startMonth: 8,
        endMonth: 9,
        title: "2024년도 지역특화 프로젝트 지원사업(제주) 공고",
        accept: "2024-01-12 ~ 2024-01-19",
        Tooltip: "2024년도 지역특화 프로젝트 지원사업(제주) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-19",
        state: "receptionIng",
      },
      { id: 8,
        year: "2024",
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "(비R&D)지역주력산업육성(세종)",
        startMonth: 11,
        endMonth: 12,
        title: "2024년도 지역특화 프로젝트 지원사업(세종) 공고",
        accept: "2024-01-12 ~ 2024-01-19",
        Tooltip: "2024년도 지역특화 프로젝트 지원사업(세종) 공고 (과제접수기간) 2024-01-12 ~ 2024-01-19",
        state: "receptionIng",
      },
      { id: 9,
        year: "2024",
        bizName: "기술혁신기반조성",
        bizDivision: "지역중소기업 밸류체인 컨버전스지원",
        startMonth: 1,
        endMonth: 1,
        title: "2024년도 지역혁신생태계 구축사업(수도권) 공고",
        accept: "2024-01-12 ~ 2024-01-20",
        Tooltip: "2024년도 지역혁신생태계 구축사업(수도권) 공고 (과제접수기간) 	2024-01-12 ~ 2024-01-20",
        state: "receptionEnd",
      },
      { id: 10,
        year: "2024",
        bizName: "(비R&D)지역특화산업육성",
        bizDivision: "산업기술단지거점기능강화",
        startMonth: 1,
        endMonth: 2,
        title: "2024년도 테크노파크 생산장비 고도화 지원사업 ",
        accept: "2024-01-19 ~ 2024-02-02",
        Tooltip: "2024년도 테크노파크 생산장비 고도화 지원사업 (과제접수기간) 2024-01-19 ~ 2024-02-02",
        state: "receptionPrev",
      },
      // 추가
    ];

    
  //접수상태에 따라 다른 배경색 주기
  const getProgressBarStyle = (state : string) => {
    switch (state) {
      case "receptionPrev":
        return {
          color: "#16b8bf" 
        };
      case "receptionIng":
        return {
          color: "#f8b500" 
        };
      case "receptionEnd":
        return {
          color: "#888"
        };
      default:
        return {};
    }
  };

  return (
    <article className="schedule_list">
         <div className="filterBarSC_list">
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
            {/* <div className="year">
                <p>기관</p>
                <select name="" id="">
                    <option value="">전체</option>
                    <option value="">중앙부처</option>
                    <option value="">지자체</option>
                </select>
            </div> */}
            <div className="year">
                <p>상태</p>
                <select name="" id="">
                    <option value="">접수예정</option>
                    <option value="">접수진행중</option>
                    <option value="">접수마감</option>
                </select>
            </div>
            <input 
                type="search"
                placeholder="사업명으로 검색해 보세요."
            />
            <button type="submit">검색</button>
            <button type="button">초기화</button>
        </div>

        <div className="list_table_wrap">
            <table>
                <colgroup>
                    <col width="50px"/>
                    <col width="230px"/>
                    <col width="520px"/>
                    <col width="250px"/>
                    <col width="130px"/>
                    <col width="100px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>사업명</th>
                        <th>제목</th>
                        <th>접수기간</th>
                        <th>공고일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                {bizData.map((data, index) => (
                <>
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td className="biz_name">{data.bizDivision}</td>
                    <td className="title">
                        <a href="#">
                        {data.title}
                        </a>
                        <button className="star_on">관심사업등록</button>
                    </td>
                    <td>{data.accept}</td>
                    <td>2024-01-18</td>
                    <td>
                        <span style={{
                            ...getProgressBarStyle(data.state),
                          }}>
                            {data.state === "receptionPrev" && "접수예정"}
                            {data.state === "receptionIng" && "접수진행중"}
                            {data.state === "receptionEnd" && "접수마감"}
                        </span>
                    </td>
                  </tr>
                </>
                ))}
                </tbody>
            </table>
        </div>
        <div className="pager">
            <button className="itemClass2 disabled">
                <em><FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon></em>
            </button>
            <button className="itemClass2 active">
                1
            </button>
            <button className="itemClass2 disabled">
                <em><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></em>
            </button>
         </div>
    </article>
  );
}
