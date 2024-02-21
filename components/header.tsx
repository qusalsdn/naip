"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import "../public/style/header.css";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/main_logo5.png";
import useUser from "@/libs/useUser";
import axios from "axios";
import useSWR from "swr";

export default function Header() {
  const pathname = usePathname();
  const isMyPage = pathname.includes("mypage");
  const isMainPage = pathname === "/";

  /* 메뉴버튼 클릭 시 함수 */
  // const [menuBtnClick, setMenuBtnClick] = useState(false);

  // const handleMenuBtnClick = () => {
  //   setMenuBtnClick(!menuBtnClick);
  // };

  // 서브메뉴
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuEnter = () => {
    setIsSubMenuOpen(true);
  };
  const handleSubMenuLeave = () => {
    setIsSubMenuOpen(false);
  };

  const fetcher = (url: string) =>
    axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.error(e));

  const { data, isLoading, mutate } = useSWR("/api/user", fetcher);
  const router = useRouter();
  const onClickSignOutBtn = () => {
    axios.get("/api/user/signOut").then((res) => {
      if (res.data.ok) {
        mutate();
        router.replace("/loginpage");
      }
    });
  };

  return (
    <>
      {!isMyPage && (
        <header>
          <div className="header_top">
            <div className="inner top_inner">
              <Link href="/">
                <Image src={logo} alt="" />
              </Link>
              {/* <form className="main_search">
                <input type="search" placeholder="통합검색 = 공고명 or 공고번호 or 출처기관명" />
                <input type="submit" value="" />
              </form> */}
              {!isLoading ? (
                data.ok ? (
                  <div className={`header_login active ${isMainPage ? "mainpageMenu" : ""}`}>
                    <p>
                      <span>{data.user.name}</span>님 환영합니다.
                    </p>
                    {!isMainPage && (
                      <>
                        <button onClick={onClickSignOutBtn}>로그아웃</button>
                        <Link href="/mypage">마이페이지</Link>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="header_login">
                    <Link href="/loginpage">로그인</Link>
                    <Link href="#">ID/PW 찾기</Link>
                    <Link href="/joinpage">회원가입</Link>
                  </div>
                )
              ) : (
                // 로딩중일 때 화면
                <div className="header_login">
                  <Link href="/loginpage">로그인</Link>
                  <Link href="#">ID/PW 찾기</Link>
                  <Link href="/joinpage">회원가입</Link>
                </div>
              )}
            </div>
          </div>
          <div className="header_bottom">
            <div className="inner">
              {/* <div className={`menu_btn ${menuBtnClick ? "on" : ""}`} onClick={handleMenuBtnClick}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              {menuBtnClick && (
                <div className="site-map">
                    서브메뉴
                </div>
              )} */}
              <ul className="gnb">
                <li>
                  <Link href="/searchpage">공고검색</Link>
                </li>
                <li>
                  <Link href="/schedule">사업일정</Link>
                </li>
                <li onMouseEnter={handleSubMenuEnter} onMouseLeave={handleSubMenuLeave}>
                  <Link href="/community/notice">고객센터</Link>
                  <ul className={`sub_menu ${isSubMenuOpen ? "active" : ""}`}>
                    <li>
                      <Link href="/community/notice">공지사항</Link>
                    </li>
                    <li>
                      <Link href="/community/faq">FAQ</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
