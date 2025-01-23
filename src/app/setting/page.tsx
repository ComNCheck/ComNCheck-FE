"use client";

import styled from "styled-components";
import { theme } from "../styles/theme";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
`;
const Header = styled.div`
  top: 0;
  height: 4.75rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 0.5rem;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text};
  font-family: Pretendard;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
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
  height: 4.8rem;
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
  return (
    <Wrapper>
      <Header>
        <IoChevronBack fontSize="2rem" />
        설정
      </Header>
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

        <Content>
          <Items>로그아웃</Items>
          <Icon>
            <IoChevronForward />
          </Icon>
        </Content>
      </ItemContainer>
    </Wrapper>
  );
}
