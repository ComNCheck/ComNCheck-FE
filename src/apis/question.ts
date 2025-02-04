import instance from "./instance";
import { QuestionRequest, AllQuestionResponse } from "./question.type";

// MY - 질문하기 post
export const postQuestion = async (data: QuestionRequest): Promise<void> => {
  try {
    await instance.post("/api/v1/major/questions", data);
  } catch (error) {
    console.error("MY - 질문하기 post API 요청 실패:", error);
    throw error;
  }
};

// MY - 내가 쓴글 조회
export const getQuestion = async (): Promise<AllQuestionResponse[]> => {
  try {
    const response = await instance.get<AllQuestionResponse[]>(
      "/api/v1/major/questions/my"
    );
    return response.data;
  } catch (error) {
    console.error("MY - 내가 쓴글 조회 API 요청 실패:", error);
    throw error;
  }
};

//MY - 내가쓴글 답변완료일 경우, 삭제가능
export const deleteQuestion = async (
  majorQuestionId: number
): Promise<void> => {
  try {
    const response = await instance.delete(
      `/api/v1/major/questions/${majorQuestionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//MY - 내가 쓴글 답변예정일 경우, 수정 가능
export const putQuestion = async (majorQuestionId: number): Promise<void> => {
  try {
    const response = await instance.put(
      `/api/v1/major/questions/${majorQuestionId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
