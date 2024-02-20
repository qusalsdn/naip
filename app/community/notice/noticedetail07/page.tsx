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
                    2024년도 기술용역 발주정보 등록 요청
                  </h3>
                  <p>
                    등록일 : 2024-01-03
                  </p>
                </div>

                <div className="content_box"> 
                    <p> 
                    1. 관련 <br/>
                       가. 『국가를 당사자로 하는 계약에 관한 법률』 시행령 제92조의2 및 『지방자치단체를 당사자로 하는 계약에 관한 법률』 시행령 제124조
                       <br/>
                       나. 『조달사업에 관한 법률』 시행령 제11조 제3항
                       <br/><br/>
                    2. 위 법령에 의거 우리 청에서는 매년 각 기관에서 제출한 집행계획 및 발주정보를 취합하여 기술용역의 집행계획을 예시함으로써 조달업체의 생산 및 영업활동에 실질적인 도움을 주고, 업체 간 경쟁 유도를 통한 정부예산 절감에 기여하고 있습니다.
                    <br/><br/>
                    3. 관련 법령에 따라 2024년도 기술용역의 집행계획을 예시하고자 하오니, 귀 기관의 발주정보를 2024.1.20.까지 나라장터에 등록하여 주시기 바랍니다.
                    <br/><br/>
                    4. 아울러, 각 국가/지방자치단체/기타기관의 1차 기관은 해당 기관의 하부조직, 특별 행정기관 및 부속기관에 전파하여 원활한 정보공개가 될 수 있도록 협조하여 주시기 바랍니다.
                    <br/><br/>
                    5. 한편, 나라장터에 등록한 발주계획은 등록 즉시 대국민에게 공개되오니 중복, 누락, 착오입력(금액 과다 또는 과소 등) 등이 발생되지 않도록 붙임 메뉴얼에 따라 다시 한번 확인 부탁드립니다.
                    <br/><br/>
                    붙임<br/>
                      1. 2024년도 기술용역 발주정보 등록 안내 1부. <br/>
                      2. 기술용역 발주계획 입력·조회 방법 1부. <br/>
                      3. 일괄등록 샘플 1부.   끝. <br/>
                      <br/>
                    문의처 : 건설기술계약과 070-4056-7785
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
                              <a href="#">2024년도 기술용역 발주정보 등록 안내.hwp</a>
                              <a href="#">기술용역 발주계획 입력·조회 방법.hwp</a>
                              <a href="#">일괄등록 샘플파일.xls</a>
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
