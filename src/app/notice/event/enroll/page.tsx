"use client";

import { theme } from "@/app/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleContainer from "@/components/setting/TitleContainer";
import Form from "@/components/setting/form";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import EventBtn from "../../Component/EventBtn";
import { useRouter } from "next/navigation";
import { writeEvent } from "@/apis/notice";
import { makeEvent } from "@/apis/notice.type";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31rem;
  height: 100%;
`;

const FormContainer = styled.div`
  width: 85vw;
  max-width: 21.875rem;
  height: 62vh;
  max-height: 32rem;
  padding: 0.625rem;
  border-radius: 0.625rem;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(142, 142, 142, 0.25);
  overflow: auto;
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
`;

interface FormValues {
  name: string;
  date: string;
  time: string;
  location: string;
  notice: string;
  googleFormLink: string;
}

export default function EventEnroll() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    name: "",
    date: "",
    time: "",
    location: "",
    notice: "",
    googleFormLink: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      values.name !== "" &&
        values.date !== "" &&
        values.time !== "" &&
        values.location !== "" &&
        values.notice !== "" &&
        values.googleFormLink !== ""
    );
  }, [values]);

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    const textarea = e.target;
    setValues({ ...values, [field]: textarea.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      // 여기에 파일 업로드 로직을 추가
      // 업로드 성공 시 setIsUploadSuccess(true);
      setIsUploadSuccess(true); // 예시를 위해 항상 true로 설정
    }
  };

  const handleNextClick = async () => {
    if (isFormValid && selectedFile && isUploadSuccess) {
      console.log("Form submitted:", values);
      console.log("File uploaded:", selectedFile);
      // 여기에 다음 페이지로 이동하는 로직을 추가하기

      try {
        const data: makeEvent = {
          eventName: values.name,
          date: values.date,
          time: values.time,
          location: values.location,
          notice: values.notice,
          googleFormLink: values.googleFormLink,
        };
        console.log("데이터 가져오기 전");
        const uploadSuccess = await writeEvent(data);
        console.log("데이터 가져오기 성공 + ");
        if (uploadSuccess) {
          console.log("Event successfully uploaded:", data);
          // 업로드 성공 후, 이전 페이지로 이동하거나 다른 페이지로 리다이렉트
          router.back(); // 혹은 다른 페이지로 리디렉션할 경우 router.push('/next-page');
        }
      } catch (error) {
        console.log("제출에러", error);
      }
    }
  };

  return (
    <Wrapper>
      <ContainerWrapper>
        <TitleContainer
          title="행사를 입력해주세요."
          description={`추가 링크가 필요한 경우\n링크 추가하기 버튼을 통해 링크를 추가해주세요.`}
        />
        <FormContainer>
          <FormWrapper>
            <Label>📍행사명</Label>
            <Form
              placeholder="ex) 2025학년도 1학기 개강총회"
              onChange={(e) => handleInput(e, "name")}
              value={values.name}
              hasPlaceholder={false}
              isFilled={values.name.length > 0}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>📍일시</Label>
            <Form
              placeholder="행사가 진행될 날짜를 입력해주세요"
              onChange={(e) => handleInput(e, "date")}
              value={values.date}
              hasPlaceholder={false}
              isFilled={values.date.length > 0}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>📍시간</Label>
            <Form
              placeholder={`행사가 진행될 시간을 입력해주세요`}
              onChange={(e) => handleInput(e, "time")}
              value={values.time}
              hasPlaceholder={true}
              isFilled={values.time.length > 0}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>📍장소</Label>
            <Form
              placeholder={`행사가 진행될 장소를 입력해주세요`}
              onChange={(e) => handleInput(e, "location")}
              value={values.location}
              hasPlaceholder={true}
              isFilled={values.location.length > 0}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>🍀 공지글</Label>
            <Form
              placeholder={`행사 공지글을 입력해주세요`}
              onChange={(e) => handleInput(e, "notice")}
              value={values.notice}
              hasPlaceholder={true}
              isFilled={values.notice.length > 0}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>🔗 구글폼 링크</Label>
            <Form
              placeholder={`구글폼 링크를 입력해주세요`}
              onChange={(e) => handleInput(e, "googleFormLink")}
              value={values.googleFormLink}
              hasPlaceholder={true}
              isFilled={values.googleFormLink.length > 0}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>🔗 카드뉴스 이미지파일 업로드</Label>
            <input type="file" onChange={handleFileChange} accept="image/*" />
          </FormWrapper>
        </FormContainer>
        <EventBtn
          onClick={handleNextClick}
          disabled={!isFormValid || !selectedFile || !isUploadSuccess}
          text="행사 신청 완료하기"
        />
      </ContainerWrapper>
    </Wrapper>
  );
}
