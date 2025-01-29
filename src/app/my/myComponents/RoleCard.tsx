"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";

interface Role {
  id: number;
  name: string;
  studentNumber: string;
  unit: string;
  position: string;
  role: string;
  isApply: boolean;
}

interface RoleCardProps {
  role: Role;
  index: number;
  onDelete?: (id: number) => void;
  onCardClick?: (id: number, isApply: boolean) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  index,
  onDelete,
  onCardClick,
}) => {
  const handleClick = () => {
    onCardClick?.(role.id, role.isApply);
  };

  return (
    <Card onClick={handleClick}>
      <MainContent>
        <NumberCircle>{index + 1}</NumberCircle>
        <RoleInfo>
          <RoleName>{role.name}</RoleName>
          <RoleStatus>{role.role}</RoleStatus>
        </RoleInfo>
        <OpenButton>열람</OpenButton>
      </MainContent>
    </Card>
  );
};

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${theme.colors.mutedText};
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.background};
  }
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const NumberCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${theme.button.secondary.background};
  color: ${theme.button.secondary.text};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 15px;
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  flex: 1;
`;

const RoleName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
`;

const RoleStatus = styled.span`
  font-size: 0.9rem;
  color: gray;
`;
const OpenButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
`;

export default RoleCard;
