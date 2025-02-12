"use client";

import React, { useEffect, useState, useMemo } from "react";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { getQuestion, deleteQuestion } from "@/apis/question";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import { AllQuestionResponse } from "@/apis/question.type";

export default function WritingCheck() {
  const router = useRouter();
  const [questions, setQuestions] = useState<AllQuestionResponse[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestion();

        const formattedQuestions = fetchedQuestions.map((q) => ({
          ...q,
          // answer가 존재하는 경우에만 배열로 변환
          answer: q.answer ? [q.answer] : null,
        })) as AllQuestionResponse[];

        console.log("변환된 질문 목록:", formattedQuestions);
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error("질문 목록 불러오기 실패:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteQuestion(id);
        setQuestions((prev) => prev.filter((q) => q.id !== id));
        alert("질문이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("질문 삭제 실패:", error);
        alert("질문 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleCardClick = (id: number, isAnswered: boolean) => {
    if (isAnswered) {
      router.push(`/my/writingCheck/check?id=${id}`);
    } else {
      router.push(`/my/writingCheck/edit?id=${id}`);
    }
  };

  const handleToggle = () => {
    setIsAnswered((prev) => !prev);
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        const hasAnswer = q.answer !== null && q.answer.length > 0;
        return isAnswered === hasAnswer;
      })
      .map((q) => ({
        id: q.id,
        title: q.title,
        date: q.createdAt,
        isAnswered: q.answer !== null && q.answer.length > 0,
      }));
  }, [questions, isAnswered]);

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
