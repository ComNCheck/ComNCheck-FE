"use client";
import React, { useState, useEffect, useRef, TouchEvent } from "react";
import styled, { keyframes, css } from "styled-components";
import { theme } from "@/app/styles/theme";
import { majorEventList } from "@/apis/notice.type";
import { getMajorEvent } from "@/apis/notice";
import bannerBackground from "../../../public/bannerBackground.png";

export default function SlideHeader() {
  const [eventNotices, setEventNotices] = useState<majorEventList | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"right" | "left">(
    "right"
  );
  const touchStart = useRef<number>(0);
  const touchEnd = useRef<number>(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const swipeDistance = touchStart.current - touchEnd.current;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // 왼쪽으로 스와이프
        setSlideDirection("left");
        setCurrentIndex((prev) =>
          prev === (eventNotices?.length || 0) - 1 ? 0 : prev + 1
        );
      } else {
        // 오른쪽으로 스와이프
        setSlideDirection("right");
        setCurrentIndex((prev) =>
          prev === 0 ? (eventNotices?.length || 0) - 1 : prev - 1
        );
      }
    }
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getMajorEvent();
        setEventNotices(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("이벤트 데이터를 가져오는데 실패했습니다.", error);
      }
    };
    fetchEvent();
  }, []);

  useEffect(() => {
    if (eventNotices && eventNotices.length > 1) {
      const timer = setInterval(() => {
        setSlideDirection("left");
        setCurrentIndex((prev) =>
          prev === eventNotices.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [eventNotices]);

  if (!eventNotices || eventNotices.length === 0) {
    return null;
  }

  const currentEvent = eventNotices[currentIndex];

  return (
    <Container>
      <CardContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        direction={slideDirection}
      >
        <Card>
          <CardContent>
            <EventTitle>{currentEvent.eventName}</EventTitle>
            <EventDate>{`${currentEvent.date} ${currentEvent.time}`}</EventDate>
            <ApplyButton
              onClick={() => window.open(currentEvent.googleFormLink, "_blank")}
            >
              신청하기
            </ApplyButton>
          </CardContent>
          <CardImageContainer>
            {currentEvent.firstImageUrl && (
              <CardImage
                src={currentEvent.firstImageUrl}
                alt={currentEvent.eventName}
              />
            )}
          </CardImageContainer>
        </Card>
      </CardContainer>

      <Indicators>
        {eventNotices.map((_, index) => (
          <Indicator
            key={index}
            $active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Indicators>
    </Container>
  );
}

const slideRightAnimation = keyframes`
  from {
    transform: translateX(-100%) rotateY(10deg);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(0);
    opacity: 1;
  }
`;

const slideLeftAnimation = keyframes`
  from {
    transform: translateX(100%) rotateY(-10deg);
    opacity: 0;
  }
  to {
    transform: translateX(0) rotateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

const CardContainer = styled.div<{ direction: "right" | "left" }>`
  width: 23rem;
  perspective: 1000px;
  display: flex;
  justify-content: center;

  animation: ${(props) =>
    props.direction === "right"
      ? css`
          ${slideRightAnimation} 0.5s ease-out
        `
      : css`
          ${slideLeftAnimation} 0.5s ease-out
        `};
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-radius: 1rem;
  // background: white;
  background: url(${bannerBackground.src});
  // border: red solid 1px;
  // background: #0077ff 90%;
  // box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 15px rgba(55, 109, 255, 0.2);
  transition: transform 0.3s ease;
  width: 327px;
  height: 142px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
`;

const EventTitle = styled.h1`
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
`;

const EventDate = styled.p`
  color: white;
  font-size: 0.9rem;
  margin: 0;
`;

const ApplyButton = styled.button`
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  border: none;
  background: #3a3a3a;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: fit-content;

  &:hover {
    background: ${theme.colors.primary}dd;
  }
`;

const CardImageContainer = styled.div`
  width: 7rem;
  height: 7rem;
  overflow: hidden;
  border-radius: 0.5rem;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Indicators = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Indicator = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? theme.colors.primary : "#E0E0E0"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
