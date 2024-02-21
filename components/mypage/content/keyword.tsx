import React, { useState, useEffect } from "react";

import axios from "axios";
import "../../../public/style/mypage/keyword.css";
import { NavArrowUp, NavArrowDown } from "iconoir-react";
import MyFooter from "@/components/mypage/myFooter";
import { useForm } from "react-hook-form";

interface ResponseType {
  keyword: string;
  institution: string;
  amount: number;
}

export default function KeywordComponent({ isOpen }: any) {
  const [data, setData] = useState<ResponseType>({ keyword: "", institution: "", amount: 0 });
  const { handleSubmit, register, getValues, setValue } = useForm<ResponseType>({
    defaultValues: {
      keyword: "",
      institution: "",
      amount: 0,
    },
  });
  useEffect(() => {
    axios.get("/api/mypage/keyword/manage").then((res) => {
      if (res.data.ok) {
        setData(res.data.fetchData);
        setValue("keyword", res.data.fetchData.keyword);
        setValue("institution", res.data.fetchData.institution);
        setValue("amount", res.data.fetchData.amount);
      }
    });
  }, []);

  //키워드 수정
  const [reviseBtn, setReviseBtn] = useState(true);
  const reviseHandle = () => {
    if (getValues("keyword") !== null) {
      let keyword = "";
      const splitKeyword = getValues("keyword").split(",");
      splitKeyword.forEach((item) => {
        if (item.trim() !== "") keyword += `${item.trim()},`;
      });
      setData((prevState) => ({ ...prevState, keyword: keyword.slice(0, -1) }));
      setValue("keyword", keyword.slice(0, -1));
    }
    setReviseBtn(!reviseBtn);
  };

  //기관 수정
  const [reviseBtn2, setReviseBtn2] = useState(true);
  const reviseHandle2 = () => {
    if (getValues("institution") !== null) {
      let institution = "";
      const splitKeyword = getValues("institution").split(",");
      splitKeyword.forEach((item) => {
        if (item.trim() !== "") institution += `${item.trim()},`;
      });
      setData((prevState) => ({ ...prevState, institution: institution.slice(0, -1) }));
      setValue("institution", institution.slice(0, -1));
    }
    setReviseBtn2(!reviseBtn2);
  };

  //가격 수정
  const [reviseBtn3, setReviseBtn3] = useState(false);
  const increaseAmount = () => {
    if (data.amount < 100000000000) {
      setValue("amount", Math.min(getValues("amount") + 10000000, 100000000000));
      setData((prevState) => ({ ...prevState, amount: getValues("amount") }));
    }
  };
  const decreaseAmount = () => {
    if (data.amount > 0) {
      setValue("amount", Math.max(getValues("amount") - 10000000, 0));
      setData((prevState) => ({ ...prevState, amount: getValues("amount") }));
    }
  };
  const reviseHandle3 = () => {
    setReviseBtn3(!reviseBtn3);
    setData((prevState) => ({ ...prevState, amount: Number(getValues("amount")) }));
  };

  const onSubmit = (formData: ResponseType) => {
    axios.post("/api/mypage/keyword/manage/update", data).then((res) => {
      res.data.ok ? handleAlertOn() : alert("유저 정보가 존재하지 않습니다.");
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.preventDefault();
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
    <section id="keyword" className={`${isOpen ? "fold" : ""}`}>
      <div className="inner">
        <div className="tit_box">
          <h2>등록 키워드 관리</h2>
          <p>회원 가입 시 등록한 키워드를 관리해보세요.</p>
        </div>
        <form className="keyword_wrap" onSubmit={handleSubmit(onSubmit)}>
          <div className="keyword_content">
            <h3>등록 관심 키워드</h3>

            {reviseBtn ? (
              <div className="interest_keyword">
                {data?.keyword?.split(",").map((item: string, idx: number) => {
                  return <span key={idx}>{item}</span>;
                })}
              </div>
            ) : (
              <div className="interest_keyword active">
                <textarea
                  {...register("keyword")}
                  placeholder="관심 키워드를 입력하세요.   입력형식) 키워드1, 키워드2, 키워드3...."
                />
              </div>
            )}

            {reviseBtn ? (
              <button type="button" onClick={reviseHandle}>
                수정
              </button>
            ) : (
              <button type="button" onClick={reviseHandle}>
                완료
              </button>
            )}
          </div>
          <div className="keyword_des">
            {reviseBtn ? <p>※ 등록하신 키워드입니다</p> : <p>수정 후 완료버튼을 클릭해 주세요.</p>}
          </div>

          <div className="keyword_content">
            <h3>등록 관심 기관</h3>
            {reviseBtn2 ? (
              <div className="interest_keyword interest_keyword2">
                {data?.institution?.split(",").map((item: string, idx: number) => {
                  return <span key={idx}>{item}</span>;
                })}
              </div>
            ) : (
              <div className="interest_keyword active">
                <textarea
                  {...register("institution")}
                  placeholder="관심 기관을 입력하세요.  입력형식) 서울특별시, 경기도 수원시, 산림청, 질병관리본부...."
                />
              </div>
            )}

            {reviseBtn2 ? (
              <button type="button" onClick={reviseHandle2}>
                수정
              </button>
            ) : (
              <button type="button" onClick={reviseHandle2}>
                완료
              </button>
            )}
          </div>
          <div className="keyword_des">
            {reviseBtn2 ? (
              <p>※ 등록하신 관심 기관입니다</p>
            ) : (
              <p>수정 후 완료버튼을 클릭해 주세요.</p>
            )}
          </div>

          <div className="keyword_content2">
            <h3>관심 금액</h3>
            {reviseBtn3 ? (
              <div className="interest_price">
                <input type="number" {...register("amount")} onKeyDown={onKeyDown} />
              </div>
            ) : (
              <div className="interest_price">
                <p>{data?.amount?.toLocaleString()}원</p>
              </div>
            )}
            {reviseBtn3 && (
              <div className="upDownBtn">
                <button type="button" onClick={increaseAmount}>
                  <NavArrowUp />
                </button>
                <button type="button" onClick={decreaseAmount}>
                  <NavArrowDown />
                </button>
              </div>
            )}
            {reviseBtn3 ? (
              <button type="button" onClick={reviseHandle3}>
                완료
              </button>
            ) : (
              <button type="button" onClick={reviseHandle3}>
                수정
              </button>
            )}
          </div>
          <div className="keyword_des">
            <p>※ 등록하신 관심 금액입니다. 해당 금액 이상의 공고들만 표출됩니다</p>
          </div>

          <div className="save_cancel_btn">
            <button type="submit">저장</button>
          </div>
        </form>
        {alertOn && (
          <>
            <div className="alert_keyword"></div>
            <div className="alert_keyword_content">
              <p>저장 완료되었습니다.</p>
              <button onClick={handleAlertOff}>확인</button>
            </div>
          </>
        )}
      </div>

      <MyFooter></MyFooter>
    </section>
  );
}
