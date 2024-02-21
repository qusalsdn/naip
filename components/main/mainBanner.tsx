import React, { useState, useEffect } from "react";
import "../../public/style/mainBanner.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUser from "../../libs/useUser";

export default function MainBanner({ mainMutate, bookMarkCount, recentAnnouncementCount }: any) {
  const { register, handleSubmit, reset } = useForm();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  let bannerInterval: any;

  const banners = [
    { id: 0, content: "" },
    { id: 1, content: "" },
  ];

  useEffect(() => {
    const handleFadeOut = () => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    };

    if (isPlaying) {
      bannerInterval = setInterval(handleFadeOut, 5000);
    }

    return () => clearInterval(bannerInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(bannerInterval);
      const timeout = setTimeout(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        setIsPlaying(true);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [isPlaying]);

  const handlePaginationClick = (id: any) => {
    setIsPlaying(false);
    setCurrentBanner(id);
  };

  const { data, isLoading, mutate } = useUser();

  const [loginFailedModalOpen, setLoginFailedModalOpen] = useState(false);

  const handleModalClose = () => {
    setLoginFailedModalOpen(false);
  };

  const onSubmit = (data: any) => {
    axios.get(`/api/user/signIn?id=${data.id}&pw=${data.pw}`).then((res) => {
      if (res.data.ok) {
        reset();
        mutate();
        mainMutate();
      } else {
        setLoginFailedModalOpen(true);
      }
    });
  };
  const onClickSignOutBtn = () => {
    axios.get("/api/user/signOut").then((res) => {
      if (res.data.ok) {
        mutate();
        mainMutate();
      }
    });
  };

  return (
    <article className="mainBanner">
      <div className="inner">
        <div className="flex">
          <div className="main_banner_box">
            <div className="slide">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`banner ${currentBanner === banner.id ? "fade-in" : ""}`}
                  style={{ zIndex: currentBanner === banner.id ? 1 : 0 }}
                >
                  {banner.content}
                </div>
              ))}
            </div>
            <div className="pagination">
              {banners.map((banner) => (
                <span
                  key={banner.id}
                  className={currentBanner === banner.id ? "active" : ""}
                  onClick={() => handlePaginationClick(banner.id)}
                >
                  {banner.id + 1}
                </span>
              ))}
            </div>
          </div>
          {!isLoading ? (
            <div className="login_frm_box" style={{ position: "relative" }}>
              {data.ok ? (
                <div className="sp_login">
                  <div className="sp_login_top">
                    <p>
                      <span>{data.user.name}</span>
                      님, 반갑습니다
                    </p>
                    <button onClick={onClickSignOutBtn}>로그아웃</button>
                  </div>
                  <div className="sp_login_btn">
                    <Link href="/mypage/scrap" className="my_scrap">
                      <p style={{ marginTop: "10px" }}>나의 관심 공고</p>
                      <span>{bookMarkCount}</span>
                    </Link>
                    <div className="right_btn">
                      <Link href="/mypage/condition" className="my_keyword">
                        검색 조건 관리
                      </Link>
                      <Link href="/mypage/userinfo" className="my_recommend">
                        회원 정보 수정
                      </Link>
                    </div>
                  </div>
                  <div className="sp_login_bottom">
                    <Link href="/mypage/latest">
                      최근 본 공고
                      <span>{recentAnnouncementCount}</span>
                    </Link>
                    {/* <Link href="#">
                      키워드 알림
                      <span>13</span>
                    </Link> */}
                    <Link href="/mypage">마이페이지</Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="login_msg">로그인 후 이용하세요.</p>

                  <div className="flex">
                    <div className="login_input">
                      <input
                        type="text"
                        {...register("id", { required: true })}
                        placeholder="아이디를 입력하세요."
                      />
                      <input
                        type="password"
                        {...register("pw", { required: true })}
                        placeholder="비밀번호를 입력하세요."
                      />
                    </div>
                    <div className="login_btn">
                      <span className="login_btn_icon">
                        <FontAwesomeIcon icon={faPowerOff} />
                      </span>
                      <input type="submit" value="로그인" />
                    </div>
                  </div>
                  <label>
                    <input type="checkbox" />
                    <span>아이디 저장</span>
                  </label>

                  <div className="user_btn">
                    <Link href="#">아이디 찾기</Link>
                    <Link href="#">비밀번호 찾기</Link>
                    <Link href="/joinpage">회원가입</Link>
                  </div>
                </form>
              )}
            </div>
          ) : (
            // 로딩중 화면
            <div className="login_frm_box">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="login_msg">로그인 후 이용하세요.</p>

                <div className="flex">
                  <div className="login_input">
                    <input
                      type="text"
                      {...register("id", { required: true })}
                      placeholder="아이디를 입력하세요."
                    />
                    <input
                      type="password"
                      {...register("pw", { required: true })}
                      placeholder="비밀번호를 입력하세요."
                    />
                  </div>
                  <div className="login_btn">
                    <span className="login_btn_icon">
                      <FontAwesomeIcon icon={faPowerOff} />
                    </span>
                    <input type="submit" value="로그인" />
                  </div>
                </div>
                <label>
                  <input type="checkbox" />
                  <span>아이디 저장</span>
                </label>

                <div className="user_btn">
                  <Link href="#">아이디 찾기</Link>
                  <Link href="#">비밀번호 찾기</Link>
                  <Link href="/joinpage">회원가입</Link>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {loginFailedModalOpen && (
        <div className="alert_modal" onClick={handleModalClose}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <p>아이디 혹은 비밀번호가 일치하지 않습니다.</p>
            <button onClick={handleModalClose}>확인</button>
          </div>
        </div>
      )}
    </article>
  );
}
