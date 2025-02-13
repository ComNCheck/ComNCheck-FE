"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { getFAQ } from "@/apis/question";
import { AllFAQQuestionResponse, AnswerType } from "@/apis/question.type";
import FAQQuestionList from "../my/myComponents/FAQQuestionList";

export default function FAQ() {
  const router = useRouter();
  const [questions, setQuestions] = useState<AllFAQQuestionResponse[]>([]);

  const fetchFAQ = async () => {
    try {
      const faqData = await getFAQ();
      console.log("API 데이터:", faqData);
      setQuestions(faqData);
    } catch (error) {
      console.error("FAQ 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchFAQ();
  }, []);

  const handleCardClick = (id: number, isAnswered: boolean) => {
    if (isAnswered) {
      router.push(`/faq/check?id=${id}`);
    }
  };
  const handleDelete = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const formattedQuestions = questions.map((q) => ({
    id: q.id,
    title: q.title,
    date: new Date(q.createdAt).toLocaleDateString("ko-KR"),
    answer: q.answer?.content || "",
    isAnswered: !!q.answer?.content,
  }));

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
      <FAQQuestionList
        questions={formattedQuestions}
        onDelete={handleDelete}
        onCardClick={handleCardClick}
      />
    </ContainerWrapper>
  );
}
