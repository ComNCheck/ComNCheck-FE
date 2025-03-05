"use client";

import { theme } from "@/app/styles/theme";
import Toast from "@/components/modal/toast";
import SettingHeader from "@/components/Header/settingHeader";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleContainer from "@/components/setting/TitleContainer";
import { IoIosArrowDown } from "react-icons/io";
import Form from "@/components/setting/form";
import { roleChangeType } from "@/apis/roleChange.type";
import { roleApply } from "@/apis/roleChange";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
  height: 100vh;//높이 test
`;
const SettingContainer = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.div`
  width: 85vw;
  max-width: 21.875rem;
  height: 65vh;
  //max-height: 32rem;
  padding: 0.625rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(142, 142, 142, 0.25);
  overflow: auto;
`;
const FormWrapper = styled.div`
  margin: 0.88rem 0 0.37rem 0;
  gap: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  text-align: left;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1.9rem;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.3rem;
  height: 1.8125rem;
  color: ${theme.colors.contrast};
  border-radius: 1.25rem;
  border: 2px solid ${theme.colors.text};
  background-color: ${theme.colors.text};
  font-family: Pretendard;
  font-style: normal;
`;

const DropdownContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: "Pretendard";
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

const ArrowIcon = styled(IoIosArrowDown)<{ open: boolean }>`
  transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
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

interface FormValues {
  name: string;
  id: string;
  unit: string;
  position: string;
  role: string;
}
export default function ApplyRating() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    id: "",
    unit: "",
    position: "",
    role: "",
  });
  const [toastVisible, setToastVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("학생");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mapRoleToDisplay = (role: string) => {
    switch (role) {
      case "ROLE_STUDENT":
        return "학생";
      case "ROLE_MAJOR_PRESIDENT":
        return "학생회";
      case "ROLE_GRADUATE_STUDENT":
        return "과회장";
      default:
        return "학생"; // 기본값
    }
  };

  useEffect(() => {
    // 로컬스토리지에서 memberData 가져오기
    const memberData = JSON.parse(localStorage.getItem("memberData") || "{}");
    if (memberData) {
      setValues({
        name: memberData.name || "",
        id: memberData.studentNumber || "",
        unit: memberData.major || "",
        position: memberData.position || "",
        role: memberData.role || "ROLE_STUDENT", // 기본값 설정
      });
      setSelectedRole(mapRoleToDisplay(memberData.role || "ROLE_STUDENT"));
    }
  }, []);
  const handleRoleChange = (role: string) => {
    let roleMapping: string;

    // 사용자가 선택한 값에 따라 서버에 전달할 값을 매핑
    switch (role) {
      case "학생":
        roleMapping = "ROLE_STUDENT";
        break;
      case "학생회":
        roleMapping = "ROLE_MAJOR_PRESIDENT"; 
        break;
      case "과회장":
        roleMapping = "ROLE_GRADUATE_STUDENT"; 
        break;
      default:
        roleMapping = "ROLE_STUDENT"; // 기본값 설정
    }
    setSelectedRole(role);
    setValues((prevValues) => ({ ...prevValues, role: roleMapping }));
    setIsDropdownOpen(false);
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    const textarea = e.target;
    setValues({ ...values, [field]: textarea.value });
  };

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return;
    console.log(values);
    setIsSubmitting(true); //제출 중에 로딩 활성화
    try {
      const data: roleChangeType = {
        name: values.name,
        studentNumber: parseInt(values.id),
        major: values.unit,
        requestPosition: values.position,
        requestRole: values.role,
      };
      await roleApply(data);
      setToastVisible(true);
      // 폼 내용 초기화
      setValues({
        name: "",
        id: "",
        unit: "",
        position: "",
        role: "ROLE_STUDENT",
      });
    } catch (error) {
      console.error("등급신청 실패", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setIsFormValid(
      values.name !== "" &&
        values.id !== "" &&
        values.id.length === 9 &&
        values.unit !== "" &&
        values.position !== ""
    );
  }, [values]);

  return (
    <Wrapper>
      <SettingHeader />
      <SettingContainer>
        <TitleContainer
          title="학생회 등급신청"
          description="학생회 부원 및 과회장만 신청이 가능합니다"
        />
        <FormContainer>
          <FormWrapper>
            <Label>📍이름</Label>
            <Form
              placeholder="이름을 입력해주세요"
              onChange={(e) => handleInput(e, "name")}
              value={values.name}
              hasPlaceholder={false}
              isFilled={values.name.length > 0}
            ></Form>
          </FormWrapper>

          <FormWrapper>
            <Label>📍학번</Label>
            <Form
              placeholder="학번을 입력해주세요"
              onChange={(e) => handleInput(e, "id")}
              value={values.id}
              hasPlaceholder={false}
              isFilled={values.id.length > 0}
            ></Form>
          </FormWrapper>
          <FormWrapper>
            <Label>📍소속 단위</Label>
            <Form
              placeholder={`학생회 단위를 입력해주세요\n(ex: 학과, 단과대학)`}
              onChange={(e) => handleInput(e, "unit")}
              value={values.unit}
              hasPlaceholder={true}
              isFilled={values.unit.length > 0}
            ></Form>
          </FormWrapper>
          <FormWrapper>
            <Label>📍직책</Label>
            <Form
              placeholder={`직책을 입력해주세요\n(ex: 집행국장)`}
              onChange={(e) => handleInput(e, "position")}
              value={values.position}
              hasPlaceholder={true}
              isFilled={values.position.length > 0}
            ></Form>
            <Label>📍등급</Label>
            <DropdownContainer>
              <SelectContainer
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <SelectedValue>{selectedRole}</SelectedValue>
                <ArrowIcon open={isDropdownOpen} />
              </SelectContainer>
              {isDropdownOpen && (
                <DropdownList>
                  {["학생", "학생회", "과회장"].map((option) => (
                    <DropdownItem
                      key={option}
                      onClick={() => handleRoleChange(option)}
                    >
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </DropdownContainer>
          </FormWrapper>
          <ButtonContainer>
            <Button disabled={!isFormValid} onClick={handleSubmit}>
              신청
            </Button>
          </ButtonContainer>
        </FormContainer>
      </SettingContainer>
      {toastVisible && (
        <Toast
          message="등급 신청이 완료되었습니다."
          setToastVisible={setToastVisible}
        />
      )}
    </Wrapper>
  );
}
