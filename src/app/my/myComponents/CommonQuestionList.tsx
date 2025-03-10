import React from "react";
import QuestionCard from "./QuestionCard";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import FormWrapper from "@/components/container/FormWrapper";

interface Question {
  majorQuestionId: number;
  title: string;
  date: string;
  isAnswered: boolean;
}

interface CommonQuestionListProps {
  questions: Question[];
  onDelete: (majorQuestionId: number) => void;
  onCardClick: (majorQuestionId: number, isAnswered: boolean) => void;
}

const CommonQuestionList: React.FC<CommonQuestionListProps> = ({
  questions,
  onDelete,
  onCardClick,
}) => {
  return (
    <ContainerWrapper>
      <FormWrapper>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.majorQuestionId}
            question={question}
            index={index}
            onDelete={onDelete}
            onCardClick={onCardClick}
          />
        ))}
      </FormWrapper>
    </ContainerWrapper>
  );
};

export default CommonQuestionList;
