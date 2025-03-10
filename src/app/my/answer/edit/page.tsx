"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import ContentBoxSmall from "@/components/container/ContentBoxSmall";
import { getQuestionById } from "@/apis/question";
import { putAnswer } from "@/apis/answer";
import { AllQuestionResponse, AnswerType } from "@/apis/question.type";

export default function EditAnswer() {
  const [shared, setShared] = useState(true);
  const [question, setQuestion] = useState<AllQuestionResponse | null>(null);
  const [answer, setAnswer] = useState("");
  const [majorQuestionId, setMajorQuestionId] = useState<number | null>(null);
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("majorQuestionId");
  const router = useRouter();

  // 질문 데이터 불러오기
  const fetchQuestionAndAnswer = async (id: number) => {
    try {
      console.log("질문 데이터 요청 ID:", id);
      const questionData = await getQuestionById(id);
      console.log("원본 질문 데이터:", questionData);

      const formattedQuestion = {
        ...questionData,
        answer: Array.isArray(questionData.answer)
          ? questionData.answer
          : questionData.answer
            ? [questionData.answer]
            : [],
      } as AllQuestionResponse;

      console.log("변환된 질문 데이터:", formattedQuestion);
      setQuestion(formattedQuestion);
      setShared(formattedQuestion.shared);

      if (formattedQuestion.answer && formattedQuestion.answer.length > 0) {
        setAnswer(formattedQuestion.answer[0].content);

        const answerObj = formattedQuestion.answer[0] as AnswerType;

        console.log("Answer object:", answerObj);

        if (answerObj && "answerId" in answerObj) {
          setAnswerId(answerObj.answerId);
          console.log("설정된 답변 ID:", answerObj.answerId);
        } else {
          console.error("답변 객체에 answerId 필드가 없습니다");
          setAnswerId(null);
        }
      } else {
        setAnswer("");
        setAnswerId(null);
      }
    } catch (error) {
      console.error(`ID ${id}에 대한 데이터 가져오기 실패:`, error);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id);
      setMajorQuestionId(parsedId);
      fetchQuestionAndAnswer(parsedId);
    }
  }, [id]);

  // 제출 핸들러
  const handleSubmit = async () => {
    if (!majorQuestionId) {
      alert("질문 정보를 불러오지 못했습니다.");
      return;
    }
    if (!answerId) {
      alert("답변 ID를 찾을 수 없습니다.");
      return;
    }
    if (!answer.trim()) {
      alert("답변을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // JSON 문자열로 변환하여 전송
      const answerContent = JSON.stringify({ content: answer.trim() });

      console.log("사용할 답변 ID:", answerId);
      console.log("답변 내용:", answerContent);

      // 서버에 답변 업데이트 요청
      await putAnswer(answerId, answerContent);

      // 성공적으로 업데이트 된 후 최신 데이터를 다시 불러옴
      await fetchQuestionAndAnswer(majorQuestionId);

      alert("답변이 성공적으로 수정되었습니다.");
      router.push("/my/answer");
    } catch (error) {
      console.error(`답변 ID ${answerId} 수정 실패:`, error);
      alert("답변 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="답변 수정하기"
        description={
          <>
            질문에 대한 답변을 수정하고
            <br />
            완료 버튼을 눌러주세요.
          </>
        }
      />
      <ContentWrapper>
        <ContentBoxSmall>
          <LabelWrapper>
            <Label htmlFor="title">제목</Label>
            <ToggleWrapper>
              {shared ? (
                <BiSolidToggleRight size={30} color={theme.colors.primary} />
              ) : (
                <BiToggleLeft size={30} color={theme.colors.mutedText} />
              )}
            </ToggleWrapper>
          </LabelWrapper>
          <ContentTitle>{question?.title || "수정할 카드의 제목"}</ContentTitle>
          <Label htmlFor="question">궁금한 점</Label>
          <ContentDetail id="question">{question?.content || ""}</ContentDetail>
        </ContentBoxSmall>
        <ContentBoxSmall>
          <LabelWrapper>
            <Label htmlFor="title">답변</Label>
          </LabelWrapper>
          <ContentAnswer
            id="question"
            value={answer}
            placeholder="여기에 답변을 입력하세요."
            onChange={(e) => setAnswer(e.target.value)}
            disabled={isSubmitting}
          ></ContentAnswer>

          <ButtonWapper>
            <SubmitButton
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "처리 중..." : "수정"}
            </SubmitButton>
          </ButtonWapper>
        </ContentBoxSmall>
      </ContentWrapper>
    </ContainerWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  overflow-y: auto;
  height: 90vh;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  font-family: "Pretendard", sans-serif;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

const ContentTitle = styled.div`
  width: 100%;
  margin: 8px 0px 16px 0px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 7px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  font-family: "Pretendard", sans-serif;
`;
const ContentDetail = styled.div`
  width: 100%;
  height: 5rem;
  margin: 8px 0px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 7px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  resize: none;
  font-family: "Pretendard", sans-serif;
  &:focus {
    outline: none;
    border-color: ${theme.button.primary.background};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;
const ContentAnswer = styled.textarea`
  width: 100%;
  height: 8rem;
  margin: 8px 0px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 7px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  resize: none;
  font-family: "Pretendard", sans-serif;
  &:focus {
    outline: none;
    border-color: ${theme.button.primary.background};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;
const ButtonWapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  display: flex;
  padding: 10px 16px;
  background-color: ${theme.button.submit.background};
  color: ${theme.button.submit.text};
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
