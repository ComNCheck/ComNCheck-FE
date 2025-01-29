"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonRoleList from "../myComponents/CommonRoleList";

interface Role {
  id: number;
  name: string;
  studentNumber: string;
  unit: string;
  position: string;
  role: string;
  isApply: boolean;
}

export default function ModifyRole() {
  const [isApply, setIsApply] = useState(false);
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 1,
      name: "이예림",
      studentNumber: "202302351",
      unit: "컴퓨터공학부",
      position: "학술부장",
      role: "학생회",
      isApply: true,
    },
    {
      id: 2,
      name: "노성원",
      studentNumber: "202302351",
      unit: "컴퓨터공학부",
      position: "학술부장",
      role: "학생",
      isApply: false,
    },
    {
      id: 3,
      name: "조성민",
      studentNumber: "202302351",
      unit: "컴퓨터공학부",
      position: "학술부장",
      role: "졸업생",
      isApply: false,
    },
  ]);

  const handleCardClick = (id: number) => {
    // 카드 클릭 시 처리 로직
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => role.isApply === isApply);
  }, [roles, isApply]);

  const handleToggle = () => {
    setIsApply(!isApply);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    }
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="등급 수정하기"
        description={
          <>
            학생회 등급 신청한 학생들 입니다.
            <br />
            명단을 확인하시고 올바른 학생들만 등급을 올려주세요.
          </>
        }
      />

      <IsAnswerToggle
        isAnswered={isApply}
        onToggle={handleToggle}
        labels={{ inactive: "신청 현황", active: "수정 완료" }}
      />
      <CommonRoleList
        roles={filteredRoles}
        onDelete={handleDelete}
        onCardClick={handleCardClick}
      />
    </ContainerWrapper>
  );
}
