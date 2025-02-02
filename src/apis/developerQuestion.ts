import { DevQuestionRequest } from "./developerQuestion.type";
import instance from "./instance";

export const postQuestion = async (
  data: DevQuestionRequest
): Promise<DevQuestionRequest> => {
  try {
    const response = await instance.post<DevQuestionRequest>(
      "/api/v1/developer/question",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
