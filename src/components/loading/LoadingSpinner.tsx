"use client";
import { theme } from "@/app/styles/theme";
import styled from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .spinner {
    border: 6px solid ${theme.colors.mutedText};
    border-top: 6px solid ${theme.colors.primary};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <div className="spinner"></div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
