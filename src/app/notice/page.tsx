"use client";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import SlideHeader from "@/components/Header/SlideHeader";
import styled from "styled-components";
import { theme } from "../styles/theme";
import NoticeCard from "./Component/NoticeCard";
import NoticeCommonCard from "./Component/NoticeCommonCard";
import { FaPenToSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const mockNotices = [
  {
    id: 1,
    title: "2025학년도 1학기 개강총회",
    date: "2025.09.10(화)",
    dDay: "D-5",
    googleFormLink: "https://www.naver.com/",
  },
  {
    id: 2,
    title: "2025학년도 1학기 개강총회",
    date: "2025.09.10(화)",
    dDay: "D-5",
    googleFormLink: "https://www.naver.com/",
  },
  {
    id: 3,
    title: "2025학년도 1학기 개강총회",
    date: "2025.09.10(화)",
    dDay: "D-5",
    googleFormLink: "https://www.naver.com/",
  },
];

export default function Notice() {
  const router = useRouter();

  const handleWriteClick = () => {
    router.push("/notice/event/enroll");
  };
  const handleEventClick = () => {
    router.push("/notice/event");
  };
  const handleCollegeClick = () => {
    router.push("/notice/college");
  };
  const handleEmploymentClick = () => {
    router.push("/notice/employment");
  };

  return (
    <ContainerWrapper>
      <SlideHeader />
      <ContentContainer>
        <Header>
          <p onClick={handleEventClick}>과행사 공지 확인하기</p>
          <WritingBtn onClick={handleWriteClick}>
            글쓰기
            <FaPenToSquare />
          </WritingBtn>
        </Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {mockNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
        <Header onClick={handleCollegeClick}>학부 공지 확인하기</Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {mockNotices.map((notice) => (
              <NoticeCommonCard key={notice.id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
        <Header onClick={handleEmploymentClick}>취업정보 공지 확인하기</Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {mockNotices.map((notice) => (
              <NoticeCommonCard key={notice.id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
      </ContentContainer>
    </ContainerWrapper>
  );
}

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const WritingBtn = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 27rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ContentNoticeBox = styled.div`
  width: 100%;
  height: 10rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  overflow: hidden;
`;
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
