"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { IoMdCloseCircle, IoIosArrowDown } from "react-icons/io";
import { roleChangeDetailType } from "../../apis/roleChange.type";
import {
  getRoleChangeDetail,
  getRoleChangeDetailApprove,
  updateRoleChangeStatus,
} from "../../apis/roleChange";

interface RoleCheckModalProps {
  requestId: number;
  onClose: () => void;
  onUpdate: (updatedRole: roleChangeDetailType) => void;
  isApproved?: boolean;
}

const RoleCheckModal: React.FC<RoleCheckModalProps> = ({
  requestId,
  onClose,
  onUpdate,
  isApproved = false,
}) => {
  const [roleData, setRoleData] = useState<roleChangeDetailType | null>(null);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedRoleCode, setSelectedRoleCode] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 역할 데이터 로드
  useEffect(() => {
    const loadRoleData = async () => {
      if (requestId) {
        try {
          setIsLoading(true);
          console.log("API 호출 시작:", requestId);

          const detail = await getRoleChangeDetail(requestId);
          console.log("API 응답:", detail);

          // 응답이 배열인 경우 첫 번째 항목 사용
          if (Array.isArray(detail) && detail.length > 0) {
            setRoleData(detail[0]);
          }
          // 응답이 객체인 경우 그대로 사용
          else if (detail && typeof detail === "object") {
            setRoleData(detail as roleChangeDetailType);
          }
        } catch (error) {
          console.error("API 호출 오류:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadRoleData();
  }, [requestId]);

  // 역할 데이터가 변경되면 초기값 설정
  useEffect(() => {
    if (roleData) {
      console.log("역할 데이터 설정:", roleData);

      // requestedRole 값을 변환하여 초기값 설정
      let requestedRoleLabel = "학생"; // 기본값
      let requestedRoleCode = "ROLE_STUDENT"; // 기본값

      switch (roleData.requestedRole) {
        case "ROLE_STUDENT":
          requestedRoleLabel = "학생";
          requestedRoleCode = "ROLE_STUDENT";
          break;
        case "ROLE_STUDENT_COUNCIL":
          requestedRoleLabel = "학생회";
          requestedRoleCode = "ROLE_STUDENT_COUNCIL";
          break;
        case "ROLE_MAJOR_PRESIDENT":
          requestedRoleLabel = "과회장";
          requestedRoleCode = "ROLE_MAJOR_PRESIDENT";
          break;
      }
      setSelectedPosition(requestedRoleLabel);
      setSelectedRoleCode(requestedRoleCode);
    }
  }, [roleData]);

  const handlePositionChange = (newPosition: string) => {
    setSelectedPosition(newPosition);

    // 선택한 역할에 따라 코드값 설정
    let roleCode = "";
    switch (newPosition) {
      case "학생":
        roleCode = "ROLE_STUDENT";
        break;
      case "학생회":
        roleCode = "ROLE_STUDENT_COUNCIL";
        break;
      case "과회장":
        roleCode = "ROLE_MAJOR_PRESIDENT";
        break;
      default:
        roleCode = "ROLE_STUDENT";
    }
    setSelectedRoleCode(roleCode);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async () => {
    try {
      if (!roleData?.requestId) {
        console.error("요청 ID가 없습니다.");
        return;
      }

      // 로딩 상태 시작
      setIsLoading(true);

      if (isApproved) {
        // 이미 승인된 상태라면 등급만 변경 (updateRoleChangeStatus 사용)
        console.log("등급 변경 API 호출:", {
          requestId: roleData.requestId,
          status: "APPROVED",
          position: selectedPosition,
          role: selectedRoleCode,
        });
        await updateRoleChangeStatus(
          roleData.requestId,
          "APPROVED",
          selectedPosition,
          selectedRoleCode
        );
      } else {
        // 승인되지 않은 상태라면 승인 처리 (getRoleChangeDetailApprove 사용)
        console.log("승인 API 호출:", roleData.requestId);
        await getRoleChangeDetailApprove(roleData.requestId);
      }

      // 부모 컴포넌트에 업데이트된 역할 정보 전달
      const updatedRole = {
        ...roleData,
        position: selectedPosition,
        requestedRole: selectedRoleCode,
        status: "APPROVED",
      };

      onUpdate(updatedRole);
      onClose();
    } catch (error) {
      console.error("등급 승인 처리 중 오류:", error);
      alert("등급 승인 처리 중 오류가 발생했습니다.");
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };

  // 고정된 드롭다운 옵션
  const roleOptions = ["학생", "학생회", "과회장"];

  if (isLoading) {
    return (
      <ModalOverlay>
        <ModalContent>
          <div style={{ textAlign: "center", padding: "2rem" }}>로딩 중...</div>
        </ModalContent>
      </ModalOverlay>
    );
  }

  if (!roleData) {
    return (
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <IoMdCloseCircle />
          </CloseButton>
          <div style={{ textAlign: "center", padding: "2rem" }}>
            데이터를 불러올 수 없습니다.
          </div>
          <ButtonContainer>
            <Button onClick={onClose}>닫기</Button>
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>
    );
  }

  console.log("렌더링 - roleData:", roleData);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <IoMdCloseCircle />
        </CloseButton>

        {[
          { key: "name", label: "이름" },
          { key: "studentNumber", label: "학번" },
          { key: "major", label: "학과" },
          { key: "position", label: "직책" },
        ].map(({ key, label }) => (
          <FormWrapper key={key}>
            <Label>{label}</Label>
            <FixedForm>{roleData[key as keyof roleChangeDetailType]}</FixedForm>
          </FormWrapper>
        ))}

        <FormWrapper>
          <Label>등급</Label>
          <DropdownContainer>
            <SelectContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <SelectedValue>{selectedPosition}</SelectedValue>
              <ArrowIcon $open={isDropdownOpen} />
            </SelectContainer>
            {isDropdownOpen && (
              <DropdownList>
                {roleOptions.map((option) => (
                  <DropdownItem
                    key={option}
                    onClick={() => handlePositionChange(option)}
                  >
                    {option}
                  </DropdownItem>
                ))}
              </DropdownList>
            )}
          </DropdownContainer>
        </FormWrapper>

        <ButtonContainer>
          <Button onClick={handleSubmit}>
            {isApproved ? "등급 변경하기" : "등급 승인하기"}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RoleCheckModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  position: relative;
`;

const FormWrapper = styled.div`
  margin: 0.88rem 0 0.37rem 0;
  gap: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 1.125rem;
  font-weight: 900;
`;

const FixedForm = styled.div`
  width: 100%;
  height: 3.4375rem;
  border-radius: 0.625rem;
  padding: 1rem;
  border: 3px solid ${theme.colors.background};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1.9rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 1.25rem;
  border: 2px solid ${theme.colors.text};
  background-color: ${theme.colors.text};
  color: ${theme.colors.contrast};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SelectContainer = styled.div`
  width: 100%;
  height: 3.4375rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 2px solid ${theme.colors.background};
  cursor: pointer;
`;

const SelectedValue = styled.div`
  flex: 1;
`;

const ArrowIcon = styled(IoIosArrowDown)<{ $open: boolean }>`
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease-in-out;
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  top: 110%;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.625rem;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;
