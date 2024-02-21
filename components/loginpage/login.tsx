"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/img/main_logo4.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginComponent() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [isIdSaveChecked, setIsIdSaveChecked] = useState(false);
  const [isKeepLoginChecked, setIsKeepLoginChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsIdSaveChecked(!isIdSaveChecked);
  };

  const handleCheckboxChange2 = () => {
    setIsKeepLoginChecked(!isKeepLoginChecked);
  };

  const [loginFailedModalOpen, setLoginFailedModalOpen] = useState(false);

  const handleModalClose = () => {
    setLoginFailedModalOpen(false);
  };

  const onSubmit = (data: any) => {
    axios.get(`/api/user/signIn?id=${data.id}&pw=${data.pw}`).then((res) => {
      if (res.data.ok) {
        router.replace("/");
      } else {
        setLoginFailedModalOpen(true);
      }
    });
  };

  return (
    <>
      <div className="inner">
        <div className="login_box">
          <h2>
            <Link href="/">
              <Image src={logo} alt="로고"></Image>
            </Link>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="input_box">
            <div className="option">
              <div className="cntr">
                <input
                  className="hidden-xs-up"
                  id="cbx"
                  type="checkbox"
                  checked={isIdSaveChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="cbx" className={`cbx ${isIdSaveChecked ? "checked" : ""}`}></label>
              </div>
              <p onClick={handleCheckboxChange}>아이디 저장</p>
              <div className="cntr2">
                <input
                  className="hidden-xs-up2"
                  id="cbx2"
                  type="checkbox"
                  checked={isKeepLoginChecked}
                  onChange={handleCheckboxChange2}
                />
                <label
                  htmlFor="cbx2"
                  className={`cbx2 ${isKeepLoginChecked ? "checked2" : ""}`}
                ></label>
              </div>
              <p onClick={handleCheckboxChange2}>로그인 유지</p>
            </div>
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
            <div className="login_btn">
              <button type="submit" className="submit">
                <span className="sign-text">로그인</span>
              </button>
              <div className="flex">
                <Link href="/joinpage">회원가입</Link>
                <p>아이디 찾기</p>
                <p>비밀번호 찾기</p>
              </div>
            </div>

            <div className="social_box">
              <p>소셜 계정으로 간편 로그인</p>

              <button className="naver">네이버로 로그인</button>
              <button className="kakao">카카오톡으로 로그인</button>
            </div>
          </form>
          {loginFailedModalOpen && (
            <div className="alert_modal" onClick={handleModalClose}>
              <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <p>아이디 혹은 비밀번호가 일치하지 않습니다.</p>
                <button onClick={handleModalClose}>확인</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
