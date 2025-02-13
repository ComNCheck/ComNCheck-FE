import React from "react";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import FormWrapper from "@/components/container/FormWrapper";

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
  return (
    <ContainerWrapper>
      <FormWrapper>
        {roles.map((role, index) => (
          <RoleCard
            key={role.requestId}
            role={role}
            index={index}
            onDelete={onDelete}
            onCardClick={onCardClick}
            onUpdate={onUpdate}
          />
        ))}
      </FormWrapper>
    </ContainerWrapper>
  );
};

export default CommonRoleList;
