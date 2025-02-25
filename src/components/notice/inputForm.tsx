"use client";

import { theme } from "@/app/styles/theme";
import React from "react";
import styled from "styled-components";

const FormStyled = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== "hasPlaceholder" && prop !== "isFilled",
})<{ hasPlaceholder?: boolean; isFilled: boolean }>`
  width: 20.625rem;
  max-width: 80vw;
  height: ${(props) => (props.hasPlaceholder ? "4.3125rem" : "3.4375rem")};
  border-radius: 0.625rem;
  color: ${(props) =>
    props.isFilled ? theme.colors.text : theme.colors.mutedText};
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 1rem;
  border: 2px solid ${theme.colors.background};
  resize: none;
  overflow: hidden;
  white-space: pre-wrap;
`;
interface FormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isFilled: boolean;
  hasPlaceholder?: boolean;
  type?:string;
}
const InputForm: React.FC<FormProps> = ({
  value,
  onChange,
  placeholder,
  isFilled,
  hasPlaceholder = false,
  type="text"
}) => {
  return (
    <FormStyled
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      hasPlaceholder={hasPlaceholder}
      isFilled={isFilled}
    />
  );
};
export default InputForm;
