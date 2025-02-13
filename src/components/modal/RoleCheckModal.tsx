import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { IoMdCloseCircle, IoIosArrowDown } from "react-icons/io";
import { roleChangeDetailType } from "../../apis/roleChange.type";
interface RoleCheckModalProps {
  role: roleChangeDetailType[] | null;
  onClose: () => void;
  onUpdate: (updatedRole: roleChangeDetailType) => void;
}

const RoleCheckModal: React.FC<RoleCheckModalProps> = ({
  role,
  onClose,
  onUpdate,
}) => {
  if (!role || role.length === 0) return null;

  const currentRole = role[0];
  if (!currentRole) return null;

  const [selectedPosition, setSelectedPosition] = useState(
    currentRole.position || ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log("currentRole:", currentRole);

  const handlePositionChange = (newPosition: string) => {
    setSelectedPosition(newPosition);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    const updatedRole = {
      ...currentRole,
      position: selectedPosition,
      status: "APPROVED",
    };
    onUpdate(updatedRole);
    onClose();
  };

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
          { key: "position", label: "신청 직책" },
        ].map(({ key, label }) => (
          <FormWrapper key={key}>
            <Label>{label}</Label>
            <FixedForm>
              {currentRole[key as keyof roleChangeDetailType]}
            </FixedForm>
          </FormWrapper>
        ))}

        <FormWrapper>
          <Label>변경할 직책</Label>
          <DropdownContainer>
            <SelectContainer onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <SelectedValue>{selectedPosition}</SelectedValue>
              <ArrowIcon $open={isDropdownOpen} />
            </SelectContainer>
            {isDropdownOpen && (
              <DropdownList>
                {["학생", "학생회", "과회장"].map((option) => (
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
          <Button onClick={handleSubmit}>등급 수정 완료</Button>
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
