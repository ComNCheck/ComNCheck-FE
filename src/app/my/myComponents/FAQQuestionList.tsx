import React from "react";
import QuestionCard from "./QuestionCard";
import FormWrapper from "@/components/container/FormWrapper";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

interface Question {
  majorQuestionId: number;
  title: string;
  date: string;
  answer: string;
  isAnswered: boolean;
}

interface CommonQuestionListProps {
  questions: Question[];
  onDelete: (id: number) => void;
  onCardClick: (id: number, isAnswered: boolean) => void;
  canDelete: boolean;
}

const FAQQuestionList: React.FC<CommonQuestionListProps> = ({
  questions,
  onDelete,
  onCardClick,
  canDelete,
}) => {
  return (
    <Wrapper>
      <FormWrapper>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.majorQuestionId}
            question={question}
            index={index}
            onDelete={onDelete}
            onCardClick={onCardClick}
            canDelete={canDelete}
          />
        ))}
      </FormWrapper>
    </Wrapper>
  );
};

export default FAQQuestionList;
const Wrapper = styled.div`
  padding: 0rem 0.5rem 0.5rem 0.5rem;
  height: 80vh;
  //height: calc(100vh - 11rem); //test
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: ${theme.colors.background};
  position: relative;
  overflow-y: auto;
  overflow: hidden;
`;
