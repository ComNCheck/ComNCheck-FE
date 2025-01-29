"use client";
import { theme } from "@/app/styles/theme";
import SettingHeader from "@/components/Header/settingHeader";
import ContainerBox from "@/components/setting/ContainerBox";
import TitleContainer from "@/components/setting/TitleContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
  height: 100vh;
  background-color: ${theme.colors.background};
`;
const SettingContainer = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const SemesterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  place-items: center;
  margin: 2.5rem 0 4.8rem 0;
`;
const Items = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.6875rem;
  height: 1.7785rem;
  border-radius: 1.5625rem;
  border: 2px solid
    ${({ selected }) =>
      selected ? theme.colors.primary : theme.colors.mutedText};
  margin-bottom: 0.41rem;
  color: ${({ selected }) =>
    selected ? theme.colors.primary : theme.colors.mutedText};
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 600;
`;
const SubjectContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 1rem;
`;
const Subject = styled.div`
  width: 8.75rem;
  height: 3rem;
  background-color: #faf1f5;
  border: 1px solid #f5e0e9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
`;
const Guide = styled.div`
  margin: 2rem auto 3.25rem 2.19rem;
`;
const TrackItem = styled.div`
  width: 5.3125rem;
  height: 1.93088rem;
  border-radius: 1.25rem;
  background-color: #fbf3db;
  border: 1px solid #fdecc8;
`;
export default function Curriculum() {
  const router = useRouter();
  const defaultSemester = "1-1";
  const semesterItem = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
  const [semesterClick, setSemesterClick] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const semesterQuery = searchParams.get("semester");
    if (!semesterQuery) {
      router.replace(`?semester=${defaultSemester}`);
      setSemesterClick(defaultSemester);
    } else {
      setSemesterClick(semesterQuery);
    }
  }, [router]);

  const handleClick = useCallback(
    (semester: string) => {
      if (semesterClick !== semester) {
        setSemesterClick(semester);
        router.push(`?semester=${semester}`, { scroll: false });
      }
    },
    [router, semesterClick]
  );
  return (
    <Wrapper>
      <SettingHeader />
      <SettingContainer>
        <TitleContainer
          title="학부과목 이수체계도입니다!"
          description={`학년을 클릭하여\n 자신의 학년에 맞는 커리큘럼을 확인해보세요`}
        />
        <ContainerBox>
          <SemesterContainer>
            {semesterItem.map((semester) => (
              <Items
                key={semester}
                selected={semesterClick === semester}
                onClick={() => handleClick(semester)}
              >
                {semester}
              </Items>
            ))}
          </SemesterContainer>
          <SubjectContainer>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
            <Subject></Subject>
          </SubjectContainer>
        </ContainerBox>
        <Guide>
          <TrackItem></TrackItem>
        </Guide>
      </SettingContainer>
    </Wrapper>
  );
}
