"use client";

import { theme } from "@/app/styles/theme";
import Toast from "@/components/modal/toast";
import SettingHeader from "@/components/Header/settingHeader";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleContainer from "@/components/setting/TitleContainer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
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
  height: 62vh;
  max-height: 32rem;
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

const Form = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== "hasPlaceholder" && prop !== "isFilled",
})<{ hasPlaceholder?: boolean; isFilled: boolean }>`
  width: 20.625rem;
  max-width: 80vw;
  height: ${(props) => (props.hasPlaceholder ? "4.3125rem" : "3.4375rem")};
  border-radius: 0.625rem;
  color: ${(props) =>
    props.isFilled ? theme.colors.text : theme.colors.mutedText};
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 1rem;
  border: 2px solid ${theme.colors.background};
  resize: none;
  overflow: hidden;
  white-space: pre-wrap;
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
interface FormValues {
  name: string;
  id: string;
  unit: string;
  position: string;
}
export default function ApplyRating() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    id: "",
    unit: "",
    position: "",
  });
  const [toastVisible, setToastVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    const textarea = e.target;
    setValues({ ...values, [field]: textarea.value });
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log(values);
    setToastVisible(true);
  };

  useEffect(() => {
    setIsFormValid(
      values.name !== "" &&
        values.id !== "" &&
        values.id.length == 9 &&
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
              onInput={(e) =>
                handleInput(e as React.ChangeEvent<HTMLTextAreaElement>, "name")
              }
              value={values.name}
              hasPlaceholder={false}
              isFilled={values.name.length > 0}
            ></Form>
          </FormWrapper>

          <FormWrapper>
            <Label>📍학번</Label>
            <Form
              placeholder="학번을 입력해주세요"
              onInput={(e) =>
                handleInput(e as React.ChangeEvent<HTMLTextAreaElement>, "id")
              }
              value={values.id}
              hasPlaceholder={false}
              isFilled={values.id.length > 0}
            ></Form>
          </FormWrapper>
          <FormWrapper>
            <Label>📍소속 단위</Label>
            <Form
              placeholder={`학생회 단위를 입력해주세요\n(ex: 학과, 단과대학)`}
              onInput={(e) =>
                handleInput(e as React.ChangeEvent<HTMLTextAreaElement>, "unit")
              }
              value={values.unit}
              hasPlaceholder={true}
              isFilled={values.unit.length > 0}
            ></Form>
          </FormWrapper>
          <FormWrapper>
            <Label>📍직책</Label>
            <Form
              placeholder={`직책을 입력해주세요\n(ex: 집행국장)`}
              onInput={(e) =>
                handleInput(
                  e as React.ChangeEvent<HTMLTextAreaElement>,
                  "position"
                )
              }
              value={values.position}
              hasPlaceholder={true}
              isFilled={values.position.length > 0}
            ></Form>
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
