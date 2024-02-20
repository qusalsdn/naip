/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import Timeline, { TimelineHeaders, SidebarHeader, DateHeader } from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import "../../../public/style/mypage/milestone.css";

interface DataType {
  list_id: number;
  search: string;
  work: string;
  number: string;
  URL: string;
  division: string;
  division_type: string;
  name: string;
  announcement_agency: string;
  demand_agency: string;
  contract: string;
  input_date: string;
  register_date: string;
  end_date: string;
  qualified_date: string;
  price: string;
  terminationDate: string;
  bookMarkCheck: boolean;
}

interface PropsType {
  data: DataType[] | undefined; // data 타입을 배열 또는 undefined로 지정
}

function Milestone({ data }: PropsType) {
  if (!data) {
    data = [];
  }

  if (data.length === 0) {
    // 데이터가 없을 때 보여줄 내용
    return (
      <div className="no-data-message">
        <p>즐겨찾기하신 공고가 없습니다</p>
        <p>공고 검색 페이지에서 공고를 확인해 보세요!</p>
        <Link href="/searchpage">공고 검색 페이지 바로가기</Link>
      </div>
    );
  }

  const groupsTemp = data.map((item: any, index: number) => ({
    id: item.list_id,
    title: `나의 관심 공고 ${index + 1}`,
  }));

  const itemsTemp = data.map((item: any) => ({
    id: item.list_id,
    group: item.list_id,
    title: item.name,
    canMove: false,
    start_time: moment(item.input_date),
    end_time: moment(item.qualified_date),
    itemProps: {
      /* "data-custom-attribute": "Random content",
        "aria-hidden": true,
        onDoubleClick: () => {
          console.log("You clicked double!");
        },
        className: "first", */
      style: {
        background: "#76c3c5",
      },
    },
  }));

  const [groups, setGroups] = useState<any>(groupsTemp);
  const [items, setItems] = useState<any>(itemsTemp);

  const [labelFormat, setLabelFormat] = useState<any>("D일");
  const [visibleTimeStart, setVisibleTimeStart] = useState<any>(
    moment().startOf("month").toDate().getTime()
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState<any>(
    moment().endOf("month").toDate().getTime()
  );

  const handleItemMove = (itemId: any, dragTime: any, newGroupOrder: any) => {
    const newItems = items.map((item: any) =>
      item.id === itemId
        ? {
            ...item,
            start_time: dragTime,
            end_time: moment(dragTime).add(item.end_time.diff(item.start_time)),
          }
        : item
    );
    setItems(newItems);
  };

  const handleItemResize = (itemId: any, time: any, edge: string) => {
    const newItems = items.map((item: any) => {
      if (item.id === itemId) {
        if (edge === "left") {
          return { ...item, start_time: time };
        } else {
          return { ...item, end_time: time };
        }
      }
      return item;
    });
    setItems(newItems);
  };

  const handleTimeChange = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
    updateScrollCanvas: (start: number, end: number) => void
  ) => {
    setVisibleTimeStart(visibleTimeStart);
    setVisibleTimeEnd(visibleTimeEnd);

    const zoomLevel = visibleTimeEnd - visibleTimeStart;
    let newLabelFormat;
    console.log(zoomLevel);

    // 줌 레벨에 따라 labelFormat 결정
    if (zoomLevel > 2700000000) {
      // 1년 이상
      newLabelFormat = "Y년 M월";
    } else if (zoomLevel > 235000000) {
      // 1일 이상
      newLabelFormat = "D일";
    } else if (zoomLevel > 3600000) {
      // 1시간 이상
      newLabelFormat = "HH시";
    } else {
      newLabelFormat = "HH:mm";
    }

    if (newLabelFormat !== labelFormat) {
      setLabelFormat(newLabelFormat);
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    }
  };

  return (
    <div className="timeline-container">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment().startOf("month").toDate()}
        defaultTimeEnd={moment().endOf("month").toDate()}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        lineHeight={70}
        className="custom-timeline"
        canResize={true}
        onItemMove={handleItemMove}
        onItemResize={handleItemResize}
        onTimeChange={handleTimeChange}
        timeSteps={{
          second: 0,
          minute: 0,
          hour: 1,
          day: 1,
          month: 1,
          year: 1,
        }}
        // maxZoom={moment.duration(1, "year").asMilliseconds()} // 최대 연도별로 설정
        maxZoom={moment.duration(31, "days").asMilliseconds()}
        minZoom={moment.duration(1, "day").asMilliseconds()} // 최소 일별로 설정
      >
        <TimelineHeaders className="mouseEvent">
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div {...getRootProps()} className="sidebar_title">
                  관심 공고 순번
                </div>
              );
            }}
          </SidebarHeader>
          {labelFormat === "Y년 M월" && (
            <DateHeader
              unit="primaryHeader"
              labelFormat={`회원님께서 즐겨찾기하신 공고의 Y년 일정입니다.`}
              height={60}
              className="primary"
            />
          )}

          {labelFormat === "D일" && (
            <DateHeader
              unit="primaryHeader"
              labelFormat={`회원님께서 즐겨찾기하신 공고의 Y년 M월 일정입니다.`}
              height={60}
              className="primary"
            />
          )}

          {labelFormat === "HH시" && (
            <DateHeader
              unit="primaryHeader"
              labelFormat={`회원님께서 즐겨찾기하신 공고의 Y년 M월 D일 일정입니다.`}
              height={60}
              className="primary"
            />
          )}
          <DateHeader labelFormat={labelFormat || "HH:mm"} height={50} className="dateheader_day" />
        </TimelineHeaders>
      </Timeline>
    </div>
  );
}

export default Milestone;
