import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { IoMdCloseCircle } from "react-icons/io";

interface SeminarAlertProps {
  isOpen: boolean;
  closeModal: () => void;
}

const SeminarAlert: React.FC<SeminarAlertProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={closeModal}>
          <IoMdCloseCircle />
        </CloseButton>
        <Title>서비스를 통합 중이에요!</Title>
        <Subtitle>빠른 시일 내에 만나요!</Subtitle>
        <Logo>🔗 X 컴퓨터공학부 세미나실 신청</Logo>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SeminarAlert;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.button.primary.background};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text};
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.mutedText};
`;

const Logo = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: ${theme.colors.primary};
`;
