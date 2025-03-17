"use client";

import styled from "styled-components";
import { theme } from "../styles/theme";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  margin: 1.38rem;
`;
const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;
const Alert = styled.div`
  color: ${theme.colors.text};
  font-weight: 500;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
`;
const GoogleBtn = styled.div`
  width: 21rem;
  height: 3.82rem;
  padding: 1.1875rem 3.25rem;
  border-radius: 3.125rem;
  border: 1px solid #b6b6b6;
  font-size: 1.25rem;
  font-weight: 500;
  gap: 0.625rem;
  font-family: Inter;
  font-size: 1.25rem;
  line-height: 1.25rem;

  margin-top: 4rem;
  display: inline-flex;
  align-items: center;

  &:hover {
    background-color: #f1f1f1;
  }

  &:active {
    background-color: #e0e0e0;
    transform: scale(0.97);
  }
`;
const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.44rem;
  margin: 1rem;
`;
const AnsAccount = styled.div`
  color: ${theme.colors.mutedText};
  font-size: 1rem;
  font-weight: 500;
  font-family: Inter;
`;
const AskManager = styled.div`
  color: ${theme.colors.text};
  font-size: 0.875rem;
  font-weight: 700;
  font-family: Inter;
`;
const TermContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  margin: 1rem;
`
const TermLink = styled.div`
  color: ${theme.colors.text};
  font-size: 0.875rem;
`
export default function Login() {
  const [loginError, setLoginError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    // URL에서 로그인 에러 체크
    if (searchParams.get("error")) {
      console.error("로그인 실패");
      setLoginError(true);
    } else {
      console.log("로그인 페이지 로드됨.");
    }
  }, [searchParams]);

  const handleLogin = () => {
    console.log("Google 로그인 시도 중...");
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseURL}/oauth2/authorize/google`;
  };
  const InstaLink= ()=>{
    window.location.href="https://www.instagram.com/comncheck?igsh=dnRjOXdiaWpoN3Vo";
  }
  const handleClick = (url: string) => {
    router.push(url);
  };
  return (
    <Wrapper>
      <Logo src={`/logo.png`} alt="로고" />
      <AlertContainer>
        <Alert>한국외국어대학교</Alert>
        <Alert>학교 계정으로 로그인해주세요!</Alert>
        {loginError && (
          <Alert style={{ color: "red" }}>
            로그인에 실패했습니다. 다시 시도해주세요.
          </Alert>
        )}
      </AlertContainer>
      <GoogleBtn onClick={handleLogin}>
        <Image src="/GoogleLogo.svg" alt="구글 로고" width={20} height={20} />
        Sign up with Google
      </GoogleBtn>
      <StatusContainer>
        <AnsAccount>아직 학교 계정이 없으신가요?</AnsAccount>
        <AskManager onClick={InstaLink}>관리자에게 문의하기</AskManager>
      </StatusContainer>
      <TermContainer>
        <TermLink onClick={() => handleClick("/terms-of-service.html")}>서비스 이용약관</TermLink>
        <TermLink onClick={() => handleClick("/privacy-policy.html")}>개인정보처리방침</TermLink>
      </TermContainer>
    </Wrapper>
  );
}
