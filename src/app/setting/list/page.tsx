"use client";

import { theme } from "@/app/styles/theme";
import ContainerBox from "@/components/setting/ContainerBox";
import TitleContainer from "@/components/setting/TitleContainer";
import SettingHeader from "@/components/Header/settingHeader";
import styled from "styled-components";

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

export default function CouncilList() {
  return (
    <Wrapper>
      <SettingHeader />
      <SettingContainer>
        <TitleContainer
          title="학생회 명단"
          description="2025년도 학생회 명단입니다"
        />
        <ContainerBox>
          <FormWrapper>
            <Label>👑 과회장</Label>
            <Label>️🎁 학생회</Label>
          </FormWrapper>
        </ContainerBox>
      </SettingContainer>
    </Wrapper>
  );
}
