'use client';

import React, {useState} from "react";
import Link from "next/link";

import '../../../../public/style/community/notice.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faAngleRight, faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";

export default function NoticeDetail (){



  return (
    <article id="notice">
        <div className="inner">
            <h2>공지사항</h2>

            <div>
                <div className="title_box">
                  <h3>
                    <span className="category">나라장터</span>
                    「조달청 군수품 선택계약 업무처리규정」 폐지 안내
                  </h3>
                  <p>
                    등록일 : 2023-12-29
                  </p>
                </div>

                <div className="content_box">
                    <p> 
                    조달청 훈령인 「조달청 군수품 선택계약 업무처리규정」을 붙임과 같이 폐지하였음을 안내 드리오니 업무에 참조바랍니다.
                    <br/> <br/>
                    붙임
                      (폐지전문) 조달청 군수품 선택계약 업무처리규정.hwpx   끝.
                      <br/> <br/>
                    문의처 : 국방물자구매과 042-724-6302
                    </p>
                </div>
            </div>

            <div className="attachment">
              <table className="attachment_file">
                <colgroup>
                    <col width="150px"/>
                    <col width="1130px"/>
                </colgroup>
                <tbody>
                  <tr>
                      <th>첨부파일</th>
                      <td>
                        <dl>
                          <dt></dt>
                          <dd className="attachments">
                              <a href="#"> (폐지전문) 조달청 군수품 선택계약 업무처리규정.hwpx</a>
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
