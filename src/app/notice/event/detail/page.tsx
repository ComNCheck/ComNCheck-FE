"use client";

import styled from "styled-components";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import { FaPenToSquare } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import FormWrapper from "@/components/container/FormWrapper";
import Image from "next/image";
import EventBtn from "../../Component/EventBtn";
import { useEffect, useState } from "react";
import { makeEventDetail } from "@/apis/notice.type";
import { inquireEvent } from "@/apis/notice";

const ScrollableContent = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 0 1rem;
  box-sizing: border-box;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomFormWrapper = styled(FormWrapper)`
  width: 100%;
  max-width: 100%; /* 최대 너비 제한 해제 */
  padding: 1rem 0; /* 상하 패딩만 유지 */
  box-sizing: border-box;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0; /* 좌우 마진 제거, 상하만 유지 */
`;

const SubHeader = styled.div`
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  width: 100%;
`;

const EventWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const DDayDiv = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  padding-right: 0; /* 패딩 제거 */
`;

const WritingBtn = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: 600;
  width: 100%; /* 꽉 찬 너비로 수정 */
  margin-bottom: 1rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 600px; // 카드뉴스 사이즈에 맞춰 바꾸기
  height: 400px; 
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: contain; /* 비율 유지하면서 지정된 크기 안에 맞춤 */
  width: 100%;
  height: 100%;
`;

const EventText = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  padding: 1rem 0; /* 좌우 패딩 제거 */
  white-space: pre-wrap;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;
const ImageSliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: auto;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 50%;
  z-index: 10;

  &:first-child {
    left: 10px;
  }

  &:last-child {
    right: 10px;
  }
`;

export default function EventDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [event, setEvent] = useState<makeEventDetail>({
    id: 0,
    eventName: "",
    date: "",
    time: { hour: 0, minute: 0, second: 0, nano: 0 },
    location: "",
    notice: "",
    googleFormLink: "",
  });

  const [dday, setDday] = useState<number | string>("");
  const [role, setRole] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ?(event.cardNewsImageUrls || []).length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) =>  (prev === (event.cardNewsImageUrls || []).length - 1 ? 0 : prev + 1));
  };
  
  useEffect(() => {
    if (id) {
      inquireEvent(parseInt(id))
        .then((data) => {
          console.log("이벤트 데이터:", data);
          setEvent(data);
        })
        .catch((error) => {
          console.log("조회 실패: ", error);
        });
    }
  }, [id]);

  useEffect(() => {
    const storedMemberData = localStorage.getItem("memberData");
    if (storedMemberData) {
      const memberData = JSON.parse(storedMemberData);
      setRole(memberData.role);
    }

    if (event?.date) {
      const today = new Date();
      const eventDate = new Date(event.date);

      if (isNaN(eventDate.getTime())) {
        console.log("잘못된 날짜 형식입니다:", event.date);
        setDday("날짜 오류");
      } else {
        const timeDiff = eventDate.getTime() - today.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysRemaining < 0) {
          setDday("종료");
        } else if (daysRemaining === 0) {
          setDday("D-day");
        } else {
          setDday(`D-${daysRemaining}`);
        }
      }
    }
  }, [event.date]);

  const handleWriteClick = () => {
    router.push(`/notice/event/modify?id=${event.id}`);
  };

  const handleNextClick = () => {
    if (event.googleFormLink) {
      window.open(event.googleFormLink, "_blank");
    } else {
      alert("구글폼 링크가 존재하지 않습니다.");
    }
  };

  return (
    <ContainerWrapper>
      <ScrollableContent>
        <Header>{event.eventName}</Header>
        <EventWrapper>
          <div>
            <SubHeader>📍일시 - {event.date} </SubHeader>
            <SubHeader>📍시간 - {`${event.time}`}</SubHeader>
            <SubHeader>📍장소 - {event.location} </SubHeader>
          </div>
          <DDayDiv>{dday}</DDayDiv>
        </EventWrapper>
        <WritingBtn
          onClick={handleWriteClick}
          style={{
            visibility:
            role === "ROLE_ADMIN" ||
              role === "ROLE_MAJOR_PRESIDENT" ||
              role === "ROLE_STUDENT_COUNCIL"
                ? "visible"
                : "hidden",
          }}
        >
          수정하기
          <FaPenToSquare />
        </WritingBtn>
        <CustomFormWrapper>
        {event?.cardNewsImageUrls && event.cardNewsImageUrls.length > 0 && (
          <ImageSliderContainer>
            {/* 이전 버튼 (이미지가 2장 이상일 때만 보이도록) */}
            {event.cardNewsImageUrls.length > 1 && (
              <SlideButton onClick={handlePrev}>〈</SlideButton>
            )}

            <ImageContainer>
              <StyledImage
                src={event.cardNewsImageUrls[currentIndex]}
                alt={`이벤트 이미지 ${currentIndex + 1}`}
                width={600}
                height={400}
              />
            </ImageContainer>

            {/* 다음 버튼 (이미지가 2장 이상일 때만 보이도록) */}
            {event.cardNewsImageUrls.length > 1 && (
              <SlideButton onClick={handleNext}>〉</SlideButton>
            )}
          </ImageSliderContainer>
        )}


          <EventText>{event.notice}</EventText>
        </CustomFormWrapper>
        <ButtonContainer>
          <EventBtn onClick={handleNextClick} text="구글폼 신청링크 바로가기" />
        </ButtonContainer>
      </ScrollableContent>
    </ContainerWrapper>
  );
}
