"use client";

import React from "react";
import AddQuestionCard from "../myComponents/AddQuestionCard";
import TitleContainer from "@/components/setting/TitleContainer";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import { useRouter } from "next/navigation";
import { postQuestion } from "@/apis/question";
import { QuestionRequest } from "@/apis/question.type";

export default function Question() {
  const router = useRouter();

  const handleSubmit = async (questionData: QuestionRequest) => {
    try {
      await postQuestion(questionData);
      router.back();
    } catch (error) {
      console.error("에러 발생:", error);
      alert("질문을 등록하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="질문하기"
        description="학과와 관련된 궁금한 점을 마음껏 질문해주세요!"
      />
      <AddQuestionCard onSubmit={handleSubmit} submitButtonText="질문" />
    </ContainerWrapper>
  );
}
