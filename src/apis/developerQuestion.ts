import {
  AllQuestionResponse,
  DevQuestionRequest,
} from "./developerQuestion.type";
import instance from "./instance";

// 하고싶은 말 입력 api
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

//하고싶은 말 전체 조회 api
export const getAllQuestion = async (): Promise<AllQuestionResponse[]> => {
  try {
    const response = await instance.get<AllQuestionResponse[]>(
      "/api/v1/developer/question"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 해당 질문 삭제 api
export const deleteQustion = async (
  developerQuestionId: number
): Promise<void> => {
  try {
    const response = await instance.delete(
      `/api/v1/developer/questions/${developerQuestionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
