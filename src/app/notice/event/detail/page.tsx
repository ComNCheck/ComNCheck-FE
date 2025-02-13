"use client";

import styled from "styled-components";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import { FaPenToSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import FormWrapper from "@/components/container/FormWrapper";
import Image from "next/image";
import imageSrc from "../../../../../public/logo.png";
import EventBtn from "../../Component/EventBtn";

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 1rem;
`;
const SubHeader = styled.div`
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  width: 100%;
`;
const EventWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const DDayDiv = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  padding-right: 1rem;
`;
const WritingBtn = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
  font-weight: 600;
  width: 90%;
  margin-bottom: 1rem;
`;
const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
`;

const EventText = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  padding: 1rem;
  white-space: pre-wrap;
`;
export default function EventDetail() {
  const router = useRouter();

  const handleWriteClick = () => {
    router.push("/notice/event/enroll");
  };
  const handleNextClick = () => {};
  return (
    <ContainerWrapper>
      <Header>2025학년도 1학기 개강총회</Header>
      <EventWrapper>
        <div>
          <SubHeader>📍일시 - 2025.09.10(화) </SubHeader>
          <SubHeader>📍일시 - 2025.09.10(화) </SubHeader>
          <SubHeader>📍일시 - 2025.09.10(화) </SubHeader>
        </div>
        <DDayDiv>D-5</DDayDiv>
      </EventWrapper>
      <WritingBtn onClick={handleWriteClick}>
        글쓰기
        <FaPenToSquare />
      </WritingBtn>
      <FormWrapper>
        <ImageContainer>
          <StyledImage src={imageSrc} alt="개강총회 이미지" />
        </ImageContainer>
        <EventText>
          {`[한국외대 컴퓨터공학부 2학기 개강총회]

벌써 개강이 다가와 캠퍼스가 북적북적해졌어요.
개강한 컴공 학우분들을 만날 생각에 설레는 마음으로 개총을 진행합니다! 😻

[1부]
📍일시: 9/10 (화) 18:00
📍장소: 공학관 402호

[2부]
📍일시: 9/10 (화) 19:00
📍장소: 치킨마루

[참가비]
우리은행 1002164860192
✓ 과회비 낸 신입생: 무료
✓ 과회비 안 낸 신입생: 25,000원
✓ 과회비 낸 재학생: 5,000원
✓ 과회비 안 낸 20-22학번: 20,000원

https://forms.gle/EcTcN3Gq9Pzzey9x6
구글폼을 통해 신청해 주세요.`}
        </EventText>
      </FormWrapper>
      <EventBtn
        onClick={handleNextClick}
        // disabled={!isFormValid || !selectedFile || !isUploadSuccess}
      />
    </ContainerWrapper>
  );
}
