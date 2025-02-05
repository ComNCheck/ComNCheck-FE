"use client";

import React, { useEffect, useState } from "react";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { getQuestion, deleteQuestion } from "@/apis/question";

export default function WritingCheck() {
  const router = useRouter();
  const [questions, setQuestions] = useState<
    { id: number; title: string; date: string; isAnswered: boolean }[]
  >([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestion();
        setQuestions(
          data.map((question, index) => ({
            cardId: index + 1,
            id: question.id,
            title: question.title,
            date: question.createdAt,
            isAnswered: question.answer !== null && question.answer.length > 0,
          }))
        );
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
