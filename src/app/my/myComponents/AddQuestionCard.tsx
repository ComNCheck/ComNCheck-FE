"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";
import { QuestionRequest } from "@/apis/question.type";

interface AddQuestionCardProps {
  onSubmit: (questionData: QuestionRequest) => void;
  submitButtonText: string;
}

export default function AddQuestionCard({
  onSubmit,
  submitButtonText,
}: AddQuestionCardProps) {
  const [shared, setShared] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const toggleHandler = () => {
    setShared(!shared);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    onSubmit({ title, content, shared });
  };

  return (
    <FormWrapper>
      <Form>
        <LabelWrapper>
          <Label htmlFor="title">제목</Label>
          <ToggleWrapper onClick={toggleHandler}>
            {shared ? (
              <BiSolidToggleRight size={30} color={theme.colors.primary} />
            ) : (
              <BiToggleLeft size={30} color={theme.colors.mutedText} />
            )}
          </ToggleWrapper>
        </LabelWrapper>
        <Input
          type="text"
          id="title"
          placeholder="질문 제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="question">궁금한 점</Label>
        <Textarea
          id="question"
          rows={4}
          placeholder="궁금한 점을 적어주세요!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonWrapper>
          <SubmitButton type="button" onClick={handleSubmit}>
            {submitButtonText}
          </SubmitButton>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 3rem;
  margin: 8px 0px 16px 0px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 7px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 11.5rem;
  margin: 8px 0px;
  padding: 8px 12px;
  border: 1px solid ${theme.colors.mutedText};
  border-radius: 7px;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  resize: none;
`;

const ButtonWrapper = styled.div`
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
