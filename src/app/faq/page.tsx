"use client";

import React, { useState, useEffect } from "react";
import CommonQuestionList from "../my/myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { getFAQ } from "@/apis/question";
import { AllQuestionResponse, AnswerType } from "@/apis/question.type";

export default function FAQ() {
  const router = useRouter();
  const [questions, setQuestions] = useState<AllQuestionResponse[]>([]);

  useEffect(() => {
    fetchFAQ();
  }, []);

  const fetchFAQ = async () => {
    try {
      const faqData = await getFAQ();
      setQuestions(
        faqData.filter((q) => q.shared && q.answer && q.answer.length > 0)
      );
    } catch (error) {
      console.error("FAQ 데이터 가져오기 실패:", error);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleCardClick = (id: number, isAnswered: boolean) => {
    if (isAnswered) {
      router.push(`/faq/check?id=${id}`);
    }
  };

  const formattedQuestions = questions.map((q) => {
    const answer: AnswerType | null =
      q.answer && q.answer.length > 0 ? q.answer[0] : null;
    return {
      id: q.id,
      title: q.title,
      date: new Date(q.createdAt).toLocaleDateString("ko-KR"),
      answere: answer ? answer.content : "",
      isAnswered: !!answer,
    };
  });

  return (
    <ContainerWrapper>
      <TitleContainer
        title="컴퓨터공학부 FAQ"
        description={
          <>
            답변 완료된 질문들이에요
            <br />
            질문을 눌러 답변을 확인해보세요!
          </>
        }
      />
      <CommonQuestionList
        questions={formattedQuestions}
        onDelete={handleDelete}
        onCardClick={handleCardClick}
      />
    </ContainerWrapper>
  );
}
