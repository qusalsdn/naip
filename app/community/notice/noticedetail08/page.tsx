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
                    <span className="category">한전KDN</span>
                    [필독] 지문인식 예외신청 추가 안내
                  </h3>
                  <p>
                    등록일 : 2024-01-08
                  </p>
                </div>

                <div className="content_box"> 
                    <p>  
                    우리회사 입찰시스템은 조달청 지문정보를 연계하고 있으나, 1.1부 지문보안 토큰 사용 의무가 폐지됨에 따라 나라장터에 지문정보가 없을 시 연계가 불가능합니다. 
                    <br/>
                    이에 따라 조달청 나라장터 지문인식 예외 신청을 한 경우 반드시 아래와 같이 예외신청 후 이용 바랍니다.
                    <br/><br/>
                      1. 지문인식 예외신청 대상 : 조달청 나라장터 지문인식 예외 신청 업체
                         ※ 조달청 나라장터에서 지문이 정상적으로 사용되는 경우라도 희망 시 예외 신청 가능
                         <br/><br/>
                      2. 신청방법 : [로그인] - [업체관리] - [지문인식예외신청]
                      <br/><br/>
                      3. 예외기간 : 예외신청일 ~ 차세대 나라장터로 이용전환* 시까지
                          * 조달청 차세대 나라장터 개통(6월 예정) 이 후 해당 시스템으로 이용전환 예정
                      <br/><br/>
                      4. 유의사항
                           가. 조달청 나라장터에 예외신청 승인을 받았더라도 우리회사 시스템 별도 예외 신청 필수
                           나. 예외 신청 시 사업자용 인증서와 개인용 인증서를 활용하여 입찰에 참여
                           <br/><br/>
                    문의사항 계약부 김한별 대리 061-931-6862
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
