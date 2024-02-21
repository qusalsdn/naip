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
            <h3>2024년 내일스퀘어 출시</h3>
            <p>등록일 : 2024-01-05 10:24</p>
          </div>

          <div className="content_box">
            <p>
              내일스퀘어가 오픈되었습니다. <br></br>
              오픈 베타 테스트가 0월 0일부터 0월 0일까지 진행됩니다.<br></br>
              많은 관심 바랍니다.
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
