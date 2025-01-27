"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";
import SubHeader from "@/components/SubHeader";
import { useRouter, useSearchParams } from "next/navigation";

export default function WriteAnswer() {
  const [isToggleOn, setIsToggleOn] = useState(true);
  const [question, setQuestion] = useState({ title: "", content: "" });
  const [answer, setAnswer] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    // 여기서 id를 사용하여 질문 데이터를 가져옵니다.
    // 예: fetchQuestion(id).then(data => setQuestion(data));
  }, [id]);

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  const handleSubmit = () => {
    // 답변 제출 로직
    // 예: submitAnswer(id, answer).then(() => router.push('/answer'));
  };

  return (
    <Container>
      <SubHeader
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
        <Content>
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
          <ContentTitle>{question.title}</ContentTitle>
          <Label htmlFor="question">궁금한 점</Label>
          <ContentDetail id="question">{question.content}</ContentDetail>
        </Content>
        <Content>
          <LabelWrapper>
            <Label htmlFor="title">답변</Label>
          </LabelWrapper>
          <ContentAnswer
            id="question"
            placeholder="답변을 입력하세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></ContentAnswer>

          <SubmitButton type="button" onClick={handleSubmit}>
            확인
          </SubmitButton>
        </Content>
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
const Content = styled.div`
  width: 95%;
  height: 25rem;
  padding: 20px;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  @media only screen and (min-width: 200px) and (max-width: 480px) {
    height: 15rem;
  }
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
