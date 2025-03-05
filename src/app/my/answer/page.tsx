"use client";

import React, { useState, useEffect, useMemo } from "react";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonQuestionList from "../myComponents/CommonQuestionList";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import { deleteQuestion, getQuestionAllList } from "../../../apis/question";
import { AllQuestionResponse } from "../../../apis/question.type";
import styled from "styled-components";

const WrapperContainer = styled.div`
  overflow-y: auto;
`
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

  const handleCardClick = ($id: number, $isAnswered: boolean) => {
    if ($isAnswered) {
      router.push(`/my/answer/edit?id=${$id}`);
    } else {
      router.push(`/my/answer/write?id=${$id}`);
    }
  };

  const handleToggle = () => {
    setIsAnswered((prev) => !prev);
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        const hasAnswer = Boolean(q.answer?.[0]?.content.trim());
        return isAnswered === hasAnswer;
      })
      .map((q) => ({
        id: q.id,
        title: q.title,
        date: q.createdAt,
        isAnswered: Boolean(q.answer?.[0]?.content.trim()),
      }));
  }, [questions, isAnswered]);

  const handleDelete = async ($id: number) => {
    const question = questions.find((q) => q.id === $id);

    // answer가 있고 content가 있는 경우에만 삭제 가능
    const hasValidAnswer = Boolean(question?.answer?.[0]?.content.trim());

    if (!hasValidAnswer) {
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
      <WrapperContainer>
        <CommonQuestionList
                questions={filteredQuestions}
                onDelete={handleDelete}
                onCardClick={handleCardClick}
              />
      </WrapperContainer>
      
    </ContainerWrapper>
  );
}
