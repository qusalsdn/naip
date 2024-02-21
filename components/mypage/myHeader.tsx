"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/main_logo4.png";
import logoFold from "@/public/img/logo_fold2.png";
import MyMenuArrow from "@/public/img/myMenuArrow.png";
import Myhome from "@/public/img/my_icon_01.png";
import Scrap from "@/public/img/my_icon_02.png";
import Condition from "@/public/img/my_icon_04.png";
import UserInfo from "@/public/img/my_icon_06.png";
import Latest from "@/public/img/my_icon_07.png";
import Keyword from "@/public/img/my_icon_08.png";
import Matching from "@/public/img/my_icon_09.png";

import MyhomeOn from "@/public/img/myhome_on.png";
import ScrapOn from "@/public/img/my_icon_02_on.png";
import ConditionOn from "@/public/img/my_icon_04_on.png";
import UserInfoOn from "@/public/img/my_icon_06_on.png";
import LatestOn from "@/public/img/my_icon_07_on.png";
import KeywordOn from "@/public/img/my_icon_08_on.png";
import MatchingOn from "@/public/img/my_icon_09_on.png";

export default function Myheader({ isOpen, handleMenuClick }: any) {
  const pathname = usePathname();

  // 함수를 이용해 현재 경로와 Link의 href를 비교하여 클래스를 동적으로 설정
  const isActive = (path: string) => {
    return pathname === path ? "active" : "";
  };

  return (
    <header className={`${isOpen ? "fold" : ""} header`}>
      <div className="flex">
        <h1>
          <Link href="/" className="logo">
            {isOpen ? (
              <Image src={logoFold} alt="로고"></Image>
            ) : (
              <Image src={logo} alt="로고" style={{ position: "relative", left: "10px" }}></Image>
            )}
          </Link>
        </h1>
        <div className={`${isOpen ? "fold" : ""} menubtn`} onClick={handleMenuClick}>
          <Image src={MyMenuArrow} alt="메뉴접기"></Image>
        </div>
      </div>
      <ul className="main_menu">
        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage" className={isActive("/mypage")}>
            {isActive("/mypage") ? (
              <Image src={MyhomeOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={Myhome} alt="키워드 알림 공고"></Image>
            )}
            <p>마이 홈</p>
          </Link>
        </li>

        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/scrap" className={isActive("/mypage/scrap")}>
            {isActive("/mypage/scrap") ? (
              <Image src={ScrapOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={Scrap} alt="키워드 알림 공고"></Image>
            )}
            <p>나의 관심 공고</p>
          </Link>
        </li>
        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/latest" className={isActive("/mypage/latest")}>
            {isActive("/mypage/latest") ? (
              <Image src={LatestOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={Latest} alt="키워드 알림 공고"></Image>
            )}
            <p>최근 본 공고</p>
          </Link>
        </li>
        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/notify" className={isActive("/mypage/notify")}>
            {isActive("/mypage/notify") ? (
              <Image src={MatchingOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={Matching} alt="키워드 알림 공고"></Image>
            )}
            <p>키워드 매칭 공고</p>
          </Link>
        </li>
        {/* <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/recommend" className={isActive("/mypage/recommend")}>
            <Image src={Recommend} alt="맞춤공고"></Image>
            <p>AI 맞춤 추천 공고</p>
          </Link>
        </li> */}
        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/keyword" className={isActive("/mypage/keyword")}>
            {isActive("/mypage/keyword") ? (
              <Image src={KeywordOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={Keyword} alt="키워드 알림 공고"></Image>
            )}
            <p>등록 키워드 관리</p>
          </Link>
        </li>
        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/condition" className={isActive("/mypage/condition")}>
            {isActive("/mypage/condition") ? (
              <Image src={ConditionOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={Condition} alt="키워드 알림 공고"></Image>
            )}
            <p>검색 조건 관리</p>
          </Link>
        </li>
        <li className={`${isOpen ? "fold" : ""}`}>
          <Link href="/mypage/userinfo" className={isActive("/mypage/userinfo")}>
            {isActive("/mypage/userinfo") ? (
              <Image src={UserInfoOn} alt="키워드 알림 공고"></Image>
            ) : (
              <Image src={UserInfo} alt="키워드 알림 공고"></Image>
            )}
            <p>회원정보</p>
          </Link>
        </li>
      </ul>
    </header>
  );
}
