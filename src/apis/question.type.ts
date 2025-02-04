// MY - 질문하기 post
export interface QuestionRequest {
  title: string;
  content: string;
  shared: boolean;
}

// MY - 질문하기 get
export interface Answer {
  content: string;
}
export interface AllQuestionResponse {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  answer: Answer[] | null;
}
