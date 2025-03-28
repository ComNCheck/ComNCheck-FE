"use client";

import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";
import IsAnswerToggle from "../myComponents/IsAnswerToggle";
import CommonRoleList from "../myComponents/CommonRoleList";
import RoleCheckModal from "@/components/modal/RoleCheckModal";
import { getRoleChangeList, deleteRoleChange } from "../../../apis/roleChange";
import {
  roleChangeListType,
  roleChangeDetailType,
} from "../../../apis/roleChange.type";

export default function ModifyRole() {
  const [isApply, setIsApply] = useState<boolean>(false);
  const [roles, setRoles] = useState<roleChangeListType[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  // 초기 데이터 로드
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleChangeList = await getRoleChangeList();
        setRoles(roleChangeList);
        console.log("등급 신청 목록 로드 완료:", roleChangeList);
      } catch (error) {
        console.error("등급 신청 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchRoles();
  }, [isApply]); // isApply가 변경될 때마다 데이터 다시 불러오기

  // 상태에 따라 필터링된 목록
  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      isApply ? role.status === "APPROVED" : role.status === "PENDING"
    );
  }, [roles, isApply]);

  // 토글 상태 변경
  const handleToggle = () => {
    setIsApply((prev) => !prev);
  };

  // 역할 삭제
  const handleDelete = async (requestId: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      try {
        await deleteRoleChange(requestId);
        console.log("역할 변경 요청이 성공적으로 삭제되었습니다");
        // 삭제 후 상태 업데이트
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role.requestId !== requestId)
        );
      } catch (error) {
        console.error("역할 변경 요청 삭제 중 오류 발생:", error);
        alert("삭제 중 오류가 발생했습니다");
      }
    }
  };

  // 카드 클릭 시 모달 표시
  const handleCardClick = (requestId: number) => {
    console.log("카드 클릭 - requestId:", requestId);
    setSelectedRequestId(requestId);
  };

  // 역할 업데이트 후 처리
  const handleRoleApproved = (updatedRole: roleChangeDetailType) => {
    console.log("역할 업데이트:", updatedRole);

    // 모달에서 업데이트된 역할 정보를 받아서 상태 업데이트
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.requestId === updatedRole.requestId
          ? {
              requestId: updatedRole.requestId,
              name: updatedRole.name,
              requestPosition: updatedRole.position || "",
              status: "APPROVED",
            }
          : role
      )
    );

    // 모달 닫기
    setSelectedRequestId(null);

    // 목록 다시 불러오기
    getRoleChangeList()
      .then((roleChangeList) => {
        setRoles(roleChangeList);
      })
      .catch((error) => {
        console.error("등급 신청 목록을 다시 불러오는 중 오류 발생:", error);
      });
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

      {filteredRoles.length > 0 ? (
        <CommonRoleList
          roles={filteredRoles}
          onDelete={handleDelete}
          onCardClick={handleCardClick}
          onUpdate={handleRoleApproved}
        />
      ) : (
        <EmptyMessage>
          {isApply ? "수정 완료된 신청이 없습니다." : "신청 현황이 없습니다."}
        </EmptyMessage>
      )}

      {/* 모달 컴포넌트 */}
      {selectedRequestId !== null && (
        <RoleCheckModal
          requestId={selectedRequestId}
          onClose={() => setSelectedRequestId(null)}
          onUpdate={handleRoleApproved}
          isApproved={isApply}
        />
      )}
    </ContainerWrapper>
  );
}

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.mutedText || "#888"};
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.background || "#f5f5f5"};
  border-radius: 0.5rem;
  margin: 1rem 0;
`;
