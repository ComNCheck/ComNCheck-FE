import {
  AllQuestionResponse,
  DevQuestionRequest,
} from "./developerQuestion.type";
import instance from "./instance";

// 개발자에게 하고싶은 말 입력 api
export const postQuestion = async (data: DevQuestionRequest): Promise<void> => {
  try {
    await instance.post("/api/v1/developer/questions", data);
  } catch (error) {
    throw error;
  }
};

//하고싶은 말 전체 조회 api
export const getAllQuestion = async (): Promise<AllQuestionResponse[]> => {
  try {
    const response = await instance.get<AllQuestionResponse[]>(
      "/api/v1/developer/questions"
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
    await instance.delete(`/api/v1/developer/questions/${developerQuestionId}`);
  } catch (error) {
    throw error;
  }
};
