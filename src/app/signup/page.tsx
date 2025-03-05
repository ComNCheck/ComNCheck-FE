"use client";

import styled from "styled-components";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { theme } from "../styles/theme";
import { MdCameraEnhance } from "react-icons/md";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import NextBtn from "@/components/button/nextBtn";
import ExampleImg from "@/components/modal/exampleImg";
import Image from "next/image";
import { MemberResponse } from "@/apis/member";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

interface PictureSpaceProps {
  isActive: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Header = styled.div`
  height: 4rem;
  width: 100%;
  max-width: 31rem;

  box-sizing: border-box;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  color: ${theme.colors.text};
  text-align: right;
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 900;
`;
const Logo = styled.img`
  width: 3.50138rem;
  height: 1.99269rem;
`;
const Login = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 900;
`;
const Title = styled.div`
  margin: 3.5rem 0 2.56rem 0;
  color: ${theme.colors.text};
  font-family: Inter;
  font-size: 1.25rem;
  font-weight: 900;
`;
const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  gap: 1rem;
  color: ${theme.colors.mutedText};
`;
const SubTitle = styled.div`
  font-family: Inter;
  font-size: 0.75rem;
  font-weight: 900;
`;
const SubButton = styled.div`
  width: 0.9375rem;
  height: 0.9375rem;
`;
const PictureSpace = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<PictureSpaceProps>`
  width: 22.25rem;
  //height: 16.8125rem;
  height: 22rem;
  border: ${(props) => (props.isActive ? "none" : "1px solid#d9d9d9")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HiddenInput = styled.input`
  display: none;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default function Signup() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //로딩상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  //const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
      setIsActive(true);
    }
  };
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("파일을 선택해주세요.");
      return;
    }
    setIsLoading(true);
    //formData 생성
    const formData = new FormData();
    formData.append("studentCardImage", selectedFile);

    try {
      const response = await MemberResponse(formData);
      console.log("서버 응답:", response);
      //setIsUploadSuccess(true);
      router.push("/signup/complete");
    } catch (error) {
      console.error("업로드 에러:", error);
      setIsLoading(false);
      //setIsUploadSuccess(false);
    } finally {
      // 로딩 종료
      setIsLoading(false);
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Wrapper>
      <Header>
        <Logo src="/logo.svg" alt="로고" onClick={()=> router.back()}/>
        <Login onClick={() => router.push("/login")}>로그인</Login>
      </Header>
      <Title>회원가입</Title>
      <SubTitleContainer>
        <SubTitle>
          한국외국어대학교 모바일 ID 화면을 캡쳐 후 업로드 해주세요
        </SubTitle>
        <SubButton onClick={toggleModal}>
          <BsFillQuestionCircleFill />
        </SubButton>
      </SubTitleContainer>
      <PictureSpace isActive={isActive} onClick={handlePictureClick}>
        {selectedFile ? (
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="선택된 이미지"
            width={500} // 원하는 기본 크기 설정
            height={50}
            style={{ width: "100%", height: "90%", objectFit: "contain" }}
          />
        ) : (
          <MdCameraEnhance
            color={isActive ? theme.colors.primary : "#d9d9d9"}
          />
        )}
      </PictureSpace>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <NextBtn
        onClick={handleFileUpload}
        disabled={!selectedFile || isLoading}
      />
      {isLoading && (
        <Loader>
          <LoadingSpinner />
        </Loader>
      )}
      {isModalOpen && <ExampleImg onClose={toggleModal}></ExampleImg>}
    </Wrapper>
  );
}
