"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import QuestionCard from "./QuestionCard";
import SubHeader from "@/components/SubHeader";

export default function WritingCheck() {
  const questions = [
    {
      id: 1,
      title: "어쩌고 저쩌고 이건 ?",
      date: "2025.01.10",
      isAnswered: true,
    },
    {
      id: 2,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 3,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 4,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 5,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },

    {
      id: 6,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 7,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 8,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 9,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 10,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
    {
      id: 11,
      title: "어쩌고 저쩌고 이러쿵 저러쿵 이건 어떻게 하나요??????",
      date: "2025.01.10",
      isAnswered: false,
    },
  ];

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
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
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
    height: 40rem;
  }
`;
