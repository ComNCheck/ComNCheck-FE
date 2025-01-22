// QuestionCard.tsx
import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

const QuestionCard = ({
  question,
}: {
  question: { id: number; title: string; date: string; isAnswered: boolean };
}) => {
  return (
    <Card>
      <QuestionInfo>
        <QuestionTitle>
          {question.title.length > 18
            ? `${question.title.substring(0, 18)}...`
            : question.title}
        </QuestionTitle>
        <QuestionDate>{question.date}</QuestionDate>
      </QuestionInfo>
      <AnswerStatus isAnswered={question.isAnswered}>
        {question.isAnswered ? "답변완료" : "답변예정"}
      </AnswerStatus>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid ${theme.colors.mutedText};
`;

const QuestionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QuestionDate = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.mutedText};
`;

const AnswerStatus = styled.span<{ isAnswered: boolean }>`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${({ isAnswered }) =>
    isAnswered ? theme.colors.success : theme.colors.warning};
`;

export default QuestionCard;
