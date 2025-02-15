import { theme } from "@/app/styles/theme";
import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 1.5rem;
`;

const SwitchButton = styled.button<{ active: boolean }>`
  position: relative;
  width: 3rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  background-color: ${({ active }) =>
    active ? theme.colors.primary : theme.colors.mutedText};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0.125rem;
    left: ${({ active }) => (active ? "calc(100% - 1.375rem)" : "0.125rem")};
    width: 1.25rem;
    height: 1.25rem;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
`;

interface ToggleBtnProps {
  onToggle: () => void;
  active: boolean;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ onToggle, active }) => {
  return (
    <SwitchContainer>
      <SwitchButton onClick={onToggle} active={active}></SwitchButton>
    </SwitchContainer>
  );
};
export default ToggleBtn;
