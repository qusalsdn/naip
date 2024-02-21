"use client";

import React, { useState } from "react";

import "../../public/style/schedule/schedule.css";

import Calendar from "@/components/schedule/scCalendar";
import ScheduleList from "@/components/schedule/scList";

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("일정표"); // 초기 활성 탭 설정

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div id="schedule">
      <div className="inner">
        <h2>사업일정</h2>

        <div className="scheduleFlex">
          <div className="tabMenu">
            <button
              type="button"
              className={activeTab === "일정표" ? "active" : ""}
              onClick={() => handleTabClick("일정표")}
            >
              사업 공고 일정표로 보기
            </button>
            <button
              type="button"
              className={activeTab === "목록" ? "active" : ""}
              onClick={() => handleTabClick("목록")}
            >
              사업 공고 목록으로 보기
            </button>
          </div>
          {activeTab === "일정표" && (
            <div className="des">
              <p className="receptionPrev">접수예정</p>
              <p className="receptionIng">접수진행중</p>
              <p className="receptionEnd">접수마감</p>
            </div>
          )}
        </div>

        {activeTab === "일정표" ? <Calendar /> : <ScheduleList />}
      </div>
    </div>
  );
}
