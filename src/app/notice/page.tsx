"use client";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import SlideHeader from "@/components/Header/SlideHeader";
import styled from "styled-components";
import { theme } from "../styles/theme";
import NoticeCard from "./Component/NoticeCard";
import NoticeCommonCard from "./Component/NoticeCommonCard";
import { FaPenToSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { getEmployNotice, getMajorNotice } from "@/apis/notice";

type UserRole =
  | "ROLE_ADMIN"
  | "ROLE_MAJOR_PRESIDENT"
  | "ROLE_STUDENT_COUNCIL"
  | "ROLE_STUDENT"
  | "ROLE_GRADUATE_STUDENT";

interface UserInfo {
  memberId: number;
  name: string;
  major: string;
  studentNumber: number;
  role: UserRole;
  checkStudentCard: boolean;
}

const mockNotices = [
  {
    id: 1,
    title: "2025학년도 1학기 개강총회",
    date: "2025.09.10(화)",
    dDay: "D-5",
    googleFormLink: "https://www.naver.com/",
  },
  {
    id: 2,
    title: "2025학년도 1학기 개강총회",
    date: "2025.09.10(화)",
    dDay: "D-5",
    googleFormLink: "https://www.naver.com/",
  },
  {
    id: 3,
    title: "2025학년도 1학기 개강총회",
    date: "2025.09.10(화)",
    dDay: "D-5",
    googleFormLink: "https://www.naver.com/",
  },
];

export default function Notice() {
  const [majorNotices, setmajorNotices] = useState<any[]>([]);
  const [employNotices, setemployNotices] = useState<any[]>([]);
  const size = 3;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getMajorNotice(size);
        setmajorNotices(data.content);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      }
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getEmployNotice(size);
        setemployNotices(data.content);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      }
    };
    fetchNotices();
  }, []);
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
        console.log(memberData);
      } catch (error) {
        console.error("회원정보 불러오기 실패: ", error);
      }
    };
    fetchMemberData();
  }, []);

  const router = useRouter();
  const [role, setRole] = useState<UserRole>("ROLE_ADMIN");

  const handleWriteClick = () => {
    router.push("/notice/event/enroll");
  };
  const handleEventClick = () => {
    router.push("/notice/event");
  };
  const handleCollegeClick = () => {
    router.push("/notice/college");
  };
  const handleEmploymentClick = () => {
    router.push("/notice/employment");
  };

  useEffect(() => {
    const memberData = localStorage.getItem("memberData");
    if (memberData) {
      try {
        const parsedData: UserInfo = JSON.parse(memberData);
        setRole(parsedData.role as UserRole);
      } catch (error) {
        console.error("로컬 스토리지 값 안보여짐 에러 :", error);
      }
    }
  }, []);

  return (
    <ContainerWrapper>
      <SlideHeader />
      <ContentContainer>
        <Header>
          <p onClick={handleEventClick}>과행사 공지 확인하기</p>
          {(role === "ROLE_ADMIN" ||
            role === "ROLE_MAJOR_PRESIDENT" ||
            role === "ROLE_STUDENT_COUNCIL") && (
            <WritingBtn onClick={handleWriteClick}>
              글쓰기
              <FaPenToSquare />
            </WritingBtn>
          )}
        </Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {mockNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
        <Header onClick={handleCollegeClick}>학부 공지 확인하기</Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {majorNotices.map((notice, index) => (
              <NoticeCommonCard key={index} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
        <Header onClick={handleEmploymentClick}>취업정보 공지 확인하기</Header>
        <ContentNoticeBox>
          <ScrollContainer>
            {employNotices.map((notice) => (
              <NoticeCommonCard key={notice.id} notice={notice} />
            ))}
          </ScrollContainer>
        </ContentNoticeBox>
      </ContentContainer>
    </ContainerWrapper>
  );
}

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const WritingBtn = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 27rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0.5rem;
  gap: 0.5rem;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ContentNoticeBox = styled.div`
  width: 100%;
  height: 10rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0px 10px ${theme.colors.mutedText};
  overflow: hidden;
`;
const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
