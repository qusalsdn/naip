"use client";

import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import MyFooter from "@/components/mypage/myFooter";
import "../../../public/style/mypage/userinfo.css";
import PostcodeModal from "@/components/joinpage/postcodeMoadl";
import axios from "axios";
import ModalDefalt from "@/components/joinpage/ModalDefault"; //폼 버튼 모달 레이아웃

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface ResponseType {
  ok: boolean;
  user: UserInfo;
}

interface UserInfo {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address1: string;
  address2: string;
  maxLength: number;
}

export default function UserInfoComponent({ isOpen, data, isLoading, mutate }: any) {
  //폼 button modal open (아이디중복확인, 기업인증, 인증번호받기, 인증번호 확인)
  const [phoneSentModalOpen, setPhoneSentModalOpen] = useState(false);
  const [phoneConfirmModalOpen, setPhoneConfirmModalOpen] = useState(false);

  //정규표현식
  const phoneRegex = useCallback(() => /^01([016789]{1})[0-9]{3,4}[0-9]{4}$/, []); //핸드폰번호
  const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+\.[a-zA-Z]{2,3}$/i; //이메일
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/; //비밀번호

  useEffect(() => {
    if (data?.ok && !isLoading) {
      setIdInput(data?.user.id);
      setUserNameInput(data?.user.name);
      setPhoneInput(data?.user.phoneNumber);
      setEmailInput(data?.user.email);
      setAddr1Input(data?.user.address1);
      setAddr2Input(data?.user.address2);
    }
  }, [data, isLoading]);

  //id -- 변경불가
  const [idInput, setIdInput] = useState("");

  //pw -- 팝업에서변경
  const [pw1Message, setPw1Message] = useState("");
  const [pw0Input, setPw0Input] = useState("");
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
  const [pwCheck, setPwCheck] = useState(false);

  const validatePw2 = (value: any) => {
    if (value !== pw1Input) {
      setPw2Message("동일한 비밀번호를 입력하세요");
      setPwCheck(false);
      return false;
    }
    setPw2Message("");
    setPwCheck(true);
    return true;
  };

  const onChangePw0 = (e: ChangeEvent<HTMLInputElement>) => {
    setPw0Input(e.target.value);
  };

  const handlePw2Change = (e: any) => {
    setPw2Input(e.target.value);
    validatePw2(e.target.value);
  };

  //비밀번호변경 팝업
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const handleChangeModalOpen = () => {
    setChangeModalOpen(true);
  };
  const onClickPwChangeBtn = () => {
    if (!pwRegex.test(pw0Input)) return alert("기존 비밀번호를 형식에 맞게 입력해주세요.");
    else if (!pwRegex.test(pw1Input) || !pwRegex.test(pw2Input)) return alert("8~16자 이내의 영문(대, 소문자), 숫자, 특수문자(@, $, !, %, *, #, ?, &) 조합이 아닙니다.");
    else if (!pwCheck) return alert("새 비밀번호 확인이 동일하지 않습니다.");
    axios.post("/api/user/update", { pw0: pw0Input, pw1: pw2Input, track: 0 }).then((res) => {
      if (res.data.ok) {
        setPw0Input("");
        setPw1Input("");
        setPw2Input("");
        setChangeModalOpen(false);
        mutate();
      } else alert("기존 비밀번호가 맞지 않습니다.");
    });
  };
  const handleChangeModalClose = () => {
    setPw0Input("");
    setPw1Input("");
    setPw2Input("");
    setChangeModalOpen(false);
  };

  //이름 -- 변경불가
  const [userNameInput, setUserNameInput] = useState("");

  //핸드폰번호
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  //인증번호받기 활성화
  const [phoneValid, setPhoneValid] = useState(false);
  useEffect(() => {
    if (phoneRegex().test(phoneInput)) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  }, [phoneRegex, phoneInput]);

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

  //임시 인증번호
  const [isVerified, setIsVerified] = useState(false); //인증 완료 여부
  const [userVerifyCode, setUserVerifyCode] = useState("");
  const trueVerifyCode = "123456";

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

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
  const handlePhoneSentClick = () => {
    if (phoneValid && !isVerified) {
      setPhoneSentModalOpen(true);
      setIsVertifyCodeSent(true);
    } else {
      setPhoneSentModalOpen(false);
    }
  };

  //인증번호입력필드
  const handleVerifyCodeChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, ""); //숫자만 입력
    setUserVerifyCode(onlyNums);
  };

  //인증번호확인 클릭
  const handleVerifyCodeClick = () => {
    if (userVerifyCode === trueVerifyCode) {
      axios.post("/api/user/update", { phoneNumber: phoneInput, track: 1 }).then((res) => {
        if (res.data.ok) {
          setIsVerified(true);
          setPhoneConfirmModalOpen(true);
          setTimerCountDown(0);
          setUserVerifyCode("");
          mutate();
        } else alert("유저 정보가 존재하지 않습니다.");
      });
    } else {
      setIsVerified(false);
      setPhoneConfirmModalOpen(true);
    }
  };

  //인증완료 모달 확인
  const handlePhoneConfirmClose = () => {
    setPhoneConfirmModalOpen(false);
  };

  //이메일
  const [emailMessage, setEmailMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const validateEmail = (value: any) => {
    if (value === "") {
      setEmailMessage("이메일 주소를 입력하세요");
      return false;
    } else if (!emailRegex.test(value)) {
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

  //주소
  const [addrMessage, setAddrMessage] = useState("");
  const [addrModalOpen, setAddrModalOpen] = useState(false); //주소검색
  const [addr1Input, setAddr1Input] = useState("");

  const handleAddrTest = (e: ChangeEvent<HTMLInputElement>) => {
    setAddr1Input(e.target.value);
    validateAddress(e.target.value);
  };

  const handleAddr2Change = (e: ChangeEvent<HTMLInputElement>) => {
    setAddr2Input(e.target.value);
  };

  const handleAddrClose = () => {
    setAddrModalOpen(false);
  };
  const validateAddress = (value: string) => {
    //주소
    if (value === "") {
      setAddrMessage("주소를 선택하세요");
      return false;
    }
    setAddrMessage("");
    return true;
  };

  //상세주소
  const [addr2Input, setAddr2Input] = useState("");

  //체크박스
  const [isIdSaveChecked, setIsIdSaveChecked] = useState(true);
  const [isKeepLoginChecked, setIsKeepLoginChecked] = useState(false);
  const [isNewLetterChecked, setIsNewLetterChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsIdSaveChecked(!isIdSaveChecked);
  };

  const handleCheckboxChange2 = () => {
    setIsKeepLoginChecked(!isKeepLoginChecked);
  };

  const handleCheckboxChange3 = () => {
    setIsNewLetterChecked(!isNewLetterChecked);
  };



  //정보수정 취소버튼 클릭 시 페이지 새로고침
  const handleRefresh = () => {
    window.location.reload();
  };


  //개인정보수집이용동의

  const [selectAgreeShow, setSelectAgreeShow] = useState(false);
  const [mustAgreeShow, setMustAgreeShow] = useState(false);

  const selectAgreeToggle = () => {
    setSelectAgreeShow(!selectAgreeShow);
  };

  const mustAgreeToggle = () => {
    setMustAgreeShow(!mustAgreeShow);
  };

  //readonly의 onchange
  const [fieldValue, setFieldValue] = useState("");

  const handleChange = (e: any) => {
    setFieldValue(e.target.value);
  };

  // 프로필 수정하기 버튼
  const onClickProfileUpdateBtn = () => {
    if (!emailRegex.test(emailInput)) return alert("올바른 형식의 이메일 주소를 입력하세요.");
    else if (addr1Input === "") return alert("주소를 입력해주세요.");
    axios.post("/api/user/update", { email: emailInput, address1: addr1Input, address2: addr2Input, track: 2 }).then((res) => {
      if (res.data.ok) {
        alert("프로필 수정완료!");
        mutate();
      } else alert("유저 정보가 존재하지 않습니다.");
    });
  };

  return (
    <section id="userinfo" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <article className="userinfo_wrap">
          <div className="tit_box">
            <h2>회원정보</h2>
            <p>회원님의 정보를 수정&middot;확인 하실 수 있습니다.</p>
          </div>

          <div className="basic_info">
            <h3>기본정보</h3>
            <table summary="이 표는 회원정보 폼으로 아이디, 비밀번호, 이름, 연락처, 이메일, 주소를 나타내고 있습니다.">
              <colgroup>
                <col width="260px"></col>
                <col width="*"></col>
              </colgroup>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td>
                    <input
                      type="text"
                      value={idInput}
                      onChange={handleChange}
                      readOnly
                      onClick={() => {
                        alert("아이디는 수정이 불가능합니다.");
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td className="userpw">
                    <input type="password" value={pw1Input} onChange={handleChange} readOnly placeholder="*********" />
                    <button onClick={handleChangeModalOpen}>비밀번호 변경</button>
                  </td>
                </tr>
                <tr>
                  <th>가입자 성함</th>
                  <td>
                    <input
                      type="text"
                      value={userNameInput}
                      readOnly
                      onClick={() => {
                        alert("이름은 수정이 불가능합니다.");
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>휴대폰번호</th>
                  <td className="phoneNumber">
                    <input
                      value={phoneInput}
                      disabled={isVertifyCodeSent}
                      onChange={handlePhoneTest}
                      // onFocus={() => {
                      //   handlePhoneTest;
                      // }}
                      // onBlur={handlePhoneTest}
                      type="text"
                      id="userPhone"
                      placeholder="'-' 빼고 숫자만 입력"
                      maxLength={11}
                    />
                    <button type="button" onClick={handlePhoneSentClick} className={`${phoneValid && !isVertifyCodeSent ? "active" : ""}`}>
                      재인증하기
                    </button>
                    <p className="alert_msg">{phoneMessage}</p>
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
                  </td>
                </tr>
                <tr>
                  <th>이메일</th>
                  <td>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={handleEmailTest}
                      onFocus={() => {
                        handleEmailTest;
                      }}
                      onBlur={handleEmailTest}
                      id="userEmail"
                      placeholder="email@bizmining.com"
                    />
                    <p className="alert_msg">{emailMessage}</p>
                    <div className="newletter">
                        <div className="cntr3">
                            <input className="hidden-xs-up3" id="cbx3" type="checkbox" checked={isNewLetterChecked} onChange={handleCheckboxChange3} />
                            <label htmlFor="cbx3" className={`cbx3 ${isNewLetterChecked ? "checked3" : ""}`}></label>
                        </div>
                        <p onClick={handleCheckboxChange3}>내일스퀘어에서 발행하는 주간 뉴스레터 발송에 동의합니다.</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td className="addr">
                    <input type="text" value={addr1Input} onChange={handleChange} readOnly />
                    <button onClick={() => setAddrModalOpen(true)}>주소변경</button>
                    <input type="text" value={addr2Input} placeholder="상세주소를 입력해 주세요" onChange={handleAddr2Change} />
                  </td>
                </tr>
                <tr>
                  <th scope="row" rowSpan={2}>
                    개인정보 수집 및 <br></br> 이용동의
                  </th>
                  <td className="check">
                    <div className="option">
                      <div className="cntr">
                        <input className="hidden-xs-up" id="cbx" type="checkbox" checked={isIdSaveChecked} onChange={handleCheckboxChange} />
                        <label htmlFor="cbx" className={`cbx ${isIdSaveChecked ? "checked" : ""}`}></label>
                      </div>
                      <p onClick={handleCheckboxChange}>[필수] 개인정보 수집 이용 동의</p>
                    </div>
                    <button onClick={mustAgreeToggle}>
                      내용보기
                      {mustAgreeShow ? (
                        <span>
                          <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                      )}
                    </button>
                    {mustAgreeShow && (
                      <div className="pipp">
                        <p>
                          (주)비즈마이닝 서비스 이용을 위해 아래와 같이 개인정보를 수집 및 이용합니다. 동의를 거부할 권리가 있으며, 동의 거부 시 회원정보 수정이
                          불가합니다.
                        </p>
                        <table>
                          <colgroup>
                            <col width="33%" />
                            <col width="33%" />
                            <col width="*" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>목적</th>
                              <th>항목</th>
                              <th>보유 및 이용기간</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>공고검색자 정보 확인 및 통계 활용</td>
                              <td>가입자 성함, 휴대폰 번호, 이메일, 주소</td>
                              <td>회원 탈퇴 시 즉시 파기</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="check">
                    <div className="option">
                      <div className="cntr2">
                        <input className="hidden-xs-up2" id="cbx2" type="checkbox" checked={isKeepLoginChecked} onChange={handleCheckboxChange2} />
                        <label htmlFor="cbx2" className={`cbx2 ${isKeepLoginChecked ? "checked2" : ""}`}></label>
                      </div>
                      <p onClick={handleCheckboxChange2}>[선택] 개인정보 수집 이용 동의</p>
                    </div>
                    <button onClick={selectAgreeToggle}>
                      내용보기
                      {selectAgreeShow ? (
                        <span>
                          <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                      )}
                    </button>
                    {selectAgreeShow && (
                      <div className="pipp">
                        <ol>
                          <li>
                            1. 수집 이용 목적
                            <p>상품•서비스 영업, 홍보, 마케팅, 쿠폰 발송을 목적으로 활용</p>
                          </li>
                          <li>
                            2. 수집하는 개인정보 항목
                            <p>전화번호, 회원 가입시 수집한 항목, 서비스 이용 기록 등</p>
                          </li>
                          <li>
                            3. 개인정보 보유 및 이용기간
                            <p>회원탈퇴 시 즉시 파기</p>
                          </li>
                          <li>
                            4. 수신동의 거부 및 철회방법 안내
                            <p>
                              본 동의는 거부하실 수 있습니다. 다만 거부 시 동의를 통해 제공 가능한 각종 혜택, 이벤트 안내를 받아보실 수 없습니다. 더 이상 상품•서비스
                              영업, 홍보, 마케팅, 쿠폰 발송을 원하시지 않는 경우 회원정보수정 페이지에서 수신여부를 변경하실 수 있습니다.
                            </p>
                          </li>
                        </ol>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="revise_btn">
              <button className="revise" onClick={onClickProfileUpdateBtn}>
                프로필 수정하기
              </button>
              <button onClick={handleRefresh}>취소</button>
            </div>
          </div>
        </article>
      </div>
      <MyFooter></MyFooter>

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

      <ModalDefalt
        isOpen={phoneSentModalOpen}
        message="인증번호가 발송되었습니다"
        /* message='문자가 오지 않은 경우에는 재전송버튼 또는 다시 한번 확인~~' */
        onConfirm={() => setPhoneSentModalOpen(false)}
        onClose={() => setPhoneSentModalOpen(false)}
      />
      <ModalDefalt
        isOpen={phoneConfirmModalOpen}
        message={isVerified ? "인증이 완료되었습니다" : "유효하지 않은 인증번호입니다"}
        /* message='잘못된 인증코드입니다' */
        onConfirm={handlePhoneConfirmClose}
        onClose={() => setPhoneConfirmModalOpen(false)}
      />
      {/* 비밀번호 변경 modal */}
      {changeModalOpen && (
        <div className="modal">
          <div className="modal_content">
            <h3>비밀번호 변경</h3>
            <div className="flex">
              <label htmlFor="originPW">기존 비밀번호</label>
              <input type="password" id="originPw" placeholder="기존 비밀번호를 입력해 주세요." onChange={onChangePw0} value={pw0Input} />
            </div>
            <div className="flex">
              <label htmlFor="newPW">새 비밀번호</label>
              <input
                value={pw1Input}
                onChange={handlePw1Test}
                onFocus={() => {
                  handlePw1Test;
                }}
                onBlur={handlePw1Test}
                type="password"
                id="userPw"
                maxLength={16}
                placeholder="새로운 비밀번호를 입력해 주세요."
              />
              <p className="alert_msg2">{pw1Message}</p>
            </div>
            <div className="flex">
              <label htmlFor="newPWRecom">새 비밀번호 확인</label>
              <input value={pw2Input} onChange={handlePw2Change} type="password" id="password2" placeholder="새로운 비밀번호를 다시 한 번 입력해 주세요." />
              <p className="alert_msg2">{pw2Message}</p>
            </div>
            <div className="flex">
              <button type="button" onClick={onClickPwChangeBtn}>
                변경
              </button>
              <button type="button" onClick={handleChangeModalClose}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
