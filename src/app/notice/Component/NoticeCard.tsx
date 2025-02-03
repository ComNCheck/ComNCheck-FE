"use client";
import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { useRouter } from "next/navigation";

const NoticeCard = ({
  notice,
}: {
  notice: {
    id: number;
    title: string;
    date: string;
    dDay: string;
    googleFormLink: string;
  };
}) => {
  const router = useRouter();
  const handleApplyClick = () => {
    if (notice.googleFormLink) {
      window.open(notice.googleFormLink, "_blank");
    } else {
      alert("구글폼 링크가 존재하지 않습니다.");
    }
  };
  const handleCardClick = () => {
    router.push("/notice/event/detail");
  };

  return (
    <Card onClick={handleCardClick}>
      <CardContent>
        <Info>
          <Title>{notice.title}</Title>
          <Date>{notice.date}</Date>
        </Info>
        <DDay>{notice.dDay}</DDay>
        <ApplyButton onClick={handleApplyClick}>구글폼 신청</ApplyButton>
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
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
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

const DDay = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${theme.colors.primary};
`;

const ApplyButton = styled.button`
  background-color: white;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 5px;
  padding: 0.5rem 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

export default NoticeCard;
