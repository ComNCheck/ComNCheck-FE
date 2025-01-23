"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import SubHeader from "@/components/SubHeader";
import QuestionCard from "./QuestionCard";

export default function WritingCheck() {
  const [questions, setQuestions] = React.useState(
    [
      {
        id: 1,
        title: "어쩌고 저쩌고 이건 ?",
        date: "2025.01.10",
        answere:
          "저번 구글폼 을 통해 참여자를 받았었는데,예산문제로 더이상 추가 모집은 없습니다. 감사합니다.",
      },
      {
        id: 2,
        title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
        date: "2025.01.10",
        answere: "",
      },
      {
        id: 3,
        title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
        date: "2025.01.10",
        answere: "",
      },
    ].map((question) => ({
      ...question,
      isAnswered: !!question.answere,
    }))
  );

  const handleDelete = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  return (
    <Container>
      <SubHeader
        title="내가 쓴 글"
        description={
          <>
            내가 작성한 질문들을 한눈에 모아봤어요
            <br />
            답변이 완료된 질문을 수정할 수 없어요.
          </>
        }
      />
      <FormWrapper>
        <Form>
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </Form>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;
  top: 12rem;
`;

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
