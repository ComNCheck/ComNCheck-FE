"use client";
import { theme } from "@/app/styles/theme";
import SettingHeader from "@/components/settingHeader";
import SettingInput from "@/components/settingInput";
import { useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
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

export default function ToDeveloper() {
  const [inputs, setInputs] = useState([{ text: "" }]);
  const addInputContainer = () => {
    setInputs([...inputs, { text: "" }]);
  };
  return (
    <Wrapper>
      <SettingHeader />
      <Container>
        <Title>To. 개발자</Title>
        <TitleContent>
          <Title>
            <Highlight>이런 기능</Highlight>있었으면 좋겠어요!
          </Title>
          <BiMessageSquareEdit fontSize="2rem" onClick={addInputContainer} />
        </TitleContent>
        <SettingInput />
      </Container>
    </Wrapper>
  );
}
