"use client";

import styled from "styled-components";
import { theme } from "../styles/theme";
import { IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import SettingHeader from "@/components/Header/settingHeader";
import { postLogout } from "@/apis/member";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  border-bottom: 1px solid ${theme.colors.warning};
`;
const Items = styled.div`
  padding: 1rem;
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Icon = styled.div`
  font-size: 1.5rem;
  color: ${theme.colors.secondary};
`;

export default function Setting() {
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };
  const logoutClick = async () => {
    await postLogout();
    router.push("/login");
  };
  return (
    <Wrapper>
      <SettingHeader />
      <ItemContainer>
        <Content onClick={() => handleClick("/setting/toDeveloper")}>
          <Items>개발자에게 하고싶은 말!</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>

        <Content onClick={() => handleClick("/setting/curriculum")}>
          <Items>학부 과목 트랙&이수체계도</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>

        <Content onClick={() => handleClick("/setting/applyRating")}>
          <Items>학생회 등급신청</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>

        <Content onClick={() => handleClick("/setting/list")}>
          <Items>학생회 명단</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>
        <Content onClick={() => handleClick("/privacy-policy.html")}>
          <Items>개인정보처리방침</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>
        <Content onClick={() => handleClick("/terms-of-service.html")}>
          <Items>서비스 이용약관</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>
        <Content>
          <Items onClick={logoutClick}>로그아웃</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>
      </ItemContainer>
    </Wrapper>
  );
}
