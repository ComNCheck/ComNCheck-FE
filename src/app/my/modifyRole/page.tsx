"use client";

import React, { useEffect, useMemo, useState } from "react";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonRoleList from "../myComponents/CommonRoleList";
import RoleCheckModal from "@/components/modal/RoleCheckModal";
import {
  getRoleChangeList,
  getRoleChangeDetail,
  getRoleChangeDetailApprove,
} from "../../../apis/roleChange";
import {
  roleChangeListType,
  roleChangeDetailType,
} from "../../../apis/roleChange.type";

export default function ModifyRole() {
  const [isApply, setIsApply] = useState<boolean>(false);
  const [roles, setRoles] = useState<roleChangeListType[]>([]);
  const [selectedRole, setSelectedRole] = useState<
    roleChangeDetailType[] | null
  >(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleChangeList = await getRoleChangeList();
        setRoles(roleChangeList);
        console.log("등급 신청 목록을 불러오기 data:", roleChangeList);
      } catch (error) {
        console.error("등급 신청 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchRoles();
  }, [isApply]); // isApply가 변경될 때마다 데이터 다시 불러오기

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      isApply ? role.status === "APPROVED" : role.status === "PENDING"
    );
  }, [roles, isApply]);

  const handleToggle = () => {
    setIsApply((prev) => !prev);
  };

  const handleDelete = (requestId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setRoles((prevRoles) =>
        prevRoles.filter((role) => role.requestId !== requestId)
      );
    }
  };

  const handleCardClick = async (requestId: number) => {
    try {
      console.log("handleCardClick 호출됨 - requestId:", requestId);
      const roleDetail = await getRoleChangeDetail(requestId);
      console.log("받아온 상세 정보:", roleDetail);

      if (roleDetail) {
        const roleData = Array.isArray(roleDetail) ? roleDetail : [roleDetail];
        setSelectedRole(roleData);
      }
    } catch (error) {
      console.error("등급 신청 상세 정보를 불러오는 중 오류 발생:", error);
    }
  };

  const handleRoleUpdate = async (updatedRole: roleChangeDetailType) => {
    try {
      if (!updatedRole.requestId) {
        console.error("요청 ID가 없습니다.");
        return;
      }

      // API 호출
      const approvedRoles = await getRoleChangeDetailApprove(
        updatedRole.requestId
      );

      console.log("✅ 승인 API 응답:", approvedRoles);

      if (approvedRoles.length > 0) {
        const approvedRole = approvedRoles[0];

        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.requestId === approvedRole.requestId
              ? { ...role, status: "APPROVED" }
              : role
          )
        );

        setSelectedRole(null);

        const roleChangeList = await getRoleChangeList();
        setRoles(roleChangeList);
      }
    } catch (error) {
      console.error("❌ 역할 승인 중 오류 발생:", error);

      // 서버 응답이 있는지 확인
      // if (error.response) {
      //   console.error("📌 서버 응답 데이터:", error.response.data);
      //   console.error("📌 상태 코드:", error.response.status);
      // } else if (error.request) {
      //   console.error("📌 요청은 전송되었지만 응답 없음:", error.request);
      // } else {
      //   console.error("📌 요청 생성 중 오류 발생:", error.message);
      // }

      alert("역할 승인에 실패했습니다.");
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
        onUpdate={handleRoleUpdate}
      />

      {selectedRole && (
        <RoleCheckModal
          role={selectedRole}
          onClose={() => setSelectedRole(null)}
          onUpdate={handleRoleUpdate}
        />
      )}
    </ContainerWrapper>
  );
}
