"use client";
import { theme } from "@/app/styles/theme";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Logo = styled.img`
  width: 7.8125rem;
  height: 7.8125rem;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin: 5rem 0;
`;
const Comment = styled.div`
  color: ${theme.colors.text};
  text-align: center;
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 600;
`;
const HasNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;
const HasNumberLabel = styled.label`
  color: ${theme.colors.text};

  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 900;
`;

const RadioInput = styled.input`
  margin-right: 0.5rem;
`;
export default function FirstLogin() {
  const name = "000";
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };
  return (
    <Wrapper>
      <Logo src="/logo.png" alt="로고" />
      <CommentContainer>
        <Comment>안녕하세요 {name}님</Comment>
        <Comment>Come&Check앱을 다운로드 해주셔서 감사합니다!</Comment>
        <Comment>
          학번 유무를 체크해주시면
          <br /> 바로 앱을 시작할 수 있어요!
        </Comment>
      </CommentContainer>
      <HasNumberContainer>
        <HasNumberLabel>
          <RadioInput
            type="radio"
            name="hasNumber"
            onClick={() => handleClick("/signup")}
          />
          학번이 있어요 ⭕
        </HasNumberLabel>
        <HasNumberLabel>
          <RadioInput type="radio" name="hasNumber" />
          학번이 없어요 ❌
        </HasNumberLabel>
      </HasNumberContainer>
    </Wrapper>
  );
}
