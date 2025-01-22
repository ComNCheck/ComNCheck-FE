"use client";

import styled from "styled-components";
import { theme } from "@/app/styles/theme";
import { FaRegAddressCard } from "react-icons/fa6";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { TbSquaresFilled } from "react-icons/tb";
import { useRouter } from "next/navigation";

export default function My() {
  const router = useRouter();
  return (
    <Container>
      <ProfileIcon>
        <FaRegAddressCard />
      </ProfileIcon>
      <Role>학생</Role>
      <Name>이예림</Name>
      <ID>202302351</ID>
      <ButtonContainer>
        <Button onClick={() => router.push("/my/question")}>
          <span>
            <BiSolidQuoteLeft />
          </span>
          질문하기
        </Button>
        <Button onClick={() => router.push("/my/answer")}>
          <span>
            <BiSolidQuoteRight />
          </span>
          답변하기
        </Button>
        <Button onClick={() => router.push("/my/seminar")}>
          <span>
            <TbSquaresFilled />
          </span>
          세미나실
          <br />
          예약 현황
        </Button>
        <Button onClick={() => router.push("/my/writingCheck")}>
          <span>
            <FaCheckCircle />
          </span>
          내가 쓴 글
        </Button>
      </ButtonContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${theme.colors.background};
`;

const ProfileIcon = styled.div`
  font-size: 3rem;
`;

const Role = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.mutedText};
  margin-bottom: 0.5rem;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const ID = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.mutedText};
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  lex-direction: row;
  background-color: ${theme.colors.primary};
  border-radius: 1rem;
  margin: 0rem 3rem;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 1rem;
  width: 5rem;
  height: 5rem;
  font-size: 0.8rem;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 70%;
    background-color: white;
  }

  svg {
    margin-bottom: 0.3rem;
    width: 100%;
    height: 100%;
  }
  span {
    height: 1.5rem;
    width: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;
