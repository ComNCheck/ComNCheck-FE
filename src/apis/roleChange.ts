import instance from "./instance";
import { roleChangeType } from "./roleChange.type";

//학생회 등급신청 api
export const roleApply = async (
  data: roleChangeType
): Promise<roleChangeType> => {
  try {
    const response = await instance.post<roleChangeType>(
      "/api/v1/role-change-requests"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
