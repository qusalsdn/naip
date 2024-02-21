"use client";
import Link from "next/link";

import "../../../public/style/joinpage/joinpage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) =>
  axios.get(url).then((res) => {
    if (res.data.ok) return res.data.name;
  });

export default function JoinSuccess() {
  const { data: userName, isLoading } = useSWR("/api/user/signUp/success", fetcher);

  return (
    <>
      <div className="agree_content">
        <div className="join_nav info">
          <h1 className="font-bold text-[32px] mb-5">회원가입</h1>
          <ul className="agree-top">
            <li className="">
              <span>1</span>
              약관동의
            </li>
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
            <li>
              <span>2</span>
              정보입력
            </li>
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
            <li>
              <span>3</span>
              추가정보입력
            </li>
            <span>
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
            <li className="active">
              <span>4</span>
              가입완료
            </li>
          </ul>
        </div>

        <div className="join_success">
          <div className="success_wrap">
            <div className="success-checkmark pt-3">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className="success_txt">
              <h2>
                <span>{userName}</span>님, 환영합니다!
              </h2>
              <p>
                비즈마이닝 회원가입이 완료되었습니다.
                <br />
                로그인 후 안전하게 서비스를 이용하실 수 있습니다.
              </p>
            </div>
            <div className="succes_btn absolute -bottom-[170px] left-1/2 transform -translate-x-1/2">
              <Link href="/" className="block w-[400px]">
                <button className="block w-full text-[18px] ring-1 ring-blue-500 ring-inset text-blue-500 py-2.5 rounded-[50px]">
                  메인으로
                </button>
              </Link>
              <Link href="/loginpage" className="block w-[400px]">
                <button className="block w-full mt-2 text-[18px] bg-blue-500 hover:bg-blue-600 duration-150 text-white py-2.5 rounded-[50px]">
                  로그인
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
