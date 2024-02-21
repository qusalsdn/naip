"use client";

import React, { useState } from "react";

import "../../../public/style/community/faq.css";
import { animated, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

type FAQItemProps = {
  category: string;
  questionText: string;
  answerText: string;
  selectedCategory: string | null;
  toggleCategory: (category: string | null) => void;
};

const FAQItem: React.FC<FAQItemProps> = ({
  category,
  questionText,
  answerText,
  selectedCategory,
  toggleCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useSpring({
    height: isOpen ? "auto" : "0",
    opacity: isOpen ? 1 : 0,
    overflow: "hidden",
    config: { tension: 210, friction: 20 },
    immediate: !isOpen,
  });

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const shouldDisplay =
    !selectedCategory || selectedCategory === "null" || category === selectedCategory;

  return (
    shouldDisplay && (
      <div className="">
        <div className={`faqflex ${isOpen ? "active" : ""}`}>
          <span className="category">{category}</span>
          <div onClick={toggleAccordion} className="question">
            {" "}
            <span>Q</span>. {questionText}
          </div>
          <button onClick={toggleAccordion} className={` ${isOpen ? "active" : ""}`}>
            <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
          </button>
        </div>

        <animated.div style={animation} className="answer">
          <div className="answerText" dangerouslySetInnerHTML={{ __html: answerText }}></div>
        </animated.div>
      </div>
    )
  );
};

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const faqData = [
    // FAQ 항목들의 데이터 객체들
    {
      category: "공고검색",
      questionText: "마이페이지의 '등록 키워드 관리'와 '검색 조건 관리'의 차이는 무엇인가요?",
      answerText: `<span>A</span>. <br>
          ■ '등록 키워드 관리'와 '검색 조건 관리'에서는 사용자가 주로 공고 검색에 사용하는 키워드를 관리하는 것인데, 용도의 차이가 있습니다. <br/><br/>
     
          ■ 등록 키워드 관리 <br/>
               • 회원가입 시 '추가정보입력' 에 입력한 '관심 키워드', '관심 기관', '관심 금액'을 확인ㆍ수정할 수 있습니다. <br/>
               • '등록 키워드 관리' 등록된 내용을 기반으로 공고를 검색하여, '마이페이지 →  키워드 매칭 공고'에서 사용자가 관심있는 공고를 확인할 수 있습니다. <br/><br/>
          
          ■  검색 조건 관리 <br/>
               • 수 많은 입찰 공고 중 사용자에게 유효한 키워드 및 제외 키워드를 미리 등록하여 검색 조건 세트를 구성 할 수 있습니다.<br/>
               • 사용자의 상황에 맞는 검색 조건 세트를 이용하여 신속하고 효율적으로 필요한 공고를 확인할 있습니다.<br/><br/>
          `,
    },
    {
      category: "공고검색",
      questionText: " 검색한 입찰공고 중 관심 있는 입찰공고를 저장하여 확인할 수 있나요?",
      answerText: `<span>A</span>. <br>
          ■ 사용자는 관심 있는 입찰공고를 '스크랩 공고'로 선택하고, 별도 저장ㆍ삭제 및 확인할 수 있습니다. <br/><br/>

          ■ '스크랩 공고' 저장ㆍ삭제 및 확인 방법은 아래와 같습니다. <br/>
               • '스크랩 공고' 저장 방법 : 사용자가 검색한 입찰공고 중 저장을 원하는 입찰공고에 표시된 별모양의 아이콘을 클릭하면, 아이콘 색상이 노란색으로 변경되고,  '스크랩 <br/>
                &nbsp;&nbsp;&nbsp; 공고'로 저장됩니다. <br/>
               • '스크랩 공고' 삭제 방법 : 저장된 '스크랩 공고'에 노란색으로 표시된 별모양의 아이콘을 클릭하면, '스크랩 공고'가 삭제됩니다. <br/>
               • '스크랩 공고' 확인 방법 :  '마이페이지 → 스크랩 공고'에서 사용자가 저장환 관심 입찰공고를 확인할 수 있습니다.<br/>
          `,
    },
    {
      category: "뉴스레터",
      questionText: " 뉴스레터는 무엇인가요?",
      answerText: `<span>A</span>. <br>
          ■ 내일스퀘어의 뉴스레터는 '마이페이지 → 등록 키워드 관리'에 등록한 관심 키워드, 관심 기관, 관심 금액을 기반으로 사용자가 원하는 입찰공고를 정리하여 <br/>
            &nbsp;&nbsp;&nbsp;&nbsp; 사용자에게 정기적으로 전달하는 이메일 소식지 입니다.
          `,
    },
    {
      category: "뉴스레터",
      questionText: " 뉴스레터를 받고 싶지 않습니다.",
      answerText: `<span>A</span>. <br>
          ■ 뉴스레터를 받고 싶지 않으시면 '마이페이지 → 회원정보 → 기본정보'에서 '뉴스레터를 수신하지 않겠습니다.'에 체크 후 저장하시면 뉴스레터의 발송이 중지됩니다.`,
    },
    {
      category: "용어정리",
      questionText: " 입찰대리인이란 무엇인가요?",
      answerText: `<span>A</span>. <br>
            ■ 입찰대리인이란 나라장터에 등록한 업체의 대표자 외에 전자입찰에 참여할 수 있는 업체 직원을 말합니다. <br/>
            ■ 나라장터 참가자격 등록 시 조달청의 입찰대리인 등록 요청서류(재직증명서 등)를 제출하고, 승인을 받아 입찰대리인을 등록할 수 있습니다. 
            `,
    },
    {
      category: "용어정리",
      questionText: " 재공고와 재입찰의 공통점과 차이점이 무엇인가요?",
      answerText: `<span>A</span>. <br>
            ■ 입찰 공고 중 재공고와 재입찰 공고의 공통점 <br/>
            • 최초 입찰 참여 시 정해진 가격 및 기타 조건을 변경할 수 없습니다. <br/><br/>
       
            ■ 입찰 공고 중 재공고와 재입찰 공고의 차이점은 다음과 같습니다. <br/>
            • 재공고 <br/>
               - 투찰자 또는 낙찰자가 없거나 낙찰자가 계약을 체결하지 않은 경우 다시 등록된 공고를 말합니다. <br/>
               - 재공고는 공고번호의 차수만 변경되고, 모든 업체가 투찰이 가능합니다. <br/><br/>
            • 재입찰 공고 <br/>
               - 경쟁입찰 시 2인 이상의 유효 입찰자가 없거나, 낙찰자가 없는 경우 재입찰을 실시합니다. <br/>
               - 재입찰은 신규 공고로 분류되지 않습니다. <br/>
               - 기존 공고번호의 변경 없이 원공고에서 입찰에 참여했던 업체만 투찰이 가능합니다. <br/>
            `,
    },
    {
      category: "용어정리",
      questionText: "입찰 계약 방법은 어떠한 것이 있나요?",
      answerText: `<span>A</span>. <br>
            ■ 제한경쟁 <br/>
            • 계약의 목적, 성질등에 비추어 필요한 경우 경쟁참가자의 자격을 일정한 기준에 의해 제한하여 입찰케 하는 방법입니다.<br/><br/>
       
            ■ 일반경쟁 <br/>
            • 불특정다수의 입찰희망자를 경쟁입찰에 참가토록 한 후 그 중에서 국가에 가장 유리한 조건을 제시한 자를 선정하여 계약을 체결하는 방법입니다. <br/>
            • 경쟁입찰은 2인 이상의 유효한 입찰이 있을때 성립됩니다. <br/><br/>
       
            ■ 수의경쟁 <br/>
            • 경쟁입찰에 부치지 않고 특정의 상대를 선정하여 그 자와 계약을 체결하는 것으로, 특수목적을 위하여 예외적으로 인정하는 경우의 계약 방법입니다. <br/><br/>
                
            ■ 전자시담 <br/>
            • 불특정 다수인으로부터 견적서를 제출받지 않고 수의계약을 체결하는 경우에는 당해 1인으로부터 나라장터를 이용하여 견적서를 제출하여 진행하는 계약 방법입니다.<br/>
            `,
    },
    {
      category: "회원정보",
      questionText: "사용하던 아이디와 비밀번호를 잊어버렸습니다.",
      answerText: `<span>A</span>. <br>
          ■ 내일스퀘어 메인 홈페이지의 아이디 찾기/비밀번호 찾기를 클릭하여 아이디와 비밀번호를 찾을 수 있습니다. <br/><br/>
          • 아이디 찾기 : 로그인 부분의 '아이디 찾기'를 클릭 후 계정 생성 시 등록한 이메일을 입력 → '찾기' 버튼 클릭  <br/>
            &nbsp;&nbsp; → (입력한 이메일과 등록한 이메일 동일 시) 아이디 확인 <br/><br/>
          • 비밀번호 찾기 : 사용하는 아이디와 등록한 핸드폰을 인증 → '찾기' 버튼 클릭 → 등록한 이메일로 임시 비밀번호 전송 <br/>
            &nbsp;&nbsp; ※ 만약, 등록한 정보가 기억나지 않으면 고객센터(02-355-0214)로 연락주시기 바랍니다. 
          `,
    },
    {
      category: "회원정보",
      questionText: "아이디 변경이 가능한가요?",
      answerText: `<span>A</span>. <br>
          ■ 아이디의 변경은 어렵습니다.   <br>
          &nbsp;&nbsp;&nbsp;&nbsp; 사용중인 아이디를 고객센터(02-355-0214)에 삭제 요청하시고, 새로 재가입이 가능합니다.  <br>
          ■ 사용중인 아이디 삭제 시 저장 문서, 설정 등 기존에 저장된 데이터가 손실되니 유의하시기 바랍니다. <br>
          `,
    },
    {
      category: "회원정보",
      questionText: "회원정보 변경은 어떻게 하나요?",
      answerText: `<span>A</span>. <br>
          ■ 내일스퀘어 로그인 후 '회원 정보 수정' 또는 '마이페이지 → 회원정보'에서 회원정보를 확인ㆍ수정할 수 있습니다. <br>
          &nbsp;&nbsp;&nbsp;&nbsp; ※ 단, 아이디 및 가입자 성함의 수정은 불가합니다. <br>
          `,
    },
    {
      category: "회원정보",
      questionText:
        " 회원가입 시 추가정보에 입력한 관심 키워드, 관심 기관, 관심 금액이란 무엇인가요?",
      answerText: `<span>A</span>. <br>
          ■ 사용자가 관심있는 분야의 사업/입찰공고에 대한 키워드, 기관, 사업금액 규모를 미리 등록하는 것입니다.<br>
          &nbsp;&nbsp;&nbsp;&nbsp; 사용자가 원하는 사업/입찰공고를 우선적으로 검색하여 보여줍니다. <br><br>
          ■ 등록내용은 【마이페이지】 > 【등록 키워드 관리】에서 확인할 수 있습니다. <br><br>
          ■ 관심 키워드, 관심 기관, 관심 금액 입력 방법 및 예시 <br><br>
           • 관심 키워드 <br>
              - 여러 개의 키워드를 콤마(,)로 구분하여 입력이 가능합니다. <br>
              - 입력 예 : 인공지능, 블록체인, SW, 지능형, 플랫폼 <br><br>
           • 관심 기관 <br>
              - 여러 개의 기관, 정부부처를 콤마(,)로 구분하여 입력이 가능합니다. <br>
              - 입력 예 : 서울특별시, 경기도, 중소벤처기업부, 산림청, 한국전력공사, 한전KDN <br><br>
           • 관심 금액 <br>
               - 입력한 금액 이상의 사업금액 규모를 가진 사업/입찰공고를 검색합니다.<br>
               - 입력 예 : 1500000000 <br>
          `,
    },
    {
      category: "회원정보",
      questionText:
        " 회원가입 시 추가정보에 입력한 관심 키워드, 관심 기관, 관심 금액은 수정이 가능한가요?",
      answerText: `<span>A</span>. <br>
          ■ 수정(추가, 삭제)이 가능합니다. <br><br>
          ■ 등록내용의 수정(추가, 삭제)은 【마이페이지】 > 【등록 키워드 관리】에서 해당 항목의 '수정'을 클릭하여 진행합니다. <br>
               • 관심 키워드 <br>
                  - 【등록 관심 키워드】 > 수정 > 키워드 추가 입력 또는 삭제 > 완료  <br><br>
               • 관심 기관  <br>
                  - 【등록 관심 기관】 > 수정 > 관심 기관 추가 입력 또는 삭제 > 완료  <br><br>
               • 관심 금액 <br>
                  - 【관심 금액】 > 수정 > ∧ 또는 ∨ 클릭하여 금액 설정 <br>
                  &nbsp;&nbsp;&nbsp;&nbsp;  ※ 설정한 금액 이상의 사업금액규모를 가진 사업/입찰공고가 검색됩니다.<br>
          `,
    },
    {
      category: "기타",
      questionText: "전자입찰이 처음인데 어떻게 준비해야 되나요?",
      answerText: `<span>A</span>. <br>
          ■ 전자입찰이 처음이라면 전자입찰에 참여하기 위해 먼저 나라장터(g2b.go.kr)에 조달업체 등록이 완료되어야 합니다. <br>
          • 나라장터의 입찰이 아닌 다른 기관(예 : 한국전력공사, 한전KDN 등)의 전자입찰시스템을 통한 입찰을 하기위해서도 나라장터에 조달업체로 등록이 되어 있어야만 <br>
          &nbsp;&nbsp;&nbsp; 회원가입 및 입찰이 가능하기 때문에 우선적으로 나라장터에 회원가입을 진행해야 합니다. <br><br>
     
          ■ 전자입찰을 위해서는 사업자 범용 공동인증서와 지문보안토큰의 구매 및 등록이 필요합니다. <br>
          • 사업자 범용 공동인증서 구매 <br>
          &nbsp;&nbsp;&nbsp;&nbsp;  - 발급기관 : 한국정보인증, 한국전자인증 등 <br>
          &nbsp;&nbsp;&nbsp;&nbsp;  - 사업자 범용 공동인증서는 사용 유효 기간(구매일로부터 1년)이 있으므로 재발급 필요 <br>
          • 지문보안토큰 : 사업자 범용 공동인증서를 구매하여 발급 받은 사이트에서 구매 가능 <br><br>
     
          ■ 전자입찰을 위한 업체 준비 절차는 크게 5단계로 구성됩니다. <br>
           : 나라장터 조달업체 등록 → 조달청 검토 및 승인 확인 → 사업자 범용 공동인증서 발급 → 지문보안토큰 구매 및 지문등록 <br>
           &nbsp;&nbsp; → 나라장터에 사업자 범용 공동인증서 등록
          `,
    },
    {
      category: "기타",
      questionText: "나라장터 입찰참가자격등록을 변경 또는 추가하려면 어떻게 해야되나요?",
      answerText: `<span>A</span>. <br>
          ■ 나라장터의 입찰참가자격등록을 변경 또는 추가하려는 사항이 있다면 업체에서 직접 입력하여 변경 또는 추가가 가능한 사항이 있고, <br>
          &nbsp;&nbsp;&nbsp;&nbsp; 입력 후 조달청 송신 후 승인이 필요한 사항이 있습니다.<br><br>
          • 직접 입력 변경 또는 추가 가능한 사항 <br>
          &nbsp;&nbsp;&nbsp;&nbsp;- 업체 전화번호, 이메일 주소 등 <br>
          • 조달청 승인이 필요한 사항  <br>
          &nbsp;&nbsp;&nbsp; - 업체 사업장 주소, 대표자, 제조물품, 공사 또는 용역업종 변경 등 <br>
          &nbsp;&nbsp;&nbsp; - 조달청 변경 또는 추가 사항 요청 방법 : 나라장터 로그인 → 입찰참가자격변경 신청을 선택하여 변경사항 입력 후 해당 조달청으로 송신(증빙서류 제출 포함)  <br><br>
     
          ※ 입찰참가자격등록의 변경 및 추가 사항에 대한 내용은 업체에서 임의로 판단하지 마시고, 나라장터 고객센터(1588-0800)으로 문의하여 정확한 내용을 확인 후 <br>
          &nbsp;&nbsp;&nbsp; 진행하시기 바랍니다.
          `,
    },
  ];

  const [filteredFaqData, setFilteredFaqData] = useState(faqData); // 초기값은 전체 FAQ 데이터

  return (
    <div id="faq">
      <div className="inner">
        <h2>자주 묻는 질문 FAQ</h2>

        <div className="faq_wrap">
          <div className="filter_bar">
            <ul>
              <li
                className={` ${selectedCategory === null ? "active" : ""}`}
                onClick={() => handleCategoryClick(null)}
              >
                전체보기
              </li>
              <li
                className={` ${selectedCategory === "공고검색" ? "active" : ""}`}
                onClick={() => handleCategoryClick("공고검색")}
              >
                공고검색
              </li>
              <li
                className={` ${selectedCategory === "뉴스레터" ? "active" : ""}`}
                onClick={() => handleCategoryClick("뉴스레터")}
              >
                뉴스레터
              </li>
              <li
                className={` ${selectedCategory === "용어정리" ? "active" : ""}`}
                onClick={() => handleCategoryClick("용어정리")}
              >
                용어정리
              </li>
              <li
                className={` ${selectedCategory === "회원정보" ? "active" : ""}`}
                onClick={() => handleCategoryClick("회원정보")}
              >
                회원정보
              </li>
              <li
                className={` ${selectedCategory === "기타" ? "active" : ""}`}
                onClick={() => handleCategoryClick("기타")}
              >
                기타
              </li>
            </ul>
          </div>

          <div className="faq_content_box">
            {filteredFaqData.map((faqItem, index) => (
              <FAQItem
                key={index}
                category={faqItem.category}
                questionText={faqItem.questionText}
                answerText={faqItem.answerText}
                selectedCategory={selectedCategory}
                toggleCategory={handleCategoryClick}
              />
            ))}
          </div>
          <div className="pager">
            <button className="itemClass2 disabled">
              <em>
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
              </em>
            </button>
            <button className="itemClass2 active">1</button>
            <button className="itemClass2 disabled">
              <em>
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
              </em>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
