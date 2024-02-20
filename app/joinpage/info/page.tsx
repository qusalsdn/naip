"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "../../../public/style/joinpage/joinpage.css";
import PostcodeModal from "@/components/joinpage/postcodeMoadl";
import ModalDefalt from "@/components/joinpage/ModalDefault"; //폼 버튼 모달 레이아웃

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function JoinInfo() {
  const router = useRouter();

  //폼 button modal open (아이디중복확인, 기업인증, 인증번호받기, 인증번호 확인)
  const [idModalOpen, setIdModalOpen] = useState(false);
  const [idModalMessage, setIdModalMessage] = useState("");
  const [emailSentModalOpen, setEmailSentModalOpen] = useState(false);
  const [emailConfirmModalOpen, setEmailConfirmModalOpen] = useState(false);

  //엔터 키 이벤트 막기
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  //아이디
  const [idMessage, setIdMessage] = useState("");
  const [idInput, setIdInput] = useState("");

  /* 주소postcode */
  const [addrModalOpen, setAddrModalOpen] = useState(false);
  const [addrMessage, setAddrMessage] = useState("");
  const [addr1Input, setAddr1Input] = useState("");
  const [addr2Input, setAddr2Input] = useState("");

  const handleAddrTest = (e: any) => {
    setAddr1Input(e.target.value);
    validateAddress(e.target.value);
  };

  const handleAddr2Change = (e: any) => {
    setAddr2Input(e.target.value);
  };

  const handleAddrClose = () => {
    setAddrModalOpen(false);
  };

  //정규표현식
  const idRegex = useCallback(() => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/, []); //아이디
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/; //비밀번호
  const phoneRegex = useCallback(() => /^01([016789]{1})[0-9]{3,4}[0-9]{4}$/, []); //핸드폰번호
  const emailRegex = useCallback(() => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,3}$/i, []); //이메일

  const validateAddress = (value: any) => {
    //주소
    if (value === "") {
      setAddrMessage("주소를 선택하세요");
      return false;
    }
    setAddrMessage("");
    return true;
  };

  //아이디
  const [idValid, setIdValid] = useState(false);

  useEffect(() => {
    if (idRegex().test(idInput)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  }, [idRegex, idInput]);

  const validateId = (value: any) => {
    if (value === "") {
      setIdMessage("아이디 입력은 필수항목입니다.");
      return false;
    } else if (!idRegex().test(value)) {
      setIdMessage("8~16자 이내의 영문(대, 소문자), 숫자 조합");
      return false;
    }
    setIdMessage("");
    return true;
  };

  const handleIdTest = (e: any) => {
    setIdInput(e.target.value);
    validateId(e.target.value);
  };

  const [idCheck, setIdCheck] = useState(false);
  const [idCheckModalOpen, setIdCheckModalOpen] = useState(false);
  const onClickCheckDuplicationBtn = () => {
    axios.get(`/api/user/signUp/idCheck?id=${idInput}`).then((res) => {
      if (res.data.idCheck) {
        setIdCheck(true);
        setIdModalMessage("사용 가능한 아이디입니다.");
        setIdModalOpen(true);
      } else {
        setIdCheck(false);
        setIdModalMessage("이미 사용중인 아이디입니다.");
        setIdModalOpen(true);
      }
    });
  };

  //비밀번호
  const [pw1Message, setPw1Message] = useState("");
  const [pw1Input, setPw1Input] = useState("");

  const validatePw1 = (value: any) => {
    if (value === "") {
      setPw1Message("비밀번호 입력은 필수항목입니다.");
      return false;
    } else if (!pwRegex.test(value)) {
      setPw1Message("8~16자 이내의 영문(대, 소문자), 숫자, 특수문자(@, $, !, %, *, #, ?, &) 조합");
      return false;
    }
    setPw1Message("");
    return true;
  };
  const handlePw1Test = (e: any) => {
    setPw1Input(e.target.value);
    validatePw1(e.target.value);
  };

  //비밀번호 확인
  const [pw2Message, setPw2Message] = useState("");
  const [pw2Input, setPw2Input] = useState("");

  const validatePw2 = (value: any) => {
    if (value !== pw1Input) {
      setPw2Message("동일한 비밀번호를 입력하세요");
      return false;
    }
    setPw2Message("");
    return true;
  };

  const handlePw2Test = (e: any) => {
    setPw2Input(e.target.value);
    validatePw2(e.target.value);
  };

  //이름
  const [userNameMessage, setUserNameMessage] = useState("");
  const [userNameInput, setUserNameInput] = useState("");

  const validateUserName = (value: any) => {
    if (value === "") {
      setUserNameMessage("이름 입력은 필수항목입니다.");
      return false;
    }
    setUserNameMessage("");
    return true;
  };

  const handleUserNameTest = (e: any) => {
    setUserNameInput(e.target.value);
    validateUserName(e.target.value);
  };

  //핸드폰번호
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const validatePhone = (value: any) => {
    if (value === "") {
      setPhoneMessage("휴대폰 번호입력은 필수항목입니다.");
      return false;
    } else if (!phoneRegex().test(value)) {
      setPhoneMessage("올바른 형식의 휴대폰 번호를 입력하세요");
      return false;
    }
    setPhoneMessage("");
    return true;
  };

  const handlePhoneTest = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, ""); //숫자만 입력
    setPhoneInput(onlyNums);
    validatePhone(onlyNums);
  };

  //인증번호 타이머
  const [isVertifyCodeSent, setIsVertifyCodeSent] = useState(false); //인증번호 전송 여부
  const [timerCountDown, setTimerCountDown] = useState(300); //3분 (확인 위해 임시로 10초 처리)
  const [isTimerExpired, setIsTimerExpired] = useState(false); // 타이머 만료 여부
  const [timerExpiredOpen, setTimerExpiredOpen] = useState(false); // 타이머 만료 모달

  // 인증번호
  const [isVerified, setIsVerified] = useState(false); //인증 완료 여부
  const [userVerifyCode, setUserVerifyCode] = useState("");
  const [authNumber, setAuthNumber] = useState("");

  useEffect(() => {
    let interval: any;

    if (timerCountDown > 0 && isVertifyCodeSent) {
      interval = setInterval(() => {
        setTimerCountDown((prevTime) => prevTime - 1); //이전 시간으로부터 1씩 감소
      }, 1000);
    } else if (timerCountDown === 0 || !isVertifyCodeSent) {
      clearInterval(interval);
      if (!isVerified && timerCountDown === 0) {
        //타이머 만료 시 모달창 팝업
        setIsTimerExpired(true);
        setTimerExpiredOpen(true);
      }
    }

    return () => clearInterval(interval); //타이머 리셋
  }, [isVerified, timerCountDown, isVertifyCodeSent]);

  //유효시간 모달 close
  const handleTimerExpiredClose = () => {
    setIsVertifyCodeSent(false);
    setTimerCountDown(10);
    setIsTimerExpired(false);
    setTimerExpiredOpen(false);
  };

  //인증번호받기 클릭
  const handleEmailSentClick = () => {
    if (emailValid && !isVerified) {
      axios.get(`/api/user/signUp/emailAuthentication?email=${emailInput}`).then((res) => {
        if (res.data.ok) {
          setEmailSentModalOpen(true);
          setIsVertifyCodeSent(true);
          setAuthNumber(res.data.authNumber);
        }
      });
    } else {
      setEmailSentModalOpen(false);
    }
  };

  //인증번호입력필드
  const handleVerifyCodeChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, ""); //숫자만 입력
    setUserVerifyCode(onlyNums);
  };

  //인증번호확인 클릭
  const handleVerifyCodeClick = () => {
    if (userVerifyCode === authNumber) {
      setIsVerified(true);
      setEmailConfirmModalOpen(true);
      setTimerCountDown(0);
      setUserVerifyCode("");
    } else {
      setIsVerified(false);
      setEmailConfirmModalOpen(true);
    }
  };

  //인증완료 모달 확인
  const handlePhoneConfirmClose = () => {
    setEmailConfirmModalOpen(false);
  };

  //이메일
  const [emailMessage, setEmailMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailCheckModalOpen, setEmailCheckModalOpen] = useState(false);

  //인증번호받기 활성화
  const [emailValid, setEmailValid] = useState(false);
  useEffect(() => {
    if (emailRegex().test(emailInput)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  }, [emailRegex, emailInput]);

  const validateEmail = (value: any) => {
    if (value === "") {
      setEmailMessage("이메일 주소를 입력하세요");
      return false;
    } else if (!emailRegex().test(value)) {
      setEmailMessage("올바른 형식의 이메일 주소를 입력하세요");
      return false;
    }
    setEmailMessage("");
    return true;
  };

  const handleEmailTest = (e: any) => {
    setEmailInput(e.target.value);
    validateEmail(e.target.value);
  };

  const validateForm = () => {
    if (!validateId(idInput)) {
      return false;
    }
    if (!validatePw1(pw1Input)) {
      return false;
    }
    if (!validatePw2(pw2Input)) {
      return false;
    }
    if (!validateUserName(userNameInput)) {
      return false;
    }
    if (!validatePhone(phoneInput)) {
      return false;
    }
    if (!validateEmail(emailInput)) {
      return false;
    }
    if (!validateAddress(addr1Input)) {
      return false;
    }
    return true;
  };

  //가입 완료 클릭
  const handleSubmitClick = () => {
    if (!idCheck) return setIdCheckModalOpen(true);
    if (!isVerified) return setEmailCheckModalOpen(true);
    if (!validateForm()) {
      console.log("실패");
    } else {
      axios
        .post("/api/user/signUp", {
          id: idInput,
          pw: pw1Input,
          name: userNameInput,
          phoneNumber: phoneInput,
          email: emailInput,
          address1: addr1Input,
          address2: addr2Input,
        })
        .then((res) => {
          if (res.data.ok) router.push("/joinpage/moreinfo");
        });
    }
  };

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
            <li className="active">
              <span>2</span>
              정보입력
            </li>
            <span className="active">
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

        <form>
          <div className="infoFrm">
            <div className="join_info">
              <label htmlFor="userid" className="info_label">
                아이디 <span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={idInput}
                  onChange={handleIdTest}
                  onFocus={() => {
                    handleIdTest;
                  }}
                  onBlur={handleIdTest}
                  type="text"
                  id="userid"
                  placeholder="아이디를 입력하세요"
                  maxLength={16}
                  onKeyDown={handleKeyDown}
                />
                <button disabled={!idValid} type="button" className={`${idValid ? "active" : ""}`} onClick={onClickCheckDuplicationBtn}>
                  중복확인
                </button>
              </div>
              <p className="ml-[151px] pt-1 text-xs text-red-500">{idMessage}</p>
            </div>

            <div className="join_info">
              <label htmlFor="userPw" className="info_label">
                비밀번호 <span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={pw1Input}
                  onChange={handlePw1Test}
                  onFocus={() => {
                    handlePw1Test;
                  }}
                  onBlur={handlePw1Test}
                  type="password"
                  id="userPw"
                  placeholder="비밀번호를 입력하세요"
                  maxLength={16}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <p className="ml-[151px] pt-1 text-xs text-red-500">{pw1Message}</p>
            </div>
            <div className="join_info">
              <label htmlFor="userPw" className="info_label">
                비밀번호 확인<span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={pw2Input}
                  onChange={handlePw2Test}
                  onFocus={() => {
                    handlePw2Test;
                  }}
                  onBlur={handlePw2Test}
                  type="password"
                  id="userPw"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  maxLength={16}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <p className="ml-[151px] pt-1 text-xs text-red-500">{pw2Message}</p>
            </div>

            <div className="join_info">
              <label htmlFor="userName" className="info_label">
                이름 <span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={userNameInput}
                  onChange={handleUserNameTest}
                  onBlur={handleUserNameTest}
                  onFocus={() => {
                    handleUserNameTest;
                  }}
                  type="text"
                  id="userName"
                  placeholder="사용자 이름을 입력하세요"
                  maxLength={16}
                  onKeyDown={handleKeyDown}
                />
                <p className="ml-[151px] pt-1 text-xs text-red-500">{userNameMessage}</p>
              </div>
            </div>

            <div className="join_info">
              <label htmlFor="userPhone" className="info_label">
                휴대폰 <span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={phoneInput}
                  onChange={handlePhoneTest}
                  onFocus={() => {
                    handlePhoneTest;
                  }}
                  onBlur={handlePhoneTest}
                  type="text"
                  id="userPhone"
                  placeholder="'-' 빼고 숫자만 입력"
                  maxLength={11}
                  onKeyDown={handleKeyDown}
                />
                <p className="ml-[151px] pt-1 text-xs text-red-500">{phoneMessage}</p>
              </div>
            </div>
            <div className="join_info">
              <label htmlFor="userEmail" className="info_label">
                이메일 <span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={emailInput}
                  onChange={handleEmailTest}
                  onFocus={() => {
                    handleEmailTest;
                  }}
                  onBlur={handleEmailTest}
                  type="email"
                  id="userEmail"
                  placeholder="email@bizmining.com"
                  onKeyDown={handleKeyDown}
                />
                <button type="button" onClick={handleEmailSentClick} className={`${emailValid && !isVertifyCodeSent ? "active" : ""}`}>
                  인증하기
                </button>
                <p className="ml-[151px] pt-1 text-xs text-red-500">{emailMessage}</p>
              </div>
            </div>
            {isVertifyCodeSent && !isVerified && (
              <div className="join_info">
                <div className="info_box certificate_box">
                  <input
                    type="text"
                    id="phone2"
                    placeholder="인증번호를 입력해 주세요"
                    value={userVerifyCode}
                    onChange={handleVerifyCodeChange}
                    className="certificate"
                  />
                  {isVertifyCodeSent && (
                    <span className="text-[14px] text-blue-500 absolute right-[163px] top-[14px]">{`${Math.floor(timerCountDown / 60)
                      .toString()
                      .padStart(2, "0")}:${(timerCountDown % 60).toString().padStart(2, "0")}`}</span>
                  )}
                  <button type="button" onClick={handleVerifyCodeClick} className="active">
                    인증번호확인
                  </button>
                </div>
              </div>
            )}

            <div className="join_info">
              <label htmlFor="userAdress" className="info_label">
                주소 <span className="must">*</span>
              </label>

              <div className="info_box">
                <input
                  value={addr1Input}
                  onChange={handleAddrTest}
                  onBlur={handleAddrTest}
                  onFocus={() => {
                    handleAddrTest;
                  }}
                  type="text"
                  id="userAdress"
                  placeholder="주소를 선택해주세요."
                  readOnly
                  onKeyDown={handleKeyDown}
                />
                <button type="button" className="active" onClick={() => setAddrModalOpen(true)}>
                  주소검색
                </button>
              </div>
              <p className="ml-[151px] pt-1 text-xs text-red-500">{addrMessage}</p>
            </div>

            <div className="join_info">
              <label htmlFor="userAdressDetail" className="info_label"></label>

              <div className="info_box">
                <input
                  value={addr2Input}
                  onChange={handleAddr2Change}
                  type="text"
                  id="userAdressDetail"
                  placeholder="상세주소를 입력해주세요."
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>

          <div className="join_btn_wrap">
            <Link href="/joinpage">이전으로</Link>
            <button type="button" onClick={handleSubmitClick}>
              다음으로
            </button>
          </div>
        </form>

        {/* 주소api modal */}
        {addrModalOpen && (
          <PostcodeModal
            setAddr1Input={setAddr1Input}
            validateAddress={validateAddress}
            setAddr2Input={setAddr2Input}
            setAddrModalOpen={setAddrModalOpen}
            handleAddrClose={handleAddrClose}
          />
        )}
        {/* 버튼 모달 */}
        <ModalDefalt isOpen={idModalOpen} message={idModalMessage} onConfirm={() => setIdModalOpen(false)} onClose={() => setIdModalOpen(false)} />

        <ModalDefalt
          isOpen={emailSentModalOpen}
          message="인증번호가 발송되었습니다"
          /* message='문자가 오지 않은 경우에는 재전송버튼 또는 다시 한번 확인~~' */
          onConfirm={() => setEmailSentModalOpen(false)}
          onClose={() => setEmailSentModalOpen(false)}
        />
        <ModalDefalt
          isOpen={emailConfirmModalOpen}
          message={isVerified ? "인증이 완료되었습니다" : "유효하지 않은 인증번호입니다"}
          /* message='잘못된 인증코드입니다' */
          onConfirm={handlePhoneConfirmClose}
          onClose={() => setEmailConfirmModalOpen(false)}
        />
        <ModalDefalt
          isOpen={idCheckModalOpen}
          message={"아이디 중복확인을 완료해주세요."}
          onConfirm={() => setIdCheckModalOpen(false)}
          onClose={() => setIdCheckModalOpen(false)}
        />
        <ModalDefalt
          isOpen={emailCheckModalOpen}
          message={"이메일 인증을 완료해주세요."}
          onConfirm={() => setEmailCheckModalOpen(false)}
          onClose={() => setEmailCheckModalOpen(false)}
        />

        {timerExpiredOpen && (
          <div>
            <div
              style={{ position: "fixed", top: "0", left: "0", right: "0", bottom: "0", backgroundColor: "rgba(0,0,0,0.2)", zIndex: "999998" }}
              onClick={handleTimerExpiredClose}
            />
            <div
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
              <h1 className="py-[50px] text-[18px]">유효시간이 만료되었습니다</h1>
              <hr />
              <div className="py-[20px]">
                <button onClick={handleTimerExpiredClose} className="text-white bg-blue-400 hover:bg-blue-500 duration-150 rounded-[5px] px-7 py-3">
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
