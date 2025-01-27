"use client";
import styled from "styled-components";
import { theme } from "../styles/theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Content = styled.div`
  color: rgba(0, 0, 0, 0.38);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Bold = styled.span`
  color: ${theme.colors.primary};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export default function Loading() {
  return (
    <Wrapper>
      <Content>
        <Bold>컴</Bold>퓨터공학부 학부생이라면
      </Content>
      <Bold>&</Bold>
      <Content>놓치는 공지 없이</Content>
      <Content>
        빠르게 <Bold>체크</Bold>
      </Content>
    </Wrapper>
  );
}
