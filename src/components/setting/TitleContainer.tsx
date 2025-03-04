"use client";

import { theme } from "@/app/styles/theme";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem 0.5rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 0.69rem;
`;
const Title = styled.div`
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.03375rem;
`;
const Description = styled.div`
  color: ${theme.colors.mutedText};
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.03rem;
  white-space: pre-line;
`;
interface TitleProps {
  title: string;
  description: string | React.ReactNode;
}
export default function TitleContainer({ title, description }: TitleProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
}
