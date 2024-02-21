"use client";
import { useState, useRef, useEffect } from "react";

import useSWR from "swr";

import MyFooter from "@/components/mypage/myFooter";

import "../../../public/style/mypage/scrap.css";

import Image, { StaticImageData } from "next/image";
import Type01 from "@/public/img/type01.png";
import Type02 from "@/public/img/type02.png";
import Type03 from "@/public/img/type03.png";
import Type04 from "@/public/img/type04.png";
import Type05 from "@/public/img/type05.png";
import Type06 from "@/public/img/type06.png";
import Type07 from "@/public/img/type07.png";

import Link from "next/link";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
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
}

interface FormType {
  sort: string;
  postName: string;
}

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    if (res.data.ok) return res.data.data;
    else alert("유저 정보가 존재하지 않습니다.");
  });

export default function Scrap({ isOpen }: any) {
  //즐겨찾기 데이터
  const { register, handleSubmit, getValues } = useForm<FormType>();
  const [url, setUrl] = useState("/api/mypage/scrap?sort=createDT&postName=");
  const { data, isLoading, mutate } = useSWR<ResponseDataType[]>(url, fetcher);
  const [cardData, setCardData] = useState<ResponseDataType[]>([]);

  useEffect(() => {
    axios.get("/api/mypage/scrap?sort=createDT&postName=").then((res) => {
      res.data.ok ? setCardData(res.data.data) : alert("유저 정보가 존재하지 않습니다.");
    });
  }, [data]);

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

  const toggleStar = (listId: number) => {
    axios.post("/api/mypage/scrap/delete", { listId }).then((res) => {
      if (res.data.ok) {
        setCardData(res.data.data);
        mutate();
      } else alert("유저 정보가 존재하지 않습니다.");
    });
  };

  const onSubmit = (formData: FormType) => {
    setUrl(`/api/mypage/scrap?sort=${formData.sort}&postName=${formData.postName}`);
  };

  const onChangeSort = () => {
    setUrl(`/api/mypage/scrap?sort=${getValues("sort")}&postName=${getValues("postName")}`);
  };

  return (
    <section id="scrap" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <div className="tit_box">
          <h2>나의 관심 공고</h2>
          <div className="scrap-top">
            <div className="top_box">
              <div className="flex">
                <p className="active">나의 관심 공고</p>
                <span>{data ? data.length : 0}</span>
              </div>
              <p>
                <span className="color">(주)디로그</span>님께서 즐겨찾기에 저장하신 공고입니다.
                {/* 회원님께서 즐겨찾기에 저장하신 공고입니다. */}
              </p>
            </div>
          </div>
        </div>
        <article className="project_list_scrap my_scrap">
          <ul
            className="all_list_scrap"
            ref={containerRef}
            style={{ transform: `translateX(${slidePosition}px)` }}
          >
            {!isLoading &&
              cardData?.map((item, idx) => {
                return (
                  <li key={idx} className="project_box_scrap">
                    <Link
                      href={item.URL}
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
                          {item.announcement_agency}
                        </p>
                      </div>
                      <h3>{item.name}</h3>

                      <p className="pj_price">
                        사업금액 <span className="no_str">{item.price}</span>원
                      </p>
                      <div className="flex_02">
                        <button className="star_on" onClick={() => toggleStar(item.list_id)}>
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

          <form className="top" onSubmit={handleSubmit(onSubmit)}>
            <div className="soating">
              <label>순서 정렬</label>
              <select {...register("sort", { onChange: onChangeSort })}>
                <option value="createDT">저장한 순</option>
                <option value="qualified_date">마감임박 순</option>
              </select>
            </div>
            <div className="re_search">
              <input type="text" placeholder="나의 관심 공고 내 검색" {...register("postName")} />
              <button type="submit">검색하기</button>
            </div>
          </form>

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
              {!isLoading &&
                data?.map((item, idx) => {
                  let divisionType;
                  switch (item.division_type) {
                    case "일반":
                      divisionType = Type01;
                      break;
                    case "긴급":
                      divisionType = Type02;
                      break;
                    case "변경":
                      divisionType = Type03;
                      break;
                    case "사전":
                      divisionType = Type04;
                      break;
                    case "입찰":
                      divisionType = Type05;
                      break;
                    case "공지":
                      divisionType = Type06;
                      break;
                    case "재입찰":
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
                          <a href={item.URL} target="_blank">
                            <span>{item.name}</span>
                          </a>
                        </div>
                        <p>
                          {item.number} | {item.division}
                        </p>

                        <button
                          className="table_scrap star_on"
                          onClick={() => toggleStar(item.list_id)}
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
