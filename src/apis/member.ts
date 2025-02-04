import { memberType, PresidentCouncilResponse } from "./member.type";
import instance from "./instance";

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
