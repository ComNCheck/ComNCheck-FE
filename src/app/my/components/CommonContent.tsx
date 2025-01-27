import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";

interface CommonContentProps {
  title: string;
  isToggleOn?: boolean;
  toggleHandler?: () => void;
  showToggle?: boolean;
  children: React.ReactNode;
}

const CommonContent: React.FC<CommonContentProps> = ({
  title,
  isToggleOn,
  toggleHandler,
  showToggle = false,
  children,
}) => {
  return (
    <Content>
      <LabelWrapper>
        <Label htmlFor="title">{title}</Label>
        {showToggle && (
          <ToggleWrapper onClick={toggleHandler}>
            {isToggleOn ? (
              <BiSolidToggleRight size={30} color={theme.colors.primary} />
            ) : (
              <BiToggleLeft size={30} color={theme.colors.mutedText} />
            )}
          </ToggleWrapper>
        )}
      </LabelWrapper>
      {children}
    </Content>
  );
};

const Content = styled.div`
  width: 95%;
  height: 25rem;
  padding: 20px;
  margin: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  @media only screen and (min-width: 200px) and (max-width: 480px) {
    height: 15rem;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  font-family: "Pretendard", sans-serif;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 30px;
  height: 30px;
`;

export default CommonContent;
