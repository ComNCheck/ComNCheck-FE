"use client";

import styled from "styled-components";
import NextBtn from "@/components/button/nextBtn";
import { theme } from "@/app/styles/theme";
import { useRouter } from "next/navigation";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Header = styled.div`
  height: 4rem;
  width: 100%;
  max-width: 31rem;

  box-sizing: border-box;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;

  color: ${theme.colors.text};
  text-align: right;
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 900;
`;
const Logo = styled.img`
  width: 7.8125rem;
  height: 7.8125rem;
  margin: 5rem;
`;
const Message = styled.div`
  color: ${theme.colors.text};
  text-align: center;
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.875rem;
`;

export default function Complete() {
  const router = useRouter();
  return (
    <Wrapper>
      <Header onClick={() => router.push("/login")}>로그인</Header>
      <Logo src="/logo.png"></Logo>
      <Message>회원가입이 완료되었습니다</Message>
      <Message>학부 소식을 빠르게 받아보세요!</Message>
      <NextBtn />
    </Wrapper>
  );
}
