"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";
import ContainerWrapper from "@/components/container/ContainerWrapper";

import NoticeCommonCard from "../Component/NoticeCommonCard";
import { useEffect, useState } from "react";
import { getMajorNotice } from "@/apis/notice";
import { majorNoticeList } from "@/apis/notice.type";
import ToggleBtn from "@/components/button/toggleBtn";

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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.isActive ? theme.colors.primary : "transparent"};
  color: ${(props) => (props.isActive ? "white" : theme.colors.text)};
  border: ${(props) =>
    props.isActive ? "none" : `1px solid ${theme.colors.mutedText}`};
  font-weight: ${(props) => (props.isActive ? "700" : "400")};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? theme.colors.primary : "#f5f5f5"};
  }
`;

const ArrowButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: transparent;
  color: ${theme.colors.text};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:disabled {
    color: ${theme.colors.mutedText};
    cursor: not-allowed;
  }
`;

export default function College() {
  const [notices, setNotices] = useState<majorNoticeList | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const size = 8;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getMajorNotice(size, currentPage);
        setNotices(data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      }
    };
    fetchNotices();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 3개만 표시하는 페이지네이션으로 변경
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 3; // 한 번에 보이는 페이지 버튼 수를 3개로 제한

    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    const adjustedStartPage =
      endPage - startPage + 1 < maxVisiblePages
        ? Math.max(1, endPage - maxVisiblePages + 1)
        : startPage;

    for (let i = adjustedStartPage; i <= endPage; i++) {
      buttons.push(
        <PageButton
          key={i}
          isActive={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageButton>
      );
    }

    return buttons;
  };

  return (
    <ContainerWrapper>
      <ContentContainer>
        <Header>
          학부공지 확인하기{" "}
          <ToggleBtn keyName="alarmMajorNotice" initialState={false} />
        </Header>

        <ContentNoticeBox>
          <ScrollContainer>
            {notices?.content?.map((notice) => (
              <NoticeCommonCard key={notice.notice_id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>

        {/* 페이지네이션 */}
        {totalPages > 0 && (
          <PaginationContainer>
            <ArrowButton
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            >
              &lt;
            </ArrowButton>

            {renderPaginationButtons()}

            <ArrowButton
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              &gt;
            </ArrowButton>
          </PaginationContainer>
        )}
      </ContentContainer>
    </ContainerWrapper>
  );
}
