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
              연말 입찰마감 집중에 따른 입찰참여 시 유의사항
            </h3>
            <p>등록일 : 2023-12-22</p>
          </div>

          <div className="content_box">
            <p>
              연말 공공기관의 입찰마감이 증가하고 있습니다. <br />
              이에 투찰건수가 평상시보다 약 2배이상 늘어날 것으로 예상됩니다. <br />
              <br />
              특정시간대(09:00 ~ 10:00)에 투찰이 집중되면 나라장터 서비스가 원활하지 않을 수 있으니,
              입찰에 참여하실 분들은 입찰마감시각에 임박하여 투찰하지 마시고 2시간 이상의 충분한
              여유를 가지고 입찰에 참여하여 주시기를 당부 드립니다.
              <br />
              또한 콜센터 연결이 어려운 경우 나라장터 &gt; e-고객센터 &gt; 질의응답 게시판에 관련
              질의내용을 남겨 주시기 바랍니다. 최대한 빨리 답변 드리도록 하겠습니다.
              <br />
              우리 청은 보다 원활한 입찰서비스 제공을 위하여 최선을 다하겠습니다.
              <br />
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
