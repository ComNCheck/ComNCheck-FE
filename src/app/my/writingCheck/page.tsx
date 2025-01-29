"use client";

import React from "react";
import styled from "styled-components";
import SubHeader from "@/components/Header/SubHeader";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";

export default function WritingCheck() {
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

  const handleDelete = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };
  const handleCardClick = (id: number, isAnswered: boolean) => {
    if (isAnswered) {
      router.push(`/my/writingCheck/check?id=${id}`);
    } else {
      router.push(`/my/writingCheck/edit?id=${id}`);
    }
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="내가 쓴 글"
        description={
          <>
            내가 작성한 질문들을 한눈에 모아봤어요
            <br />
            답변이 완료된 질문을 수정할 수 없어요.
          </>
        }
      />
      <CommonQuestionList
        questions={questions}
        onDelete={handleDelete}
        onCardClick={handleCardClick}
      />
    </ContainerWrapper>
  );
}
