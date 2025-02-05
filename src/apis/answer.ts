import { AnswerRequest } from "./answer.type";
import instance from "./instance";

// MY - 답변하기 post
export const postAnswer = async (data: AnswerRequest): Promise<void> => {
  try {
    await instance.post("/api/v1/major/answers", data);
  } catch (error) {
    console.error("MY - 답변하기 post API 요청 실패:", error);
    throw error;
  }
};

// MY - 답변 가져오기 get
export const getAnswer = async (questionId: number): Promise<AnswerRequest> => {
  try {
    const response = await instance.get<AnswerRequest>(
      `/api/v1/major/answers/${questionId}`
    );
    return response.data;
  } catch (error) {
    console.error("MY - 답변 가져오기 get API 요청 실패:", error);
    throw error;
  }
};

// MY - 답변하기 put
export const putAnswer = async (
  questionId: number,
  data: AnswerRequest
): Promise<void> => {
  try {
    await instance.put(`/api/v1/major/answers/${questionId}`, data);
  } catch (error) {
    console.error("MY - 답변하기 put API 요청 실패:", error);
    throw error;
  }
};
