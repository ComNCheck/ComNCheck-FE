import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

interface IsAnswerToggleProps {
  isAnswered: boolean;
  onToggle: () => void;
  labels: {
    inactive: string;
    active: string;
  };
}

const IsAnswerToggle: React.FC<IsAnswerToggleProps> = ({
  isAnswered,
  onToggle,
  labels,
}) => {
  return (
    <ToggleWrapper>
      <ToggleSwitch onClick={onToggle}>
        <Slider $active={isAnswered} />
        <Label $active={!isAnswered}>{labels.inactive}</Label>
        <Label $active={isAnswered}>{labels.active}</Label>
      </ToggleSwitch>
    </ToggleWrapper>
  );
};

const ToggleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 13rem;
  height: 50px;
  background-color: ${theme.toggle.secondary.background};
  border-radius: 25px;
  padding: 0 5px;
  cursor: pointer;
`;

const Slider = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 6rem;
  height: 40px;
  background-color: ${theme.toggle.primary.background};
  border-radius: 20px;
  transition: all 0.3s ease;
  transform: ${({ $active }) =>
    $active ? "translateX(100px)" : "translateX(0)"};
`;

const Label = styled.span<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#fff" : "#a0a0a0")};
  z-index: 1;
  user-select: none;
  transition: color 0.3s ease;
`;

export default IsAnswerToggle;
