import React, { useRef, useState } from "react";

import useSWR from "swr";
import Link from "next/link";
import axios from "axios";

import "../../../public/style/mypage/scrap.css";

import Image, { StaticImageData } from "next/image";
import Type01 from "@/public/img/type01.png";
import Type02 from "@/public/img/type02.png";
import Type04 from "@/public/img/type04.png";
import Type07 from "@/public/img/type07.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { WarningCircle } from "iconoir-react";

import MyFooter from "@/components/mypage/myFooter";

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
  axios(url).then((res) => {
    if (res.data.ok) return res.data.recentData;
    else alert("유저 정보가 존재하지 않습니다.");
  });

export default function Latest({ isOpen }: any) {
  const [url, setUrl] = useState("/api/mypage/latest?sort=lookDate");
  const { data, mutate } = useSWR<ResponseDataType[]>(url, fetcher);

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
        maxSlide = (data.length - 3) * slideAmount;
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

  const toggleStar = (listId: number, bookMarkCheck: boolean) => {
    axios.post("/api/bookMark", { listId, bookMarkCheck }).then((res) => {
      if (res.data.ok) mutate();
      else alert("유저 정보가 존재하지 않습니다.");
    });
  };

  const onClickAllScrap = () => {
    const noScrapListIdArr: Array<number[]> = [];
    data?.forEach((item) => {
      if (!item.bookMarkCheck) {
        const listIdArr = [item.list_id];
        noScrapListIdArr.push(listIdArr);
      }
    });
    noScrapListIdArr.length > 0
      ? axios.post("/api/mypage/latest/bookMark", noScrapListIdArr).then((res) => {
          if (res.data.ok) {
            alert("즐겨찾기 완료!");
            mutate();
          } else alert("유저 정보를 찾을 수 없습니다.");
        })
      : alert("즐겨찾기가 모두 되어 있거나 즐겨찾기를 할 공고가 존재하지 않습니다.");
  };

  const onClickEmpty = () => {
    const confirm = window.confirm("정말 최근 본 공고를 비우겠습니까?");
    if (confirm) {
      if (data !== undefined) {
        data.length > 0
          ? axios.delete("/api/mypage/latest/empty").then((res) => {
              if (res.data.ok) {
                alert("최근 본 공고를 모두 비웠습니다.");
                mutate();
              } else alert("유저 정보를 찾을 수 없습니다.");
            })
          : alert("비울 공고가 존재하지 않습니다.");
      }
    }
  };

  const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrl(`/api/mypage/latest?sort=${e.target.value}`);
  };

  return (
    <section id="scrap" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <div className="tit_box">
          <div className="tit_flex">
            <h2>최근 본 공고</h2>
          </div>
          <div className="scrap-top">
            <div className="top_box">
              <div className="flex">
                <p className="active">최근 본 공고</p>
                <span>{data?.length === 50 ? "50+" : data?.length}</span>
              </div>
              <p>
                <span className="color">(주)디로그</span>님께서 최근 확인하신 공고입니다.
              </p>
            </div>
          </div>

          <article className="project_list_scrap my_scrap">
            <ul
              className="all_list_scrap"
              ref={containerRef}
              style={{ transform: `translateX(${slidePosition}px)` }}
            >
              {data?.map((item, idx) => (
                <li key={idx} className="project_box_scrap">
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
                      <button className="star_on">
                        <span className="blind">스크랩</span>
                      </button>
                      <p>
                        종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
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

            <div className="top lastst-soating">
              <div className="re_search">
                <button onClick={onClickAllScrap}>최근 본 공고 전체 즐겨찾기</button>
                <button onClick={onClickEmpty}>최근 본 공고 비우기</button>
              </div>
              <div className="soating">
                <select onChange={onChangeSort}>
                  <option value="lookDate">최근 조회 순</option>
                  <option value="qualified_date">마감임박 순</option>
                </select>
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
                {data?.map((item, idx) => {
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
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="info">
                        <div className="flex_2">
                          <Image src={divisionType} alt="타입"></Image>
                          <Link href={`/announcement/${item.list_id}/${item.name}`}>
                            {item.name}
                          </Link>
                        </div>
                        <p>
                          {item.number} | {item.division}
                        </p>
                        <button
                          className={`table_scrap ${item.bookMarkCheck ? "star_on" : "star_off"}`}
                          onClick={() => toggleStar(item.list_id, item.bookMarkCheck)}
                        >
                          <span className="blind">스크랩</span>
                        </button>
                      </td>
                      <td>{item.price}원</td>
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
                  );
                })}
              </tbody>
            </table>
            <div className="tit_flex2">
              <div className="lastst_notice">
                <WarningCircle color="#999" height={20} width={20} strokeWidth={1.4} />

                <h6>
                  최근 본 공고는 최대 <span>50건</span>까지 노출됩니다.
                </h6>
              </div>
            </div>
          </article>
        </div>
      </div>
      <MyFooter></MyFooter>
    </section>
  );
}
