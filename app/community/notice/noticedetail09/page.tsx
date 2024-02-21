"use client";

import React from "react";
import Link from "next/link";

import "../../../../public/style/community/notice.css";

export default function NoticeDetail() {
  return (
    <article id="notice">
      <div className="inner">
        <h2>공지사항</h2>

        <div>
          <div className="title_box">
            <h3>
              <span className="category">나라장터</span>
              「조달청 시설공사 적격심사세부기준」 개정·시행 알림
            </h3>
            <p>등록일 : 2024-01-08</p>
          </div>

          <div className="content_box">
            <p>
              (계약예규)「적격심사」개정* (&apos;24.1.1. 시행)에 따라 붙임과 같이 「조달청 시설공사
              적격심사세부기준」의 해당 조문을 개정하고 2024.1.8. 이후 최초 입찰공고 분부터 시행함을
              알려드립니다.
              <br></br>
              <br></br>* 전문업체 시공경험(실적) 합산실적으로 평가기준 3년 유예
              <br></br>
              <br></br>
              붙임 : 조달청 시설공사 적격심사세부기준 개정(전문) 1부. 끝.
              <br></br>
              <br></br>
              문의처 : 시설총괄과 070-4056-7350
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
                      <a href="#">조달청 시설공사 적격심사세부기준 개정(전문).hwp</a>
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
