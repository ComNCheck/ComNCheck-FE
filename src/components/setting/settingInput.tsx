"use client";
import { theme } from "@/app/styles/theme";
import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaPlusCircle,
  FaRegTimesCircle,
  FaTimesCircle,
} from "react-icons/fa";
import styled from "styled-components";

const InputContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  margin: 2.13rem 0;
  position: relative;
`;
const Icon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
`;

interface inputProps {
  hasText: boolean;
}
const Input = styled.textarea.withConfig({
  shouldForwardProp: (props) => props !== "hasText",
})<inputProps>`
  width: 100%;
  height: 5.25rem;
  border-radius: 0rem 0.625rem 0.625rem 0.625rem;
  border: 1px solid #3a3a3a;
  background: #fff;
  padding: 0.56rem;
  margin-top: 1rem;
  color: ${(props) =>
    props.hasText ? theme.colors.text : theme.colors.mutedText};
  font-family: Pretendard;
  font-size: 0.625rem;
  font-weight: 300;
  resize: none;
  position: relative;
`;
const CharCount = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.56rem;
  color: ${theme.colors.text};
  font-size: 0.375rem;
  font-style: normal;
  font-weight: 300;
`;

interface SettingInputProps {
  id?: number;
  value: string;
  isSubmitted: boolean;
  onRemove: () => void;
  onSubmit: (text: string) => void;
  onChange: (text: string) => void;
}
export default function SettingInput({
  value,
  isSubmitted,
  onSubmit,
  onRemove,
  onChange,
}: SettingInputProps) {
  const [text, setText] = useState(value);
  const [status, setStatus] = useState<"add" | "submit" | "remove">(() => {
    if (isSubmitted) return "remove";
    return value ? "submit" : "add";
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value.slice(0, 100);
    setText(newText);
    useEffect(() => {
      onChange(text);
    }, [text, onChange]);

    if (newText.length > 0 && status === "add") {
      setStatus("submit");
    } else if (newText.length === 0 && status === "submit") {
      setStatus("add");
    }
  };

  const handleSubmit = () => {
    if (text.trim() === "") return;
    setStatus("remove");
    console.log(status);
    onSubmit(text);
  };
  return (
    <InputContainer>
      <Icon>
        {status === "add" && <FaPlusCircle />}
        {status === "submit" && (
          <FaCheckCircle color="#4CAF50" onClick={handleSubmit} />
        )}
        {status === "remove" && (
          <FaTimesCircle fill="#F24822" onClick={onRemove} />
        )}
      </Icon>
      <Input
        value={text}
        onChange={handleTextChange}
        hasText={text.length > 0}
        placeholder="개발자에게 원하는 점을 적어주세요"
        disabled={isSubmitted} //제출되면 비활성화
      />
      <CharCount>{text.length}/100</CharCount>
    </InputContainer>
  );
}
