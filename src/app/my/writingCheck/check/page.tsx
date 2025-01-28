"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import SubHeader from "@/components/Header/SubHeader";
import { useRouter } from "next/navigation";
import CommonContent from "../../components/CommonContent";

export default function Check() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const router = useRouter();

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleSubmit = () => {
    router.back();
  };

  return (
    <Container>
      <SubHeader
        title="내가 쓴 글 확인하기"
        description={
          <>
            내가 작성한 질문들을 한눈에 모아봤어요.
            <br />
            답변이 완료된 질문을 수정할 수 없어요.
          </>
        }
      />
      <ContentWrapper>
        <CommonContent
          title="제목"
          isToggleOn={isToggleOn}
          toggleHandler={toggleHandler}
          showToggle
        >
          <ContentTitle>질문 제목</ContentTitle>
          <Label htmlFor="question">궁금한 점</Label>
          <ContentDetail id="question">
            상세 궁금한 점으로 들어있던 원래 질문내용.
          </ContentDetail>
        </CommonContent>
        <CommonContent title="답변">
          <ContentAnswer id="question">
            상세 궁금한 점으로 들어있던 원래 질문내용.
          </ContentAnswer>
          <SubmitButton type="button" onClick={handleSubmit}>
            확인
          </SubmitButton>
        </CommonContent>
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;
  top: 12rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  font-family: "Pretendard", sans-serif;
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
  &:focus {
    height: 150px;
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  bottom: 34px;
  right: 25px;
  padding: 10px 16px;
  background-color: ${theme.button.submit.background};
  color: ${theme.button.submit.text};
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
