"use client";

import React, { useState, useEffect, useMemo } from "react";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { deleteQuestion, getQuestionAllList } from "../../../apis/question";
import { AllQuestionResponse } from "../../../apis/question.type";

export default function Answer() {
  const [isAnswered, setIsAnswered] = useState(false);
  const router = useRouter();
  const [questions, setQuestions] = useState<AllQuestionResponse[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const fetchedQuestions = await getQuestionAllList();
      setQuestions(fetchedQuestions);
      console.log("불러온 질문 목록:", fetchedQuestions);
    } catch (error) {
      console.error("질문 목록 불러오기 실패:", error);
    }
  };

  const handleCardClick = ($id: number, $isAnswered: boolean) => {
    if ($isAnswered) {
      router.push(`/my/answer/edit?id=${$id}`);
    } else {
      router.push(`/my/answer/write?id=${$id}`);
    }
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        const hasAnswer =
          q.answer !== null && Array.isArray(q.answer) && q.answer.length > 0;
        return isAnswered ? hasAnswer : !hasAnswer;
      })
      .map((q) => ({
        id: q.id,
        title: q.title,
        date: q.createdAt,
        isAnswered:
          q.answer !== null && Array.isArray(q.answer) && q.answer.length > 0,
      }));
  }, [questions, isAnswered]);

  const handleToggle = () => {
    setIsAnswered((prev) => !prev);
  };

  const handleDelete = async ($id: number) => {
    // 해당 질문 찾기
    const question = questions.find((q) => q.id === $id);

    // 답변이 없는 경우 삭제 불가
    if (
      !question?.answer ||
      !Array.isArray(question.answer) ||
      question.answer.length === 0
    ) {
      alert("답변이 완료된 글만 삭제할 수 있습니다.");
      return;
    }

    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteQuestion($id);
        setQuestions((prev) => prev.filter((q) => q.id !== $id));
        alert("삭제되었습니다.");
      } catch (error) {
        console.error("질문 삭제 실패:", error);
        alert("삭제에 실패했습니다.");
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
