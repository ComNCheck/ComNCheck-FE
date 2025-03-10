import React from "react";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import FormWrapper from "@/components/container/FormWrapper";
import styled from "styled-components";

import {
  roleChangeListType,
  roleChangeDetailType,
} from "../../../apis/roleChange.type";
import RoleCard from "./RoleCard";

interface CommonRoleListProps {
  roles: roleChangeListType[];
  onDelete: (requestId: number) => void;
  onCardClick: (requestId: number) => void;
  onUpdate: (updatedRole: roleChangeDetailType) => void;
}

const CommonRoleList: React.FC<CommonRoleListProps> = ({
  roles,
  onDelete,
  onCardClick,
  onUpdate,
}) => {
  console.log("CommonRoleList render - roles:", roles);

  return (
    <ContainerWrapper>
      <FormWrapper>
        {roles.length > 0 ? (
          roles.map((role, index) => (
            <RoleCard
              key={role.requestId}
              role={role}
              index={index}
              onDelete={onDelete}
              onCardClick={onCardClick}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <EmptyMessage>표시할 데이터가 없습니다.</EmptyMessage>
        )}
      </FormWrapper>
    </ContainerWrapper>
  );
};

export default CommonRoleList;

const EmptyMessage = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: #888;
  font-size: 0.9rem;
`;
