"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "../../../public/style/joinpage/joinpage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function MoreInfo() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  //가입 완료 클릭
  const onSubmit = (data: any) => {
    const removeBlankKeywords = data.keywords
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item !== "")
      .join(",");

    const removeBlankInstitution = data.institution
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item !== "")
      .join(",");
    data.keywords = removeBlankKeywords;
    data.institution = removeBlankInstitution;
    axios.post("/api/user/signUp/more", { data }).then((res) => {
      if (res.data.ok) router.push("/joinpage/success");
    });
  };

  return (
    <>
      <div className="content_wrap">
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
              <li className="active">
                <span>3</span>
                추가정보입력
              </li>
              <span className="active">
                <FontAwesomeIcon icon={faAngleRight} />
              </span>
              <li>
                <span>4</span>
                가입완료
              </li>
            </ul>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="keywordFrm">
            <div className="frm_wrap">
              <div className="moreinfo_txt">
                <h2>거의 다 왔어요!</h2>
                <p>
                  보다 <span>특별한 서비스 제공</span>을 위해 추가 정보를 입력해 주세요.
                </p>
                <p>
                  추가정보는 <span>마이페이지 &gt; 등록 키워드 관리</span>에서 언제든지 수정할 수 있어요.
                </p>
                <p>(미입력 시 키워드 매칭 공고 제공이 불가능합니다.)</p>
              </div>

              <div className="more_info keyword">
                <label htmlFor="userid" className="info_label">
                  관심 키워드 입력
                </label>

                <div className="info_box">
                  <textarea {...register("keywords")} onResize={() => false} />
                  <div className="des">
                    <p>※ 이 설정은 키워드 매칭 공고 추천 시 사용됩니다.</p>
                    <p>
                      입력형식 : 키워드1, 키워드2, ... 콤마(,)로 구분하여 여러개 입력 가능 띄어쓰기 무시 <br></br>※ 입력 예: 통합유지,통합운영,망분리,전산시스템
                    </p>
                  </div>
                </div>
              </div>

              <div className="more_info keyword">
                <label htmlFor="userid" className="info_label">
                  관심 기관 입력
                </label>

                <div className="info_box">
                  <textarea {...register("institution")} onResize={() => false} />
                  <div className="des">
                    <p>※ 이 설정은 키워드 매칭 공고 추천 시 사용됩니다.</p>
                    <p>
                      기관명을 콤마(,)로 구분하여 여러개 입력 가능 (띄어쓰기 구분됨)
                      <br></br>
                      ※올바른 입력 예: 서울특별시,경기도 수원시,산림청,보건복지부 질병관리본부,국방부 국방전산정보원
                    </p>
                  </div>
                </div>
              </div>
              <div className="more_info keyword">
                <label htmlFor="userid" className="info_label">
                  관심 금액
                </label>

                <div className="info_box">
                  <input
                    type="text"
                    pattern="[0-9,]*" // 숫자와 콤마만 입력 가능하도록 패턴 설정
                    className="price"
                    maxLength={14}
                    {...register("amount")}
                  />
                  <div className="des">
                    <p>※ 이 설정은 키워드 매칭 공고 추천 시 사용됩니다.</p>
                    <p>
                      설정 금액 이상을 대상으로 합니다. (미입력 시 전체)
                      <br></br>
                      ※입력 예: 100,000,000 또는 2000000000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="join_btn_wrap">
              <Link href="/joinpage">처음으로</Link>
              <button type="submit">가입완료</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
