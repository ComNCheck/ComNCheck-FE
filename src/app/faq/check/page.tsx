"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";
import { useRouter, useSearchParams } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import ContentBoxSmall from "@/components/container/ContentBoxSmall";

export default function FAQCheck() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [question, setQuestion] = useState({ title: "", content: "" });
  const [answer, setAnswer] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleSubmit = () => {
    router.back();
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="컴퓨터공학부 FAQ "
        description={
          <>
            답변 완료된 질문들이에요
            <br />
            질문을 눌러 답변을 확인해보세요!
          </>
        }
      />
      <ContentWrapper>
        <ContentBoxSmall>
          <LabelWrapper>
            <Label htmlFor="title">제목</Label>
            <ToggleWrapper onClick={toggleHandler}>
              {isToggleOn ? (
                <BiSolidToggleRight size={30} color={theme.colors.primary} />
              ) : (
                <BiToggleLeft size={30} color={theme.colors.mutedText} />
              )}
            </ToggleWrapper>
          </LabelWrapper>
          <ContentTitle>{question.title}질문 제목</ContentTitle>
          <Label htmlFor="question">궁금한 점</Label>
          <ContentDetail id="question">
            {question.content}궁금한 점으로 들어있던 원래 궁금한점.
          </ContentDetail>
        </ContentBoxSmall>
        <ContentBoxSmall>
          <LabelWrapper>
            <Label htmlFor="title">답변</Label>
          </LabelWrapper>
          <ContentAnswer id="question">
            {answer}상세 궁금한 점으로 들어있던 원래 질문내용.
          </ContentAnswer>
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
const ContentAnswer = styled.div`
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
