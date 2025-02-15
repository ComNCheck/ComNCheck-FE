"use client";
import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

const NoticeCommonCard = ({
  notice,
}: {
  notice: {
    notice_id: number;
    title: string;
    date: string;
    dDay: string;
  };
}) => {
  return (
    <Card>
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
