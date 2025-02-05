"use client";

import { theme } from "@/app/styles/theme";
import ContainerBox from "@/components/setting/ContainerBox";
import TitleContainer from "@/components/setting/TitleContainer";
import SettingHeader from "@/components/Header/settingHeader";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { PresidentCouncilResponse } from "@/apis/member.type";
import { getPresidentList } from "@/apis/member";

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
  margin-bottom: 0.56rem;
`;
const FormContainer = styled.div`
  width: 20.625rem;
  max-width: 80vw;
  height: auto;
  border-radius: 0.625rem;
  border: 2px solid ${theme.colors.background};
  font-family: Pretendard;
  padding: 1.62rem;
  margin-bottom: 0.87rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
`;
const Form = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.56rem;
  margin: 0.5rem 0;
`;
const Name = styled.div`
  color: ${theme.colors.text};
  font-size: 1rem;
  font-weight: 600;
`;
const Position = styled.div`
  color: ${theme.colors.mutedText};
  font-size: 0.625rem;
  font-style: normal;
  font-weight: 400;
`;

export default function CouncilList() {
  const councilList = [
    {
      id: 1,
      role: "president",
      name: "박수정",
    },
    {
      id: 2,
      role: "student_council",
      name: "이예림",
      position: "기획국장",
    },
    {
      id: 3,
      role: "student_council",
      name: "이예림",
      position: "기획국장",
    },
    {
      id: 4,
      role: "student_council",
      name: "이예림",
      position: "기획국장",
    },
  ];

  // const president = councilList.find((member) => member.role === "president");
  // const studentCouncil = councilList.filter(
  //   (member) => member.role === "student_council"
  // );

  const [data, setData] = useState<PresidentCouncilResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPresidentList();
        setData(response);
      } catch (error) {
        console.error("학생회 정보 불러오기 실패", error);
      }
    };
    fetchData();
  }, []);

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
            <FormContainer>
              {data?.president && <Name>{data.president.name}</Name>}
            </FormContainer>
            <Label>️🎁 학생회</Label>
            <FormContainer>
              {data?.councilList?.map((list) => (
                <Form key={list.name}>
                  <Name>{list.name}</Name>
                  <Position>{list.position}</Position>
                </Form>
              ))}
            </FormContainer>
          </FormWrapper>
        </ContainerBox>
      </SettingContainer>
    </Wrapper>
  );
}
