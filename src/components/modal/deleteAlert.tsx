import { theme } from "@/app/styles/theme";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  width: 21.875rem;
  height: 8.9375rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(142, 142, 142, 0.25);
`;
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${theme.colors.primary};
  font-size: 2rem;
`;
const Title = styled.div`
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 700;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  gap: 2rem;
`;
const Btn = styled.button`
  width: 5.625rem;
  height: 1.8125rem;
  border-radius: 1.25rem;
  border: 2px solid ${theme.colors.text};
  background-color: ${theme.colors.text};
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.75rem;
  font-weight: 700;
`;

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}
export default function DeleteAlert({ onClose, onDelete }: DeleteModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <IoMdCloseCircle />
        </CloseButton>
        <Title>정말 삭제하시겠습니까?</Title>
        <BtnContainer>
          <Btn onClick={onDelete}>예</Btn>
          <Btn onClick={onClose}>아니오</Btn>
        </BtnContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
