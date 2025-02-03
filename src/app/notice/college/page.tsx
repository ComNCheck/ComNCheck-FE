"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";
import TitleContainer from "@/components/setting/TitleContainer";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import NoticeCard from "../Component/NoticeCard";
import NoticeCommonCard from "../Component/NoticeCommonCard";
import SubHeader from "@/components/Header/SubHeader";

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
const ContentNoticeBox = styled.div`
  width: 100%;
  height: 30rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  overflow: hidden;
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
const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface FormValues {
  name: string;
  date: string;
  time: string;
  location: string;
  writing: string;
  googleFormLink: string;
}

export default function College() {
  return (
    <ContainerWrapper>
      <ContentContainer>
        <Header>학부공지 확인하기</Header>
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
