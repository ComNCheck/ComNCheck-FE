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
import { postAnswer } from "@/apis/answer";
import { AllQuestionResponse } from "@/apis/question.type";

export default function WriteAnswer() {
  const [shared, setShared] = useState(true);
  const [question, setQuestion] = useState<AllQuestionResponse | null>(null);
  const [answer, setAnswer] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchQuestion(parseInt(id));
    }
  }, [id]);

  const fetchQuestion = async (questionId: number) => {
    try {
      const data = await getQuestionById(questionId);
      setQuestion(data);
      setShared(data.shared);
    } catch (error) {
      console.error("질문 데이터 가져오기 실패:", error);
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

    const answerData = {
      questionId: question.id,
      content: answer,
    };

    try {
      console.log("답변 요청 데이터:", answerData);
      await postAnswer(answerData);
      alert("답변이 성공적으로 등록되었습니다.");
      // window.location.href = "/my/answer";
      router.push("/my/answer");
    } catch (error) {
      console.error("답변 등록 실패:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      alert(`답변 등록에 실패했습니다: ${errorMessage}`);
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
          <ContentTitle>{question?.title || "질문 제목"}</ContentTitle>
          <Label htmlFor="question">궁금한 점</Label>
          <ContentDetail id="question">{question?.content || ""}</ContentDetail>
        </ContentBoxSmall>
        <ContentBoxSmall>
          <LabelWrapper>
            <Label htmlFor="title">답변</Label>
          </LabelWrapper>
          <ContentAnswer
            id="question"
            placeholder="답변을 입력하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></ContentAnswer>
          <ButtonWapper>
            <SubmitButton type="button" onClick={handleSubmit}>
              확인
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
  height: calc(100vh-6rem); //스크롤 test값
  overflow-y: auto;
  overflow-x: hidden;
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
  &:focus {
    height: 150px;
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
