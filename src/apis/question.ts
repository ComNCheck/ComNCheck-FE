import instance from "./instance";
import { AllQuestionRequest } from "./question.type";

// MY - 질문하기 post
export const postQuestion = async (data: AllQuestionRequest): Promise<void> => {
  try {
    await instance.post("/api/v1/major/questions", data);
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};
