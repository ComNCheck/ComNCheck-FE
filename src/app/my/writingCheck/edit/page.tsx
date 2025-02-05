"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { getQuestion, UpdateQuestion } from "@/apis/question";
import { QuestionRequest, AllQuestionResponse } from "@/apis/question.type";
import UpdateQuestionCard from "../../myComponents/UpdateQuestionCard";

export default function Edit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [question, setQuestion] = useState<AllQuestionResponse | null>(null);

  useEffect(() => {
    if (id) {
      fetchQuestion(parseInt(id));
    }
  }, [id]);

  const fetchQuestion = async (questionId: number) => {
    try {
      const questions = await getQuestion();
      const currentQuestion = questions.find((q) => q.id === questionId);
      if (currentQuestion) {
        setQuestion(currentQuestion);
      } else {
        console.error("질문을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("질문 불러오기 실패:", error);
    }
  };

  const handleSubmit = async (questionData: QuestionRequest) => {
    if (!question) return;
    try {
      await UpdateQuestion(
        question.id,
        questionData.shared,
        questionData.title,
        questionData.content
      );
      alert("질문이 성공적으로 수정되었습니다.");
      router.back();
    } catch (error) {
      console.error("질문 수정 실패:", error);
      alert("질문 수정에 실패했습니다.");
    }
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="내가 쓴 글 수정하기"
        description={
          <>
            내가 작성한 질문들을 한눈에 모아봤어요
            <br />
            답변이 완료된 질문을 수정할 수 없어요.
          </>
        }
      />
      {question && (
        <UpdateQuestionCard
          onSubmit={handleSubmit}
          submitButtonText="수정"
          initialData={{
            title: question.title,
            content: question.content,
            shared: question.shared,
          }}
        />
      )}
    </ContainerWrapper>
  );
}
