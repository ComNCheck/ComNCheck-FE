import { theme } from "@/app/styles/theme";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styled from "styled-components";

const Button = styled.button`
  width: 20.5625rem;
  height: 3.125rem;
  border-radius: 0.5rem;
  background-color: #2a63fb;
  color: ${theme.button.primary.text};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Pretendard;
  font-size: 1.375rem;
  font-weight: 700;
  gap: 0.81rem;
  margin-top: 4rem;
`;
interface NextBtnProps {
  onClick: () => void;
  disabled?: boolean;
}
const NextBtn: React.FC<NextBtnProps> = ({ onClick, disabled }) => (
  <Button onClick={onClick} disabled={disabled}>
    다음 단계로 <BsFillArrowRightCircleFill />
  </Button>
);
export default NextBtn;
