"use client";

import React, { useState } from "react";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { Calendar } from "@/components/ui/calendar"; // shadcn Calendar
import styled from "styled-components";
import EventCard from "./EventCard";

// 행사 데이터 (날짜는 Date 객체로 관리)
const events = [
  {
    id: 1,
    title: "2025학년도 1학기 개강총회",
    date: new Date(2025, 8, 10), // 2025-09-10 (월은 0부터 시작)
    location: "[미쳐버린 파닭]에서 만나요",
    buttonText: "신청하기",
  },
  {
    id: 2,
    title: "5월 행사 예시",
    date: new Date(2025, 4, 11), // 2025-05-11
    location: "온라인",
    buttonText: "신청하기",
  },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // 해당 날짜에 행사가 있는지 확인
  const eventOnSelectedDate = events.find(
    (e) =>
      selectedDate &&
      e.date.getFullYear() === selectedDate.getFullYear() &&
      e.date.getMonth() === selectedDate.getMonth() &&
      e.date.getDate() === selectedDate.getDate()
  );

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    return events.some(
      (e) =>
        e.date.getFullYear() === date.getFullYear() &&
        e.date.getMonth() === date.getMonth() &&
        e.date.getDate() === date.getDate()
    );
  }

  return (
    <ContainerWrapper>
      <TitleContainer
        title="행사 한눈에 보기"
        description={<>아래 달력에서 원하는 날짜를 클릭하고 행사를 확인해요</>}
      />
      <StyledCalendarWrap>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={new Date(2025, 4, 1)} // 2025년 5월
          modifiers={{
            event: isEventDay,
          }}
          modifiersClassNames={{
            event: "event-day",
          }}
        />
      </StyledCalendarWrap>
      <Divider />
      {eventOnSelectedDate && (
        <EventCard
          title={eventOnSelectedDate.title}
          date={eventOnSelectedDate.date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          })}
          location={eventOnSelectedDate.location}
          buttonText={eventOnSelectedDate.buttonText}
        />
      )}
      <CalendarStyle />
    </ContainerWrapper>
  );
}

// 캘린더 스타일 커스텀(행사날짜 파란색)
const CalendarStyle = styled.style`
  .event-day {
    background: #e6f0ff !important;
    color: #357ae1 !important;
    border-radius: 50% !important;
    font-weight: 700;
  }
  .rdp-day_selected {
    border: 2px solid #357ae1 !important;
    background: #fff !important;
    color: #357ae1 !important;
  }
`;

const StyledCalendarWrap = styled.div`
  margin: 2rem 0 1rem 0;
  .rdp {
    --rdp-accent-color: #357ae1;
    --rdp-background-color: #e6f0ff;
    font-size: 1.1rem;
  }
`;

const Divider = styled.hr`
  margin: 2rem 0 1rem 0;
  border: none;
  border-top: 1px solid #eee;
`;
