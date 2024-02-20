"use client";

import React, { useState } from "react";
import Link from "next/link";

import "../../../../public/style/community/notice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestion,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";

export default function NoticeDetail() {
  return (
    <article id="notice">
      <div className="inner">
        <h2>공지사항</h2>

        <div>
          <div className="title_box">
            <h3>
              <span className="category">한국수력원자력</span>
              지문보안 토큰 사용의무 폐지 안내
            </h3>
            <p>등록일 : 2023-12-29</p>
          </div>

          <div className="content_box">
            <p>
              조달청의 「나라장터 지문보안 토큰 사용의무 폐지 예고 안내」에 따라 한국수력원자력(주)
              전자상거래시스템(K-pro) 또한 2024년 1월 1일부터 입찰 시 신원확인을 위한 지문보안토큰
              사용 의무가 <br />
              폐지됨을 알려드리며, 2024년 1월 1일부터 각 조달 업체는 다음 방법 중 하나를 임의
              선택하여 입찰에 참여하시기 바랍니다.
              <br /> <br />
              ① 기존에 등록된 입찰자(예. 대표자, 대리인)에 변경이 없는 경우 <br />
              1안) 지문보안 토큰 사용 입찰 참여(기존 동일) <br />
              2안) 조달청에서 &quot;지문인식 신원확인 예외 신청&quot; 또는 한수원 전자상거래
              &quot;지문예외신청&quot; 후 사업자용 인증서와 휴대폰 본인인증(또는 iPIN 인증)으로 입찰
              참여 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 단, 조달청에서 &quot;지문인식 신원확인 예외
              신청&quot; 시 한수원 전자상거래 반영까지 최대 1~2일 소요 가능 <br />
              <br />
              ② 신규로 입찰참가자격을 등록한 업체 또는 기존 조달업체가 입찰자(예. 대표자, 대리인)를
              변경한 경우
              <br />
              - 상기 2안과 동일 <br />
              <br />
              ○ 유의사항 <br />
              - 조달청에서 &quot;지문인식 신원확인 예외 신청&quot; 시 전자상거래(K-Pro) 반영까지
              최대 1~2일 소요 가능 <br />
              - 전자상거래(K-Pro)지문보안 토큰 사용의무 폐지는 2024년 1월 1부터 시행 <br />-
              전자상거래(K-Pro)&quot;지문예외신청&quot; 시 기존 신청 횟수에 제한은 없으며 유효기간은
              2024. 7. 1.이나 변경될 수 있음
            </p>
          </div>
        </div>

        <div className="attachment">
          <table className="attachment_file">
            <colgroup>
              <col width="150px" />
              <col width="1130px" />
            </colgroup>
            <tbody>
              <tr>
                <th>첨부파일</th>
                <td>
                  <dl>
                    <dt></dt>
                    <dd>
                      <a href="#"></a>
                    </dd>
                  </dl>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="back">
          <Link href="/community/notice">목록으로</Link>
        </div>
      </div>
    </article>
  );
}
