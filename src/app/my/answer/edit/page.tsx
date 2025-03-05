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
import { AllQuestionResponse } from "@/apis/question.type";
import { AnswerRequest } from "@/apis/answer.type";

export default function EditAnswer() {
  const [shared, setShared] = useState(true);
  const [question, setQuestion] = useState<AllQuestionResponse | null>(null);
  const [answer, setAnswer] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchQuestionAndAnswer(parseInt(id));
    }
  }, [id]);

  const fetchQuestionAndAnswer = async (questionId: number) => {
    try {
      const questionData = await getQuestionById(questionId);
      console.log("원본 질문 데이터:", questionData); // 디버깅용 로그

      // answer 필드를 배열로 변환
      const formattedQuestion = {
        ...questionData,
        answer: questionData.answer ? [questionData.answer] : null,
      } as AllQuestionResponse;

      console.log("변환된 질문 데이터:", formattedQuestion); // 디버깅용 로그
      setQuestion(formattedQuestion);
      setShared(formattedQuestion.shared);

      if (formattedQuestion.answer && formattedQuestion.answer.length > 0) {
        setAnswer(formattedQuestion.answer[0].content);
      } else {
        setAnswer("");
      }
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  // const toggleHandler = () => {
  //   setShared(!shared);
  // };

  const handleSubmit = async () => {
    if (!question) {
      alert("질문 정보를 불러오지 못했습니다.");
      return;
    }
    if (!answer.trim()) {
      alert("답변을 입력해주세요.");
      return;
    }

    try {
      const answerData: AnswerRequest = {
        questionId: question.id,
        content: answer.trim(),
      };

      await putAnswer(question.id, answerData);
      alert("답변이 성공적으로 수정되었습니다.");
      router.push("/my/answer");
    } catch (error) {
      console.error("답변 수정 실패:", error);
      alert("답변 수정에 실패했습니다. 다시 시도해주세요.");
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
          ></ContentAnswer>

          <ButtonWapper>
            <SubmitButton type="button" onClick={handleSubmit}>
              수정
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
