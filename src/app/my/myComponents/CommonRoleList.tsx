import React from "react";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import FormWrapper from "@/components/container/FormWrapper";
import RoleCard from "./RoleCard";

interface Role {
  id: number;
  name: string;
  studentNumber: string;
  unit: string;
  position: string;
  role: string;
  isApply: boolean;
}

interface CommonRoleListProps {
  roles: Role[];
  onDelete: (id: number) => void;
  onCardClick: (id: number, isApply: boolean) => void;
  onUpdate: (updatedRole: Role) => void;
}

const CommonRoleList: React.FC<CommonRoleListProps> = ({
  roles,
  onDelete,
  onUpdate,
}) => {
  return (
    <ContainerWrapper>
      <FormWrapper>
        {roles.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            index={index}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </FormWrapper>
    </ContainerWrapper>
  );
};

export default CommonRoleList;
