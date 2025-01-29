"use client";

import React, { useState, useMemo } from "react";
import SubHeader from "@/components/Header/SubHeader";
import styled from "styled-components";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";

export default function Answer() {
  const [isAnswered, setIsAnswered] = useState(false);
  const router = useRouter();
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

  const handleCardClick = (id: number, isAnswered: boolean) => {
    if (isAnswered) {
      router.push(`/my/answer/edit?id=${id}`);
    } else {
      router.push(`/my/answer/write?id=${id}`);
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => q.isAnswered === isAnswered);
  }, [questions, isAnswered]);

  const handleToggle = () => {
    setIsAnswered((prev) => !prev);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="답변하기"
        description={
          <>
            질문에 대한 답변을 작성하고
            <br />
            완료 버튼을 눌러주세요.
          </>
        }
      />
      <IsAnswerToggle
        isAnswered={isAnswered}
        onToggle={handleToggle}
        labels={{ inactive: "답변 예정", active: "답변 완료" }}
      />

      <CommonQuestionList
        questions={filteredQuestions}
        onDelete={handleDelete}
        onCardClick={handleCardClick}
      />
    </ContainerWrapper>
  );
}
