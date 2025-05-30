"use client";

import React, { useEffect, useState } from "react";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { Calendar } from "@/components/ui/calendar";
import styled from "styled-components";
import EventCard from "./EventCard";
import { getMajorEvent, getAnotherMajorEvent } from "@/apis/notice";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // 데이터 불러오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [majorEvents, anotherEvents] = await Promise.all([
          getMajorEvent(),
          getAnotherMajorEvent(),
        ]);

        const parseEvent = (item: any): CalendarEvent => ({
          id: item.id,
          title: item.eventName || item.title || "행사",
          date: item.date, // string 그대로 저장
          location: item.location || item.place || "",
          buttonText: "신청하기",
        });

        const allEvents: CalendarEvent[] = [
          ...(majorEvents || []).map(parseEvent),
          ...(anotherEvents || []).map(parseEvent),
        ];

        setEvents(allEvents);
      } catch (e) {
        console.error("행사 데이터 불러오기 실패", e);
      }
    };
    fetchEvents();
  }, []);

  // 해당 날짜에 행사가 있는지 확인
  const eventOnSelectedDate = events.find(
    (e) =>
      selectedDate &&
      new Date(e.date).getFullYear() === selectedDate.getFullYear() &&
      new Date(e.date).getMonth() === selectedDate.getMonth() &&
      new Date(e.date).getDate() === selectedDate.getDate()
  );

  // 캘린더에 표시할 날짜에 행사 있는지 확인
  function isEventDay(date: Date) {
    return events.some(
      (e) =>
        new Date(e.date).getFullYear() === date.getFullYear() &&
        new Date(e.date).getMonth() === date.getMonth() &&
        new Date(e.date).getDate() === date.getDate()
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
          month={new Date(2025, 4, 1)}
          modifiers={{
            event: isEventDay,
          }}
          modifiersClassNames={{
            event: "event-day",
          }}
        />
      </StyledCalendarWrap>
      <Divider />
      {eventOnSelectedDate && <EventCard event={eventOnSelectedDate} />}
      <CalendarStyle />
    </ContainerWrapper>
  );
}

// 캘린더 스타일 커스텀(행사날짜 파란색)
const CalendarStyle = styled.style`
  /* 행사 있는 날짜만 파란 배경 */
  .event-day {
    background: #e6f0ff !important;
    color: #357ae1 !important;
    border-radius: 50% !important;
    font-weight: 700;
  }
  /* 행사 없는 날짜는 흰 배경 */
  .rdp-day {
    background: #fff !important;
    color: #222 !important;
    border-radius: 50% !important;
  }
  /* 선택된 날짜는 파란 테두리 */
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
