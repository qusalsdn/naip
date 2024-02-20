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
              콜센터 상담사가 직접 알려주는 나라장터 이용방법 ‘유튜브 영상’추가 게시(2차)
            </h3>
            <p>등록일 : 2024-01-10</p>
          </div>

          <div className="content_box">
            <p>
              조달청(정부조달콜센터)은 지난해 11월부터 나라장터 이용자들이 시스템을 이용하면서
              빈번하게 문의하는 질의를 선별하여 “유튜브 영상”을 제작 후 유튜브 채널을 통해
              서비스하고 있습니다.
              <br />
              향후 문의가 계속되거나 새롭게 시행 또는 변경되는 사안, 혼선이 있는 사항 등 영상 제작이
              필요할 경우 점진적으로 추가해 나가고자 하오니 고객 여러분들의 많은 관심과 시청
              바랍니다.
              <br /> <br />
              가. 이번에 새로 추가된 영상 : 1개 영상 (2024.1.8.(월)부터 서비스 중) <br />
              * (주요내용) 지문보안토큰 사용의무 폐지(2024.1.1.)로 ‘지문인식 로그인’을 대신하여
              전자입찰에 참여하기 위한 &apos;조달업체 지문인식 신원확인 예외입찰 신청방법&apos;
              <br /> <br />
              나. 현재 서비스 중인 유튜브 영상 수량 - 사용자등록(=업체등록) : 8개 영상 <br />
              - 계약이행 대금(선금 포함) 청구 및 지급 : 20개 영상 <br />
              <br />
              영상은 유튜브 누리집(홈페이지)에서 ‘정부조달콜센터’라고 조회한 후 채널 내에서 찾아가는
              방법 또는 특정 제목을 바로 입력하는 방법이 있습니다. 영상의 전체 목록은 위 첨부파일을
              참고하시기 바랍니다.
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
                      <a href="#">유튜브 동영상 목록.hwpx</a>
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
