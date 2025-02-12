import instance from "./instance";
import {
  roleChangeType,
  roleChangeListType,
  roleChangeDetailType,
} from "./roleChange.type";

//학생회 등급신청 api
export const roleApply = async (data: roleChangeType): Promise<void> => {
  try {
    await instance.post("/api/v1/role-change-requests", data);
  } catch (error) {
    console.error("학생회 등급신청:", error);
    throw error;
  }
};

// MY - 과회장 학생회 등급 신청 목록 조회
export const getRoleChangeList = async (): Promise<roleChangeListType[]> => {
  try {
    const response = await instance.get<roleChangeListType[]>(
      "/api/v1/role-change-requests"
    );
    console.log(
      "MY - 과회장 학생회 등급 신청 목록 조회 API 요청값 : ",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "MY - 과회장 학생회 등급 신청 목록 조회 API 요청 실패:",
      error
    );
    throw error;
  }
};

// MY - 과회장 학생회 등급 신청 목록 조회 - 특정
export const getRoleChangeDetail = async (
  requestId: number
): Promise<roleChangeDetailType[]> => {
  try {
    const response = await instance.get<roleChangeDetailType[]>(
      `/api/v1/role-change-requests/${requestId}`
    );
    console.log(
      "MY - 과회장 학생회 등급 신청 목록 조회 - 특정 API 요청 응답:",
      response.data
    );
    return response.data;
  } catch (error) {
    console.error(
      "MY - 과회장 학생회 등급 신청 목록 조회 - 특정 API 요청 실패:",
      error
    );
    throw error;
  }
};
