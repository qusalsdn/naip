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
              <span className="category">한전KDN</span>
              전자입찰 신원확인 방법 변경 사전 공지(&apos;24.1.1부)
            </h3>
            <p>등록일 : 2023-12-18</p>
          </div>

          <div className="content_box">
            <p>
              한전KDN 전자입찰시스템은 조달청 나라장터와 연계를 통해 신원확인용 지문정보를 확인하고
              있습니다. <br />
              2024년 1월 1일부터 조달청 차세대 나라장터 인증체계 개편에 따라 지문보안 토큰 사용
              의무가 폐지됩니다.
              <br />
              이와 관련하여 기존에 등록 되어있는 나라장터 지문 정보 외의 지문 변경 또는 신규 등록이
              불가하므로 우리회사 입찰시스템을 이용하시는 업체는 아래 &apos;지문인식 예외신청&apos;
              방법을 반드시 확인 후 이용 바랍니다. <br />
              <br />
              1. &nbsp;적용대상 : 한전KDN 전자입찰시스템 기존 및 신규 이용업체
              <br />
              2. 적용시기 : 2024년 1월 1일부
              <br />
              3. 이용방법 가. 기존 등록업체 : 지문보안 토큰 사용 OR 지문인식 예외신청 나. 신규
              등록업체 / 지문 정보(대표자, 대리인) 변경업체 : 지문인식 예외신청
              <br />
              4. 예외기간 : 예외신청일 ~ 차세대 나라장터로 이용전환* 시까지 * 조달청 차세대 나라장터
              개통(&apos;24.6월 예정) 이 후 해당 시스템으로 이용전환 예정
              <br />
              5. 유의사항 가. 조달청 나라장터에 예외신청 승인을 받았더라도 우리회사 시스템 별도 예외
              신청 필수 나. 예외 신청 시 사업자용 인증서와 개인용 인증서를 활용하여 입찰에 참여
              <br />
              <br />
              감사합니다.
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
