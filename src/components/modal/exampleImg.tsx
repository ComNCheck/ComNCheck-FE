"use client";

import { theme } from "@/app/styles/theme";
import { IoMdCloseCircle } from "react-icons/io";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  background-color: rgba(58, 58, 58, 0.6);
  top: 0;
  left: 0;
  width: 100%;
  //max-width: 31rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21.875rem;
  height: 35.4375rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: ${theme.colors.contrast};
  box-shadow: 0px 0px 10px 0px rgba(142, 142, 142, 0.25);
`;
const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${theme.colors.primary};
  font-size: 2rem;
`;
const Img = styled.img`
  width: 14rem;
  height: 28.6875rem;
  object-fit: contain;
`;
interface ModalProps {
  onClose: () => void;
}
export default function ExampleImg({ onClose }: ModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        <Button onClick={onClose}>
          <IoMdCloseCircle />
        </Button>
        <Img src="/example.svg" />
      </ModalContent>
    </ModalOverlay>
  );
}
