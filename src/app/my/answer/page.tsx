"use client";

import React, { useState, useEffect, useMemo } from "react";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { getQuestion, deleteQuestion } from "@/apis/question";
import { AllQuestionResponse } from "@/apis/question.type";

interface QuestionWithIsAnswered extends AllQuestionResponse {
  isAnswered: boolean;
}

export default function Answer() {
  const [isAnswered, setIsAnswered] = useState(false);
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionWithIsAnswered[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestion();
      setQuestions(
        fetchedQuestions.map((q) => ({
          ...q,
          isAnswered: q.answer !== null && q.answer.length > 0,
        }))
      );
    } catch (error) {
      console.error("질문 목록 불러오기 실패:", error);
    }
  };

  const handleCardClick = (id: number, isAnswered: boolean) => {
    if (isAnswered) {
      router.push(`/my/answer/edit?id=${id}`);
    } else {
      router.push(`/my/answer/write?id=${id}`);
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => q.isAnswered === isAnswered)
      .map(({ id, title, createdAt, isAnswered }) => ({
        id,
        title,
        date: createdAt,
        isAnswered,
      }));
  }, [questions, isAnswered]);

  const handleToggle = () => {
    setIsAnswered((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteQuestion(id);
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      } catch (error) {
        console.error("질문 삭제 실패:", error);
      }
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
