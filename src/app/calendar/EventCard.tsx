import React from "react";
import styled from "styled-components";

// CalendarEvent 타입을 import 하거나 아래처럼 정의
interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

interface EventCardProps {
  event: CalendarEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const dateObj = new Date(event.date);

  return (
    <CardWrapper>
      <ContentWapper>
        <Title>{event.title}</Title>
        <ul>
          <li>
            {dateObj.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "short",
            })}
          </li>
          <li>[{event.location}]에서 만나요</li>
        </ul>
      </ContentWapper>

      <Button>{event.buttonText}</Button>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 18px;
  border: 3px solid #f3f3f3;
  padding: 1.5rem;
  margin-bottom: 100px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  width: 100%;
`;
const ContentWapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  margin-top: 1.2rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  float: right;
`;
