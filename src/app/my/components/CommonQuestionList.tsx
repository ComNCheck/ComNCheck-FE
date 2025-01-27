import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import QuestionCard from "./QuestionCard";

interface Question {
  id: number;
  title: string;
  date: string;
  answere: string;
  isAnswered: boolean;
}

interface CommonQuestionListProps {
  questions: Question[];
  onDelete: (id: number) => void;
  onCardClick: (id: number, isAnswered: boolean) => void;
}

const CommonQuestionList: React.FC<CommonQuestionListProps> = ({
  questions,
  onDelete,
  onCardClick,
}) => {
  return (
    <FormWrapper>
      <Form>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onDelete={onDelete}
            onCardClick={onCardClick}
          />
        ))}
      </Form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  width: 95%;
  height: 25rem;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (min-width: 200px) and (max-width: 480px) {
    height: 35rem;
  }
`;

export default CommonQuestionList;
