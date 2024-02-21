"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faCircleCheck as fasCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as farCircleCheck } from "@fortawesome/free-regular-svg-icons";

import "../../public/style/joinpage/joinpage.css";

export default function Joinpage() {
  //체크박스 커스텀
  const [isChecked1, setisChecked1] = useState(false);
  const [isChecked2, setisChecked2] = useState(false);

  const handleChange1 = () => {
    setisChecked1(!isChecked1);
  };
  const handleChange2 = () => {
    setisChecked2(!isChecked2);
  };

  //필수동의 미체크 모달 & 다음 폼
  const [checkModalOpen, setCheckModalOpen] = useState(false);
  const router = useRouter();
  const handleNextClick = () => {
    if (!isChecked1) {
      setCheckModalOpen(true);
    } else {
      localStorage.setItem("isChecked1", String(isChecked1));
      localStorage.setItem("isChecked2", String(isChecked2));
      router.push("/joinpage/info");
    }
  };

  return (
    <>
      <div className="agree_wrap">
        <div className="agree_content">
          <div className="join_nav">
            <h1 className="font-bold text-[32px] mb-5">회원가입</h1>
            <ul className="agree-top">
              <li className="active">
                <span>1</span>
                약관동의
              </li>
              <span className="active">
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
              <li>
                <span>4</span>
                가입완료
              </li>
            </ul>
          </div>

          <div className="agree_middle">
            <div className="agree_in">
              <b>개인정보 수집ㆍ이용 동의서</b>
              <br />
              <br />
              ㈜디로그는(이하 ‘디로그’)는 사업검색 플랫폼 내일스퀘어의 회원가입과 관련하여 아래와
              같이 개인정보를 수집ㆍ이용 하고자 합니다. 내용을 자세히 읽으신 후 동의 여부를 결정하여
              주시기 바랍니다.
              <br />
              <br />
              1. 개인정보 수집ㆍ이용 목적
              <br />
              키워드 매칭 공고 및 뉴스레터 제공 등 사이트 이용자가 프로젝트 참여를 하기 위한 공고
              정보 및 맟춤 공고 서비스 제공
              <br />
              <br />
              2. 개인정보 수집이용 내역
              <br />
              <span>1) 개인정보 수집이용 내역&nbsp;</span>
              <span className="text-red">(필수)</span>
              <br />
              - 수집항목 : 사용자ID, 비밀번호, 사용자명, 휴대폰번호, 이메일, 주소
              <br />
              2) 개인정보 수집이용 내역 (선택)
              <br />
              - 수집항목 : 소속 기업, 전화번호, 거래담당자 여부
              <br />
              <br />
              3. 개인정보의 이용 및 보유기간
              <br />
              최종 접속일로부터 3년
              <br />
              <br />
              4. 위의 개인정보 수집ㆍ이용에 대한 동의를 거부할 권리가 있습니다. 그러나 동의를 거부할
              경우 서비스 이용에 제한을 받을 수 있습니다.
            </div>
            <div className="agree-bottom">
              <div className="mb-1">
                <input
                  type="checkbox"
                  id="nessCheck"
                  checked={isChecked1}
                  onChange={handleChange1}
                  style={{ display: "none" }}
                />
                <label htmlFor="nessCheck">
                  <FontAwesomeIcon
                    icon={isChecked1 ? fasCircleCheck : farCircleCheck}
                    className={`${isChecked1 ? "text-blue-400" : "text-gray-300"} text-[25px] mr-2`}
                  />
                  <span className="text-red-500">(필수)&nbsp;</span> 개인정보 수집 및 이용 동의
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="unnessCheck"
                  checked={isChecked2}
                  onChange={handleChange2}
                  style={{ display: "none" }}
                />
                <label htmlFor="unnessCheck">
                  <FontAwesomeIcon
                    icon={isChecked2 ? fasCircleCheck : farCircleCheck}
                    className={`${isChecked2 ? "text-blue-400" : "text-gray-300"} text-[25px] mr-2`}
                  />
                  <span>(선택)&nbsp;</span>개인정보 수집 및 이용 동의
                </label>
              </div>
            </div>
          </div>
          <div className="mt-7">
            {/* <Link href='/joinpage'><button className='px-5 py-2 rounded-[50px] bg-gray-300 hover:bg-gray-400 duration-150 text-white mr-2'>이전으로</button></Link>
                {!isChecked1 ? (<button onClick={handleNextClick} className='px-5 py-2 rounded-[50px] bg-blue-500 hover:bg-blue-600 duration-150 text-white'>다음으로</button>) : (<Link href="/joinpage/buyer/info"><button onClick={handleNextClick} className='px-5 py-2 rounded-[50px] bg-blue-500 hover:bg-blue-600 duration-150 text-white'>다음으로</button></Link>)} */}

            <button
              onClick={handleNextClick}
              className="px-5 py-2 rounded-[50px] bg-blue-500 hover:bg-blue-600 duration-150 text-white"
            >
              다음으로
            </button>
          </div>
          {checkModalOpen && (
            <div className="agree-modal">
              {/* 모달 백그라운드 */}
              <div
                style={{
                  position: "fixed",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundColor: "rgba(0,0,0,0.2)",
                  zIndex: "999998",
                }}
                onClick={() => setCheckModalOpen(false)}
              />
              {/* 실제 모달 창 */}
              <div
                className="moadl-content"
                style={{
                  width: "400px",
                  height: "auto",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#ffffff",
                  borderRadius: "5px",
                  zIndex: "999999",
                }}
              >
                <p className="py-[50px] text-[18px]">필수항목에 동의해주세요.</p>
                <hr />
                <div className="py-[20px]">
                  <button
                    onClick={() => setCheckModalOpen(false)}
                    className="text-white bg-blue-400 hover:bg-blue-500 duration-150 rounded-[5px] px-7 py-3"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
