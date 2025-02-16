import { memberType, PresidentCouncilResponse } from "./member.type";
import instance from "./instance";

//로그인

// 회원가입 시 이미지 제출
export const MemberResponse = async (
  formData: memberType
): Promise<memberType> => {
  try {
    const response = await instance.post<memberType>(
      `/api/v1/member/student/number`,
      formData
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
