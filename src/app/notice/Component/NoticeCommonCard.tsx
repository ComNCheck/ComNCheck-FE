"use client";
import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { useRouter } from "next/navigation";

const NoticeCommonCard = ({
  notice,
}: {
  notice: {
    notice_id: number;
    title: string;
    date: string;
    link: string;
  };
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (notice.link && notice.link.startsWith("http")) {
      window.open(notice.link, "_blank");
    } else if (notice.link) {
      router.push(notice.link);
    } else if (notice.notice_id) {
      const path = window.location.pathname;
      if (path.includes("/notice/college")) {
        router.push(`/notice/college/${notice.notice_id}`);
      } else if (path.includes("/notice/employment")) {
        router.push(`/notice/employment/${notice.notice_id}`);
      } else {
        router.push(`/notice/detail/${notice.notice_id}`);
      }
    }
  };

  return (
    <Card onClick={handleClick}>
      <CardContent>
        <Info>
          <Title>{notice.title}</Title>
          <Date>{notice.date}</Date>
        </Info>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${theme.colors.mutedText};
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const Date = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.mutedText};
`;

export default NoticeCommonCard;
