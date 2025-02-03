"use client";
import { theme } from "@/app/styles/theme";
import DeleteAlert from "@/components/modal/deleteAlert";
import Toast from "@/components/modal/toast";
import SettingHeader from "@/components/Header/settingHeader";
import SettingInput from "@/components/setting/settingInput";
import { useEffect, useState } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import styled from "styled-components";
import {
  deleteQustion,
  getAllQuestion,
  postQuestion,
} from "@/apis/developerQuestion";

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
  font-weight: 600;
  letter-spacing: -0.0375rem;
`;
const Highlight = styled.div`
  color: ${theme.colors.primary};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 800;
`;
interface InputProps {
  id?: number; // 서버에서 받은 id (초기에는 없음)
  text: string;
  isSubmitted: boolean;
}

export default function ToDeveloper() {
  const [inputs, setInputs] = useState<InputProps[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // 기존에 제출한 의견 불러오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await getAllQuestion();
        const formattedQuestions = questions.map((q) => ({
          id: q.id,
          text: q.content,
          isSubmitted: true,
        }));
        setInputs(formattedQuestions);
      } catch (error) {
        console.error("의견 불러오는 중 에러 발생", error);
      }
    };
    fetchQuestions();
  }, []);

  // 새로운 의견 추가
  const handleSubmit = async (text: string, index: number) => {
    try {
      const response = await postQuestion({ content: text }); // 서버 응답에서 id 받음
      setInputs((prev) =>
        prev.map((input, i) =>
          i === index ? { ...input, isSubmitted: true } : input
        )
      );
      setMessage("제출되었습니다. 의견 감사합니다.");
      setToastVisible(true);
    } catch (error) {
      console.error("제출 실패:", error);
    }
  };

  // 삭제 버튼 클릭 → 모달 열기
  const handleRemove = (id: number) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  // 의견 삭제
  const removeInputContainer = async () => {
    if (deleteId !== null) {
      try {
        await deleteQustion(deleteId);
        setInputs((prev) => prev.filter((input) => input.id !== deleteId));
        setMessage("의견이 삭제되었습니다.");
        setToastVisible(true);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }
    setIsModalOpen(false);
  };

  const addInputContainer = () => {
    setInputs([{ text: "", isSubmitted: false }, ...inputs]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <Highlight>이런 기능</Highlight> 있었으면 좋겠어요!
          </Title>
          <BiMessageSquareEdit fontSize="2rem" onClick={addInputContainer} />
        </TitleContent>
        {inputs.map((input, index) => (
          <SettingInput
            key={index}
            value={input.text}
            isSubmitted={input.isSubmitted}
            onSubmit={(text) => handleSubmit(text, index)}
            onRemove={() => {
              if (input.id !== undefined) {
                handleRemove(input.id);
              }
            }}
            onChange={(text) =>
              setInputs((prev) =>
                prev.map((i, idx) => (idx === index ? { ...i, text } : i))
              )
            }
          />
        ))}
      </Container>
      {isModalOpen && deleteId && (
        <DeleteAlert onClose={closeModal} onDelete={removeInputContainer} />
      )}
    </Wrapper>
  );
}
