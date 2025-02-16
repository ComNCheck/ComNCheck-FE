import { memberType, PresidentCouncilResponse } from "./member.type";
import instance from "./instance";
import axios from "axios";

// 회원가입 시 이미지 제출
export const MemberResponse = async (
  formData: FormData
): Promise<memberType> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post<memberType>(
      `${baseURL}/api/v1/member/student/number`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // 쿠키 허용
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 학생회 리스트 api
export const getPresidentList = async (): Promise<PresidentCouncilResponse> => {
  try {
    const response = await instance.get(
      "/api/v1/member/members/president-council"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 로그아웃 api
export const postLogout = async (): Promise<void> => {
  try {
    await instance.post("/api/v1/member/logout");
  } catch (error) {
    throw error;
  }
};
