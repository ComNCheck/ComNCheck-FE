// 하고싶은 말 입력하기
export interface DevQuestionRequest {
  id?: number;
  content: string;
}

// 하고싶은 말 전체 조회
export interface AllQuestionResponse {
  id: number;
  content: string;
}
