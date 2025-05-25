"use client";

import { theme } from "@/app/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleContainer from "@/components/setting/TitleContainer";
import Form from "@/components/setting/form";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import EventBtn from "../../Component/EventBtn";
import { useRouter } from "next/navigation";
import { writeAnotherEvent } from "@/apis/notice";
import InputForm from "@/components/notice/inputForm";

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
  eventName: string;
  date: string;
  time: string;
  location: string;
  notice: string;
  googleFormLink: string;
  cardNewsImages: string[]; // 이미지 URL 배열
  parsedDate: string; // 날짜
  parsedTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }; // 시간
}

export default function AnotherEventEnroll() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>({
    eventName: "",
    date: "",
    time: "",
    location: "",
    notice: "",
    googleFormLink: "",
    cardNewsImages: [],
    parsedDate: "",
    parsedTime: {
      hour: 0,
      minute: 0,
      second: 0,
      nano: 0,
    },
  });
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      values.eventName !== "" &&
        values.date !== "" &&
        values.time !== "" &&
        values.location !== "" &&
        values.notice !== "" &&
        values.googleFormLink !== "" &&
        values.cardNewsImages.length > 0
    );
  }, [values]);

  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: string
  ) => {
    const textarea = e.target;
    setValues({ ...values, [field]: textarea.value });
  };
  const handleDateInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const input = e.target;
    setValues({ ...values, [field]: input.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;
      setSelectedFile(files);
      setIsUploadSuccess(true); // 업로드 성공 처리
      const fileUrls: string[] = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      ); // 파일을 URL로 변환
      setValues((prevValues) => ({
        ...prevValues,
        cardNewsImages: fileUrls, // URL 배열로 업데이트
      }));
    }
  };

  const handleNextClick = async () => {
    if (isFormValid && selectedFile && isUploadSuccess) {
      try {
        const formData = new FormData();
        console.log("폼 데이터:", { ...values });

        // eventName만 사용
        formData.append("eventName", values.eventName);

        // 나머지 데이터도 포함
        formData.append("date", values.date);
        formData.append("time", values.time);
        formData.append("location", values.location);
        formData.append("notice", values.notice);
        formData.append("googleFormLink", values.googleFormLink);

        // 이미지 파일 추가 (파일을 formData에 추가)
        if (selectedFile) {
          Array.from(selectedFile).forEach((file) => {
            formData.append("cardNewsImages", file); // 실제 파일을 cardNewsImages라는 이름으로 추가
          });
        }

        // 날짜와 시간 데이터 추가
        formData.append("parsedDate", values.parsedDate); // parsedDate 추가
        formData.append(
          "parsedTime",
          JSON.stringify(values.parsedTime) // parsedTime 추가
        );

        const uploadSuccess = await writeAnotherEvent(formData); // FormData를 서버로 전송
        console.log("서버 응답:", uploadSuccess);

        if (uploadSuccess) {
          router.back();
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
              onChange={(e) => handleInput(e, "eventName")}
              value={values.eventName}
              hasPlaceholder={false}
              isFilled={values.eventName.length > 0}
            />
          </FormWrapper>

          {/* <FormWrapper>
            <Label>📍일시</Label>
            <Form
              placeholder="행사가 진행될 날짜를 입력해주세요"
              onChange={(e) => handleInput(e, "date")}
              value={values.date}
              hasPlaceholder={false}
              isFilled={values.date.length > 0}
            />
          </FormWrapper> */}
          <FormWrapper>
            <Label>📍일시</Label>
            <InputForm
              type="date"
              placeholder="행사가 진행될 날짜를 입력해주세요"
              onChange={(e) => handleDateInput(e, "date")}
              value={values.date}
              hasPlaceholder={false}
              isFilled={values.date.length > 0}
            />
          </FormWrapper>

          {/* <FormWrapper>
            <Label>📍시간</Label>
            <Form
              placeholder={`행사가 진행될 시간을 입력해주세요(ex)18:00`}
              onChange={(e) => handleInput(e, "time")}
              value={values.time}
              hasPlaceholder={true}
              isFilled={values.time.length > 0}
            />
          </FormWrapper> */}
          <FormWrapper>
            <Label>📍시간</Label>
            <InputForm
              type="time"
              placeholder="행사가 진행될 시간을 입력해주세요"
              onChange={(e) => handleDateInput(e, "time")}
              value={values.time}
              hasPlaceholder={false}
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
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/* "
              multiple
            />
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
