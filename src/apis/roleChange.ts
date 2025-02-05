import instance from "./instance";
import { roleChangeType } from "./roleChange.type";

//학생회 등급신청 api
export const roleApply = async (data: roleChangeType): Promise<void> => {
  try {
    await instance.post("/api/v1/role-change-requests", data);
  } catch (error) {
    console.error("학생회 등급신청:", error);
    throw error;
  }
};
