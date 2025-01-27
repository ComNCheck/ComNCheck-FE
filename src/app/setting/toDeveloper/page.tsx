"use client";
import { theme } from "@/app/styles/theme";
import Toast from "@/components/modal/toast";
import SettingHeader from "@/components/settingHeader";
import SettingInput from "@/components/settingInput";
import { useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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
  const [inputs, setInputs] = useState<{ id: string; text: string }[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");

  const addInputContainer = () => {
    //생성된 input 컴포넌트의 고유 id생성
    const newInput = { id: uuidv4(), text: "" };
    setInputs([...inputs, newInput]);
  };
  const handleTextChange = (id: string, text: string) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) => (input.id === id ? { ...input, text } : input))
    );
  };
  const handleSubmit = (id: string, text: string) => {
    const input = inputs.find((input) => input.id === id);
    if (input) {
      console.log("제출된 데이터: ", text);
      setMessage("제출되었습니다. 의견 감사합니다.");
      setToastVisible(true);
    }
  };
  const removeInputContainer = (id: string) => {
    setInputs((prev) => prev.filter((input) => input.id !== id));
    setMessage("의견이 삭제되었습니다.");
    setToastVisible(true);
  };
  return (
    <Wrapper>
      {toastVisible && (
        <Toast message={message} setToastVisible={setToastVisible} />
      )}
      <SettingHeader />
      <Container>
        <Title>To. 개발자</Title>
        <TitleContent>
          <Title>
            <Highlight>이런 기능</Highlight>있었으면 좋겠어요!
          </Title>
          <BiMessageSquareEdit fontSize="2rem" onClick={addInputContainer} />
        </TitleContent>
        {inputs.map((input) => (
          <SettingInput
            key={input.id}
            id={input.id}
            value={input.text}
            onSubmit={(text) => handleSubmit(input.id, text)}
            onRemove={() => removeInputContainer(input.id)}
            onChange={(text) => handleTextChange(input.id, text)}
          />
        ))}
      </Container>
    </Wrapper>
  );
}
