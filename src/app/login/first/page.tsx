"use client";
import { theme } from "@/app/styles/theme";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [memberId, setMemberId] = useState<number | null>(() => {
    const storedData = localStorage.getItem("memberData");
    return storedData ? JSON.parse(storedData).memberId : null;
  });
  const [name, setName] = useState<string | null>(() => {
    // 로컬스토리지에서 name 가져오기 (없으면 null)
    const storedData = localStorage.getItem("memberData");
    return storedData ? JSON.parse(storedData).name : null;
  });

  const router = useRouter();

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        console.log(
          "로컬스토리지 memberData:",
          localStorage.getItem("memberData")
        ); //

        const response = await axios.get(
          "http://localhost:8080/api/v1/member",
          {
            withCredentials: true, // 요청 시 쿠키 포함
          }
        );
        console.log("서버에서 받은 memberData:", response.data); //
        const memberData = response.data;
        localStorage.setItem("memberData", JSON.stringify(memberData));

        // 상태 업데이트
        setMemberId(memberData.memberId);
        setName(memberData.name);
        console.log(memberData);
      } catch (error) {
        console.error("회원정보 불러오기 실패: ", error);
      }
    };
    fetchMemberData();
  }, []);
  const handleClick = (url: string) => {
    router.push(`${url}?id=${memberId}`);
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
            disabled={!memberId}
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
