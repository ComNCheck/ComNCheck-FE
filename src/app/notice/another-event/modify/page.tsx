"use client";

import { theme } from "@/app/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TitleContainer from "@/components/setting/TitleContainer";
import Form from "@/components/setting/form";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import EventBtn from "../../Component/EventBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { modifyAnotherEvent, inquireAnotherEvent } from "@/apis/notice";
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
  cardNewsImages: string[];
  parsedDate: string;
  parsedTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  };
}

export default function AnotherEventModify() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

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
  //const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const eventData = await inquireAnotherEvent(Number(id));
          setValues({
            eventName: eventData.eventName,
            date: eventData.date,
            time: `${eventData.time}`,
            location: eventData.location,
            notice: eventData.notice,
            googleFormLink: eventData.googleFormLink,
            cardNewsImages: eventData.cardNewsImageUrls || [],
            parsedDate: eventData.date,
            parsedTime: eventData.time,
          });
        } catch (error) {
          console.error("Error fetching event data:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
      // setIsUploadSuccess(true); // 업로드 성공 처리
      const fileUrls: string[] = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setValues((prevValues) => ({
        ...prevValues,
        cardNewsImages: fileUrls,
      }));
    }
  };

  const handleNextClick = async () => {
    if (isFormValid && id) {
      try {
        const formData = new FormData();
        formData.append("eventName", values.eventName);
        formData.append("date", values.date);
        formData.append("time", values.time);
        formData.append("location", values.location);
        formData.append("notice", values.notice);
        formData.append("googleFormLink", values.googleFormLink);

        if (selectedFile) {
          Array.from(selectedFile).forEach((file) => {
            formData.append("cardNewsImages", file);
          });
        }

        formData.append("parsedDate", values.parsedDate);
        formData.append("parsedTime", JSON.stringify(values.parsedTime));

        const response = await modifyAnotherEvent(formData, Number(id));
        console.log("Event modified successfully:", response);
        router.back();
      } catch (error) {
        console.error("Error modifying event:", error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <ContainerWrapper>
        <TitleContainer
          title="행사를 수정해주세요."
          description={`수정 사항을 꼼꼼히 확인 후 완료해주세요.`}
        />
        <FormContainer>
          <FormWrapper>
            <Label>📍행사명</Label>
            <Form
              placeholder="ex) 2025학년도 1학기 개강총회"
              onChange={(e) => handleInput(e, "eventName")}
              value={values.eventName}
              hasPlaceholder={false}
              isFilled={!!values.eventName}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>📍일시</Label>
            <InputForm
              type="date"
              placeholder="행사가 진행될 날짜를 입력해주세요"
              onChange={(e) => handleDateInput(e, "date")}
              value={values.date}
              hasPlaceholder={false}
              isFilled={!!values.date}
            />
          </FormWrapper>

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
              isFilled={!!values.location}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>🍀 공지글</Label>
            <Form
              placeholder={`행사 공지글을 입력해주세요`}
              onChange={(e) => handleInput(e, "notice")}
              value={values.notice}
              hasPlaceholder={true}
              isFilled={!!values.notice}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>🔗 구글폼 링크</Label>
            <Form
              placeholder={`구글폼 링크를 입력해주세요`}
              onChange={(e) => handleInput(e, "googleFormLink")}
              value={values.googleFormLink}
              hasPlaceholder={true}
              isFilled={!!values.googleFormLink}
            />
          </FormWrapper>

          <FormWrapper>
            <Label>🔗 카드뉴스 이미지파일 업로드</Label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
          </FormWrapper>
        </FormContainer>
        <EventBtn
          onClick={handleNextClick}
          disabled={!isFormValid}
          text="행사 수정 완료하기"
        />
      </ContainerWrapper>
    </Wrapper>
  );
}
