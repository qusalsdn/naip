/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import "../../public/style/projectlist.css";
import Link from "next/link";

import { Xmark, Star, StarSolid, OpenInWindow } from "iconoir-react";
import { useState } from "react";

import axios from "axios";
import useUser from "@/libs/useUser";

import Image from "next/image";
import mlogo from "@/public/img/slogan2.png";
import Type01 from "@/public/img/type01.png";
import Type02 from "@/public/img/type02.png";
import Type04 from "@/public/img/type04.png";
import Type07 from "@/public/img/type07.png";
import useSWR from "swr";

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

interface Data {
  latestData: ResponseDataType[];
  bookMarkData: ResponseDataType[];
}

interface PropsType {
  data: Data;
  isLoading: boolean;
  mutate: any;
}

export default function projectList({ data, isLoading, mutate }: PropsType) {
  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.error(e));

  const { data: userCheck } = useSWR("/api/user", fetcher);

  const toggleStar = (listId: number, bookMarkCheck: boolean) => {
    axios.post("/api/bookMark", { listId, bookMarkCheck }).then((res) => {
      if (res.data.ok) mutate();
      else handleAlertOn();
    });
  };

  //탭메뉴 구현
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: any) => {
    setSelectedTab(index);
  };

  //상세보기 팝업
  const [detailInfo, setDetailInfo] = useState<ResponseDataType>();
  const [detailModal, setDetailModal] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState<ResponseDataType | null>(null);

  const openModal = (projectData: ResponseDataType) => {
    setSelectedProjectData(projectData);
    setDetailModal(true);
    setDetailInfo(projectData);
    // 스크롤바의 너비 계산
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // body에 overflow: hidden 및 padding-right 추가
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const closeModal = () => {
    setSelectedProjectData(null);
    setDetailModal(false);
    setDetailInfo(undefined);
    // body의 overflow 및 padding-right 스타일 초기화
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };

  //상세보기 별 토글
  const scrapToggle = () => {
    if (userCheck.ok) {
      if (detailInfo?.bookMarkCheck) {
        axios
          .post("/api/bookMark", {
            listId: detailInfo.list_id,
            bookMarkCheck: detailInfo.bookMarkCheck,
          })
          .then((res) => {
            if (res.data.ok) {
              setDetailInfo((prevObject: any) => ({
                ...prevObject,
                bookMarkCheck: !prevObject?.bookMarkCheck,
              }));
              mutate();
            } else alert("유저 정보가 존재하지 않습니다.");
          });
      } else {
        axios
          .post("/api/bookMark", {
            listId: detailInfo?.list_id,
            bookMarkCheck: detailInfo?.bookMarkCheck,
          })
          .then((res) => {
            if (res.data.ok) {
              setDetailInfo((prevObject: any) => ({
                ...prevObject,
                bookMarkCheck: !prevObject?.bookMarkCheck,
              }));
              mutate();
            } else alert("유저 정보가 존재하지 않습니다.");
          });
      }
    } else handleAlertOn();
  };

  //상세페이지 이동
  const handleRouterClick = () => {
    // const newTab = window.open(`/announcement/${detailInfo?.list_id}/${detailInfo?.name}`);
    // newTab?.focus(); 새 탭에서 열기
    window.location.href = `/announcement/${detailInfo?.list_id}/${detailInfo?.name}`; // 페이지로 이동하기
    setSelectedProjectData(null);
    setDetailModal(false);
    // body의 overflow 및 padding-right 스타일 초기화
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };

  //내용수정요청 팝업

  const [requestPopup, setRequestPopup] = useState(false);

  const handleRequestPopup = () => {
    setDetailModal(false);
    setRequestPopup(true);
  };
  const handleRequestPopupClose = () => {
    setRequestPopup(false);
    // body의 overflow 및 padding-right 스타일 초기화
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };
  const handleRequestPopupSend = () => {
    alert("정보수정요청이 완료되었습니다.");
    setRequestPopup(false);

    // body의 overflow 및 padding-right 스타일 초기화
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
  };

  //경고창 상태
  const [alertOn, setAlertOn] = useState(false);

  const handleAlertOn = () => {
    setAlertOn(true);
  };

  const handleAlertOff = () => {
    setAlertOn(false);
  };

  return (
    <article className="project_list">
      <div className="inner">
        {userCheck?.ok ? (
          <div className="top">
            <h2 onClick={() => handleTabClick(0)} className={selectedTab === 0 ? "active" : ""}>
              최신 공고
            </h2>
            <h2 onClick={() => handleTabClick(1)} className={selectedTab === 1 ? "active" : ""}>
              나의 관심 공고
            </h2>

            {selectedTab === 0 && <Link href="/searchpage">공고 더 보기 +</Link>}
            {selectedTab === 1 && <Link href="/mypage/scrap">관심 공고 더 보기 + </Link>}

            <Image src={mlogo} alt="minilogo" className="minilogo"></Image>
          </div>
        ) : (
          <div className="top">
            <h2 className="active">최신 공고</h2>
            <Image src={mlogo} alt="minilogo" className="minilogo"></Image>
            <Link href="/searchpage">공고 더 보기 +</Link>
          </div>
        )}

        {/* AI 맞춤 추천 공고 */}
        {selectedTab === 0 && (
          <div>
            {isLoading ? (
              <p className="all_list loading">공고정보를 불러오는 중입니다 ...</p>
            ) : (
              <ul className="all_list">
                {data.latestData.map((item, idx) => (
                  <li key={idx} className="project_box">
                    <button onClick={() => openModal(item)} className="detail_btn">
                      +
                    </button>
                    <button
                      className={item.bookMarkCheck ? "star_on" : "star_off"}
                      onClick={() => toggleStar(item.list_id, item.bookMarkCheck)}
                    >
                      <span className="blind">관심공고</span>
                    </button>
                    <Link href={`/announcement/${item.list_id}/${item.name}`}>
                      <div className="flex_01">
                        <p>
                          <span className="des1">공고기관</span>
                          <em>{item.announcement_agency}</em>
                        </p>
                      </div>
                      <h3>{item.name}</h3>

                      <p className="pj_price">
                        사업금액 <span className="no_str">{item.price}</span>원
                      </p>
                      <div className="flex_02">
                        <p>
                          종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 나의 스크랩 공고 */}
        {selectedTab === 1 && (
          <div className="tab_scrap">
            {isLoading ? (
              <p className="all_list loading">공고정보를 불러오는 중입니다 ...</p>
            ) : data.bookMarkData.length > 0 ? (
              <ul className="all_list">
                {data.bookMarkData.map((item, idx) => (
                  <li key={idx} className="project_box">
                    <button onClick={() => openModal(item)} className="detail_btn">
                      +
                    </button>
                    <button
                      className={item.bookMarkCheck ? "star_on" : "star_off"}
                      onClick={() => toggleStar(item.list_id, item.bookMarkCheck)}
                    >
                      <span className="blind">관심공고</span>
                    </button>
                    <Link href={`/announcement/${item.list_id}/${item.name}`}>
                      <div className="flex_01">
                        <p>
                          <span className="des1">공고기관</span>
                          <em>{item.announcement_agency}</em>
                        </p>
                      </div>
                      <h3>{item.name}</h3>

                      <p className="pj_price">
                        사업금액 <span className="no_str">{item.price}</span>원
                      </p>
                      <div className="flex_02">
                        <p>
                          종료까지 <span className="no_str">{item.terminationDate}</span>일 남음
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-data-message">
                <p>즐겨찾기 하신 공고가 없습니다.</p>
                <p>공고 검색 페이지에서 공고를 확인해 보세요!</p>
                <Link href="/searchpage">공고검색 페이지 바로가기</Link>
              </div>
            )}
          </div>
        )}
        {/* 공고카드 상세보기 */}
        {detailModal && (
          <div className="detail_popup">
            <div className="detail_popup_content">
              <div className="detail_btn_wrap">
                <button onClick={scrapToggle}>
                  {detailInfo?.bookMarkCheck ? (
                    <StarSolid color="rgb(247, 214, 73)" height={25} width={25} />
                  ) : (
                    <Star color="#333" height={25} width={25} />
                  )}
                </button>
                {/* <button onClick={handleRouterClick}>
                  <OpenInWindow color="#333" height={25} width={25} />
                </button> */}
                <button onClick={closeModal}>
                  <Xmark color="#333" height={33} width={33} strokeWidth={1.4} />
                </button>
              </div>

              <h3>
                {detailInfo?.division_type === "일반" && <Image src={Type01} alt="일반"></Image>}
                {detailInfo?.division_type === "긴급" && <Image src={Type02} alt="긴급"></Image>}
                {detailInfo?.division_type === "사전" && <Image src={Type04} alt="사전"></Image>}
                {detailInfo?.division_type === "재공고" && <Image src={Type07} alt="일반"></Image>}
                {detailInfo?.division_type !== "긴급" &&
                  detailInfo?.division_type !== "사전" &&
                  detailInfo?.division_type !== "재공고" && <Image src={Type01} alt="일반"></Image>}

                {selectedProjectData?.name}
              </h3>

              <div className="detail_top_wrap">
                <div
                  className="detail_price"
                  style={{
                    display:
                      selectedProjectData?.price !== undefined &&
                      String(selectedProjectData?.price).trim() !== "" &&
                      selectedProjectData?.price !== "0" &&
                      selectedProjectData?.price !== "-"
                        ? "flex"
                        : "none",
                  }}
                >
                  <p>사업금액</p>
                  <span>
                    <em style={{ color: "#ff8168" }}>{selectedProjectData?.price}</em>원
                  </span>
                </div>
                <div>
                  <p className="deadline">
                    종료까지{" "}
                    <span style={{ color: "#ff8168" }}>{selectedProjectData?.terminationDate}</span>
                    일 남음
                  </p>
                </div>
              </div>

              <div className="detail_top">
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.number ? "flex" : "none" }}
                >
                  <p>공고번호</p>
                  <span>{selectedProjectData?.number}</span>
                </div>
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.division ? "flex" : "none" }}
                >
                  <p>출처기관</p>
                  <span>{selectedProjectData?.division}</span>
                </div>
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.announcement_agency ? "flex" : "none" }}
                >
                  <p>공고기관</p>
                  <span>{selectedProjectData?.announcement_agency}</span>
                </div>
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.demand_agency ? "flex" : "none" }}
                >
                  <p>수요기관</p>
                  <span>{selectedProjectData?.demand_agency}</span>
                </div>
              </div>
              <div className="detail_bottom">
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.input_date ? "flex" : "none" }}
                >
                  <p>게시일시</p>
                  <span>{selectedProjectData?.input_date}</span>
                </div>
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.register_date ? "flex" : "none" }}
                >
                  <p>입찰일시</p>
                  <span>
                    <em style={{ color: "#3585f2" }}>{selectedProjectData?.register_date}</em>
                  </span>
                </div>
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.end_date ? "flex" : "none" }}
                >
                  <p>입찰마감일시</p>
                  <span>{selectedProjectData?.end_date}</span>
                </div>
                <div
                  className="detail_set"
                  style={{ display: selectedProjectData?.qualified_date ? "flex" : "none" }}
                >
                  <p>신청마감일시</p>
                  <span>
                    <em style={{ color: "#ef4444" }}>{selectedProjectData?.qualified_date}</em>
                  </span>
                </div>
              </div>

              <div className="flex_bottom">
                <Link href="#" onClick={handleRouterClick} className="directLink">
                  상세페이지로 이동
                </Link>
                <button onClick={handleRequestPopup}>정보수정요청</button>
              </div>
            </div>
          </div>
        )}

        {requestPopup && (
          <div className="detail_popup">
            <div className="detail_popup_content">
              <h3>정보수정요청</h3>
              <div>
                <p>ID : test1234</p>
                <textarea placeholder="정보수정을 요청할 내용을 입력해 주세요."></textarea>
                <div className="flex_btn_wrap">
                  <button onClick={handleRequestPopupSend}>전송</button>
                  <button onClick={handleRequestPopupClose}>취소</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {alertOn && (
          <div className="alert_scrap">
            <div className="alert_scrap_content">
              <p>관심공고 저장 기능은 로그인 후 이용가능합니다.</p>
              <button onClick={handleAlertOff}>확인</button>
            </div>
          </div>
        )}

        {/* <AD></AD> */}
      </div>
    </article>
  );
}
