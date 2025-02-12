"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { useSwipeable } from "react-swipeable";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  roleChangeListType,
  roleChangeDetailType,
} from "../../../apis/roleChange.type";

interface RoleCardProps {
  role: roleChangeListType;
  index: number;
  onDelete: (requestId: number) => void;
  onCardClick: (requestId: number) => void;
  onUpdate: (updatedRole: roleChangeDetailType) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  index,
  onDelete,
  onCardClick,
  onUpdate,
}) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(role.requestId);
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("열람 버튼 클릭 - requestId:", role.requestId);
    onCardClick(role.requestId);
  };

  return (
    <CardWrapper {...handlers}>
      <Card isSwiped={isSwiped}>
        <MainContent>
          <NumberCircle>{index + 1}</NumberCircle>
          <RoleInfo>
            <RoleName>{role.name}</RoleName>
            <RequestPosition>{role.requestPosition}</RequestPosition>
          </RoleInfo>
          <OpenButton type="button" onClick={handleOpenModal}>
            열람
          </OpenButton>
        </MainContent>
      </Card>
      <DeleteButton isSwiped={isSwiped} onClick={handleDelete}>
        <RiDeleteBin6Fill />
      </DeleteButton>
    </CardWrapper>
  );
};
export default RoleCard;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const Card = styled.div<{ isSwiped: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${theme.colors.mutedText};
  background-color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
  flex: 1;
  ${({ isSwiped }) => isSwiped && `transform: translateX(-3rem);`}
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

const DeleteButton = styled.button<{ isSwiped: boolean }>`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.danger};
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;
  opacity: ${({ isSwiped }) => (isSwiped ? 1 : 0)};
  pointer-events: ${({ isSwiped }) => (isSwiped ? "auto" : "none")};
`;

const RequestPosition = styled.div``;
