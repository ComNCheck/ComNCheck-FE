"use client";

import styled from "styled-components";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import { FaPenToSquare } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import FormWrapper from "@/components/container/FormWrapper";
import Image from "next/image";
//import imageSrc from "../../../../../public/logo.png";
import EventBtn from "../../Component/EventBtn";
import { useEffect, useState } from "react";
import { makeEventDetail } from "@/apis/notice.type";
import { inquireEvent } from "@/apis/notice";

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem;
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
  padding-right: 1rem;
`;
const WritingBtn = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: 600;
  width: 90%;
  margin-bottom: 1rem;
`;
const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
`;

const EventText = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  padding: 1rem;
  white-space: pre-wrap;
`;
export default function EventDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [event, setEvent] = useState<makeEventDetail>({
    id: 0,
    eventName: "",
    date: "",
    time: { hour: 0, minute: 0, second: 0, nano: 0 }, // 시간 타입에 맞춰 초기값 설정
    location: "",
    notice: "",
    googleFormLink: "",
  });

  const [dday, setDday] = useState<number | string>("");
  const [role, setRole] = useState<string | null>(null);
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
      setRole(memberData.role); // role 저장
    }

    if (event?.date) {
      const today = new Date();
      const eventDate = new Date(event.date); // 이벤트 날짜를 Date 객체로 변환

      // 유효한 날짜인지 확인
      if (isNaN(eventDate.getTime())) {
        console.log("잘못된 날짜 형식입니다:", event.date);
        setDday("날짜 오류"); // 날짜 오류 표시
      } else {
        // 현재 날짜와 이벤트 날짜 비교하여 DDay 계산
        const timeDiff = eventDate.getTime() - today.getTime();
        const daysRemaining = Math.floor(timeDiff / (1000 * 3600 * 24)); // 밀리초를 일로 변환

        if (daysRemaining < 0) {
          // 이미 지난 이벤트일 경우 '종료'로 표시
          setDday("종료");
        } else if (daysRemaining === 0) {
          // D-Day가 오늘인 경우
          setDday("D-Day");
        } else {
          // 아직 남은 경우 D-Day 표시
          setDday(`D-${daysRemaining}`);
        }
      }
    }
  }, []);

  const handleWriteClick = () => {
    router.push("/notice/event/enroll");
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
            role === "ROLE_MAJOR_PRESIDENT" || role === "ROLE_GRADUATE_STUDENT"
              ? "visible"
              : "hidden",
        }}
      >
        수정하기
        <FaPenToSquare />
      </WritingBtn>
      <FormWrapper>
        {event?.cardNewsImageUrls && event.cardNewsImageUrls.length > 0 && (
          <ImageContainer>
            <StyledImage
              src={event.cardNewsImageUrls[0]} // 첫 번째 이미지 사용
              alt="이벤트 이미지"
              width={600}
              height={400} // 이미지 크기 설정
            />
          </ImageContainer>
        )}
        <EventText>{event.notice}</EventText>
      </FormWrapper>
      <EventBtn onClick={handleNextClick} text="구글폼 신청링크 바로가기" />
    </ContainerWrapper>
  );
}
