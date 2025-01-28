import { theme } from "@/app/styles/theme";
import { useEffect } from "react";
import styled from "styled-components";

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  max-width: 31rem;
  bottom: 2.56rem;
  padding: 0.88rem;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 18.5625rem;
  height: 2.6875rem;
  border-radius: 1.25rem;
  border: 2px solid ${theme.colors.text};
  background: #fff;
`;
interface ToastProps {
  message: string;
  setToastVisible: (visible: boolean) => void;
}
export default function Toast({ message, setToastVisible }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, setToastVisible]);

  return (
    <ToastWrapper>
      <Container>{message}</Container>
    </ToastWrapper>
  );
}
