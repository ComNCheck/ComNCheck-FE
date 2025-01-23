"use client";
import { theme } from "@/app/styles/theme";
import SettingHeader from "@/components/settingHeader";
import { useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
`;
const Container = styled.div`
  padding: 1.6rem;
`;
const TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 3.5rem;
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.0375rem;
`;
const Highlight = styled.div`
  color: ${theme.colors.primary};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;
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
const Input = styled.textarea<inputProps>`
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
export default function ToDeveloper() {
  const [text, setText] = useState("");

  return (
    <Wrapper>
      <SettingHeader />
      <Container>
        <Title>To. 개발자</Title>
        <TitleContent>
          <Title>
            <Highlight>이런 기능</Highlight>있었으면 좋겠어요!
          </Title>
          <BiMessageSquareEdit fontSize="2rem" />
        </TitleContent>

        <InputContainer>
          <Icon>
            <FaPlusCircle />
          </Icon>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 100))}
            hasText={text.length > 0}
            placeholder="개발자에게 원하는 점을 적어주세요"
          />
          <CharCount>{text.length}/100</CharCount>
        </InputContainer>
      </Container>
    </Wrapper>
  );
}
