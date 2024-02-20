"use client";

import Link from "next/link";

import MyFooter from "@/components/mypage/myFooter";
import "../../../public/style/projectlist.css";
import "../../../public/style/mypage/recommend.css";

import Image, { StaticImageData } from "next/image";

import Type01 from "@/public/img/type01.png";
import Type02 from "@/public/img/type02.png";
import Type03 from "@/public/img/type03.png";
import Type04 from "@/public/img/type04.png";
import Type05 from "@/public/img/type05.png";
import Type06 from "@/public/img/type06.png";
import Type07 from "@/public/img/type07.png";
import Pagination from "react-js-pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

export default function RecommendComponent({ isOpen }: any) {
  //공고리스트 데이터
  const data = [
    {
      id: 1,
      imageUrl: Type05,
      title: "창원명지여고 환경개선공사 전자입찰 공고",
      number: "20231137891-00",
      agengy: "나라장터",
      price: "479,193,000원",
      announcement_agency: "경상남도 교육청 경상남도창원교육지원청",
      demand_agency: "경상남도 교육청 경상남도창원교육지원청",
      input_date: "2023-11-23 20:48",
      register_date: "2023-12-01 11:00",
      end_date: "2023-11-23 10:00",
      qualified_date: "2023-11-23 10:00 까지",
    },
    {
      id: 2,
      imageUrl: Type01,
      title: "2023학년도 교육수요자 만족도 조사 용역",
      number: "1369165",
      agengy: "나라장터",
      price: "89,914,000원",
      announcement_agency: "울산과학대학산학협력단",
      demand_agency: "울산과학대학산학협력단",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
    {
      id: 3,
      imageUrl: Type02,
      title: "[긴급]서울대방 아파트 건설공사 1공구 토양오염 정화용역",
      number: "1369172",
      agengy: "나라장터",
      price: "122,410,000원",
      announcement_agency: "한국토지주택공사",
      demand_agency: "한국토지주택공사",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
    {
      id: 4,
      imageUrl: Type05,
      title: "창원명지여고 환경개선공사 전자입찰 공고",
      number: "20231137891-00",
      agengy: "나라장터",
      price: "479,193,000원",
      announcement_agency: "경상남도 교육청 경상남도창원교육지원청",
      demand_agency: "경상남도 교육청 경상남도창원교육지원청",
      input_date: "2023-11-23 20:48",
      register_date: "2023-12-01 11:00",
      end_date: "2023-11-23 10:00",
      qualified_date: "2023-11-23 10:00 까지",
    },
    {
      id: 5,
      imageUrl: Type01,
      title: "2023학년도 교육수요자 만족도 조사 용역",
      number: "1369165",
      agengy: "나라장터",
      price: "89,914,000원",
      announcement_agency: "울산과학대학산학협력단",
      demand_agency: "울산과학대학산학협력단",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
    {
      id: 6,
      imageUrl: Type02,
      title: "[긴급]서울대방 아파트 건설공사 1공구 토양오염 정화용역",
      number: "1369172",
      agengy: "나라장터",
      price: "122,410,000원",
      announcement_agency: "한국토지주택공사",
      demand_agency: "한국토지주택공사",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
    {
      id: 7,
      imageUrl: Type05,
      title: "창원명지여고 환경개선공사 전자입찰 공고",
      number: "20231137891-00",
      agengy: "나라장터",
      price: "479,193,000원",
      announcement_agency: "경상남도 교육청 경상남도창원교육지원청",
      demand_agency: "경상남도 교육청 경상남도창원교육지원청",
      input_date: "2023-11-23 20:48",
      register_date: "2023-12-01 11:00",
      end_date: "2023-11-23 10:00",
      qualified_date: "2023-11-23 10:00 까지",
    },
    {
      id: 8,
      imageUrl: Type01,
      title: "2023학년도 교육수요자 만족도 조사 용역",
      number: "1369165",
      agengy: "나라장터",
      price: "89,914,000원",
      announcement_agency: "울산과학대학산학협력단",
      demand_agency: "울산과학대학산학협력단",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
    {
      id: 9,
      imageUrl: Type02,
      title: "[긴급]서울대방 아파트 건설공사 1공구 토양오염 정화용역",
      number: "1369172",
      agengy: "나라장터",
      price: "122,410,000원",
      announcement_agency: "한국토지주택공사",
      demand_agency: "한국토지주택공사",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
    {
      id: 10,
      imageUrl: Type01,
      title: "2023학년도 교육수요자 만족도 조사 용역",
      number: "1369165",
      agengy: "나라장터",
      price: "89,914,000원",
      announcement_agency: "울산과학대학산학협력단",
      demand_agency: "울산과학대학산학협력단",
      input_date: "2023-11-25 23:48",
      register_date: "2023-12-02 11:00",
      end_date: "2023-11-26 10:00",
      qualified_date: "2023-11-26 10:00 까지",
    },
  ];

  return (
    <section id="recommend" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <div className="tit_box">
          <h2>AI 맞춤 추천 공고</h2>
          <div className="recommend-top">
            <div className="top_box">
              <div className="flex">
                <p className="active">AI 맞춤 추천 공고</p>
                <span>10</span>
              </div>
              <p>
                등록하신 MY 키워드를 기반으로 <span className="color"> (주)디로그</span>님께 추천된
                공고입니다!
              </p>
            </div>
          </div>
        </div>

        <article className="project_list my_home">
          <ul className="all_list">
            <li className="project_box">
              <Link
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="flex_01">
                  <p>
                    <span className="des1">공고기관</span>
                    대구광역시
                  </p>
                </div>
                <h3>[대구] 2024년 코리아 나라장터 엑스포 공동관 참가기업 모집 공고</h3>
                <p className="pj_description">{"#키워드1 #키워드2 #키워드3"}</p>
                <p className="pj_price">
                  사업금액 <span className="no_str">23,530,000</span>원
                </p>
                <div className="flex_02">
                  <button className="star_on">
                    <span className="blind">스크랩</span>
                  </button>
                  <p>
                    종료까지 <span className="no_str">{/* {item.terminationDate} */}7</span>일 남음
                  </p>
                </div>
              </Link>
            </li>
            <li className="project_box">
              <Link
                //   href={item.URL}
                href="#"
                onClick={(event) => {
                  event.preventDefault(); // a 태그의 기본 동작인 페이지 이동을 막음
                  // 추가로 처리할 로직 작성
                }}
              >
                <div className="flex_01">
                  {/* <p>
                                <span className="des2">출처</span>
                                {item.demand_agency}
                              </p> */}
                  <p>
                    <span className="des1">공고기관</span>
                    중소벤처기업부
                    {/* {item.announcement_agency} */}
                  </p>
                </div>
                <h3>2024년 중소기업 혁신바우처 사업 1차 지원계획 공고{/* {item.name} */}</h3>
                <p className="pj_description">{"#키워드1 #키워드2 #키워드3"}</p>
                <p className="pj_price">
                  사업금액 <span className="no_str">{/* {item.price} */}23,530,000</span>원
                </p>
                <div className="flex_02">
                  <button className="star_on">
                    <span className="blind">스크랩</span>
                  </button>
                  <p>
                    종료까지 <span className="no_str">{/* {item.terminationDate} */}6</span>일 남음
                  </p>
                </div>
              </Link>
            </li>
            <li className="project_box">
              <Link
                //   href={item.URL}
                href="#"
                onClick={(event) => {
                  event.preventDefault(); // a 태그의 기본 동작인 페이지 이동을 막음
                  // 추가로 처리할 로직 작성
                }}
              >
                <div className="flex_01">
                  {/* <p>
                                <span className="des2">출처</span>
                                {item.demand_agency}
                              </p> */}
                  <p>
                    <span className="des1">공고기관</span>
                    {/* {item.announcement_agency} */}
                    한국연구재단
                  </p>
                </div>
                <h3>{/* {item.name} */}2023년도 우주개발기반조성 및 성과확산 사업 신규과제 공모</h3>
                <p className="pj_description">{"#키워드1 #키워드2 #키워드3"}</p>
                <p className="pj_price">
                  사업금액 <span className="no_str">{/* {item.price} */}99,946,000</span>원
                </p>
                <div className="flex_02">
                  <button className="star_on">
                    <span className="blind">스크랩</span>
                  </button>
                  <p>
                    종료까지 <span className="no_str">{/* {item.terminationDate} */}9</span>일 남음
                  </p>
                </div>
              </Link>
            </li>
          </ul>
          <div className="slide_btn">
            <button>
              <span>
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
            </button>
            <button>
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </button>
          </div>
        </article>
        <article className="recommend_list">
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

            <Link href="#" className="change">
              변경
            </Link>

            <Link href="#" className="beforehand">
              사전
            </Link>

            <Link href="#" className="bid">
              입찰
            </Link>

            <Link href="#" className="announce">
              공지
            </Link>

            <Link href="#" className="re-bid">
              재입찰
            </Link>
          </div>

          <div className="top">
            <div className="soating">
              <label>순서 정렬</label>
              <select>
                <option value="">마감임박 순</option>
                <option value="">금액 높은 순</option>
              </select>
            </div>
            <div className="re_search">
              <input type="text" placeholder="추천 공고 내 검색" />
              <button>검색하기</button>
            </div>
          </div>

          <table>
            <colgroup>
              <col width="60px" />
              <col width="435px" />
              <col width="170px" />
              <col width="275px" />
              <col width="170px" />
              <col width="170px" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">
                  공고명 <br />
                  공고번호 / 출처 / 즐겨찾기
                </th>
                <th scope="col">사업금액</th>
                <th scope="col">
                  공고기관 / <br />
                  수요기관
                </th>
                <th scope="col">
                  게시일시 / <br />
                  입찰일시
                </th>
                <th scope="col">
                  입찰마감일시 / <br />
                  신청마감일시
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td className="info">
                    <div className="flex"></div>
                    <Image src={item.imageUrl} alt="타입"></Image>
                    <Link href="#">{item.title}</Link>
                    <p>
                      {item.number} | {item.agengy}
                    </p>

                    <button className="table_scrap star_on">스크랩</button>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    {item.announcement_agency}
                    <br></br>
                    <br></br>
                    <span className="blue-color">{item.demand_agency}</span>
                  </td>
                  <td>
                    {item.input_date}
                    <br />
                    <br />
                    <span className="blue-color">{item.register_date}</span>
                  </td>
                  <td>
                    {item.end_date}
                    <br />
                    <br />
                    <span className="red-color">{item.qualified_date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pager">
            <span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            <span className="active">1</span>
            <span>
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
        </article>
      </div>
      <MyFooter></MyFooter>
    </section>
  );
}
