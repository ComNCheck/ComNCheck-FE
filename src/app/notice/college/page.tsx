"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";
import ContainerWrapper from "@/components/container/ContainerWrapper";

import NoticeCommonCard from "../Component/NoticeCommonCard";
import { useEffect, useState } from "react";
import { getMajorNotice } from "@/apis/notice";

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

// interface FormValues {
//   name: string;
//   date: string;
//   time: string;
//   location: string;
//   writing: string;
//   googleFormLink: string;
// }

export default function College() {
  const [notices, setNotices] = useState<any[]>([]);
  const [size, setSize] = useState<number>(8);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getMajorNotice(size, page);
        setNotices(data.content);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      }
    };
    fetchNotices();
  }, []);
  return (
    <ContainerWrapper>
      <ContentContainer>
        <Header>학부공지 확인하기</Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {notices.map((notice) => (
              <NoticeCommonCard key={notice.notice_id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
      </ContentContainer>
    </ContainerWrapper>
  );
}
