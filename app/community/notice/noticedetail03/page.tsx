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
              「조달청 시설공사 집행기준」 개정·시행 알림 (건설안전 평가강화)
            </h3>
            <p>등록일 : 2023-12-26</p>
          </div>

          <div className="content_box">
            <p>
              건설안전 평가를 강화하기 위해 붙임과 같이 「조달청 시설공사 집행기준」을 개정하고
              2024.1.1. 이후 최초 입찰공고 분부터 시행함을 알려드립니다.
              <br /> <br />
              ※ 문의처 <br />
              042-724-7350 (적격심사) <br />
              042-724-7365 (입찰참가자격사전심사기준) <br />
              042-724-7370 (종합심사 낙찰제)
              <br />
              <br />
              붙임 : 조달청 시설공사 진행기준 개정전문 각 1부. 끝.
              <br />
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
                      <a
                        href="../../../../public/file/test.zip"
                        download="231220_조달청_시설공사_집행기준(전문).zip"
                      >
                        231220_조달청_시설공사_집행기준(전문).zip
                      </a>
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
