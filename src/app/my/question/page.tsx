"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";
import SubHeader from "@/components/SubHeader";

export default function Question() {
  const [isToggleOn, setIsToggleOn] = useState(true);

  const toggleHandler = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <Container>
      <SubHeader
        title="질문하기"
        description="학과와 관련된 궁금한 점을 마음껏 질문해주세요!"
      />
      <FormWrapper>
        <Form>
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
          <Input type="text" id="title" placeholder="이예림" defaultValue="" />
          <Label htmlFor="question">궁금한 점</Label>
          <Textarea
            id="question"
            rows={4}
            placeholder="궁금한 점을 적어주세요!"
          ></Textarea>
          <SubmitButton type="submit">질문</SubmitButton>
        </Form>
      </FormWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 31rem;
  position: relative;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
const Form = styled.div`
  width: 95%;
  height: 25rem;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
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

const Input = styled.input`
  width: 100%;
  margin: 8px 0px 16px 0px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 7px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  font-family: "Pretendard", sans-serif;
  &:focus {
    outline: none;
    border-color: ${theme.button.primary.background};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
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
  bottom: 15px;
  right: 15px;
  padding: 10px 16px;
  background-color: ${theme.button.submit.background};
  color: ${theme.button.submit.text};
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
