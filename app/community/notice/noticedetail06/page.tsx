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
              <span className="category">나라장터</span>
              나라장터 지문보안 토큰 사용의무 폐지 안내(24.1.1.)
            </h3>
            <p>등록일 : 2024-01-02</p>
          </div>

          <div className="content_box">
            <p>
              2024년 1월 1일부터 ‘지문인식 신원확인 폐지에 따른 조달업무처리 특례’(`23. 12. 21.)
              관련하여 지문보안토큰 사용의무가 폐지됨에 따라 각 조달업체는 다음의 방법 중 하나를
              임의로 선택하여 전자입찰에 참여할 수 있습니다.
              <br />
              ①번) 사업자용인증서 + 지문보안토큰
              <br />
              ②번) 사업자용인증서 + 개인용인증서
              <br />
              <br />
              ‘24.1.1. 이전 지문 등록하신 이용자는 기존의 ①번) 방식을 이용하여 입찰에 참여할 수
              있으며 필요시 신원확인 예외신청 후 ②번) 방식으로도 입찰에 참여 가능합니다.
              <br />
              &apos;24.1.1 이후 본청과 지방청 민원실의 지문등록(추가등록 등)업무가 종료됨에 따라,
              신규 등록업체 또는 대표자 및 대리인이 변경되는 기존업체는 지문인식 신원확인 예외신청
              후 ②번) 방식으로 입찰에 참여하시면 됩니다.
              <br />
              <br />
              위의 변경내용은 나라장터에만 적용되는 사항으로, 나라장터 외의
              입찰시스템(한국수자원공사, 한국도로공사 등)의 적용여부는 각 기관의 공지사항을
              확인하시거나 해당 기관의 콜센터에 문의하시기바랍니다.
              <br />
              위와 같은 인증방식은 차세대 나라장터 오픈 전까지 시행되며, 전자입찰로 진행하는 공고의
              입찰집행관은 해당 내용을 참고하여 공고를 작성하시기 바랍니다.
              <br />
              자세한 내용은 붙임을 참고하시기 바랍니다.
              <br />
              <br />
              붙임 <br />
              1. 나라장터 지문보안 토큰 사용 의무 폐지 안내.pdf <br />
              2. 지문입찰 폐지 및 간편인증 관련 예상 질의·답변.pdf <br />
              3. 지문인식 신원확인 폐지에 따른 조달업무처리 특례 안내.pdf 끝. <br />
              <br />
              문의처 : 1588-0800
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
                    <dd className="attachments">
                      <a href="#">나라장터 지문보안 토큰 사용 의무 폐지 안내.pdf</a>
                      <a href="#">지문입찰 폐지 및 간편인증 관련 예상 질의·답변.pdf</a>
                      <a href="#">지문인식 신원확인 폐지에 따른 조달업무처리 특례 안내.pdf</a>
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
