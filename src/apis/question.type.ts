// MY - 질문하기 post
export interface QuestionRequest {
  title: string;
  content: string;
  shared: boolean;
}

// MY - 질문하기 get
export interface AnswerType {
  id: number;
  content: string;
  questionId: number;
  writerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AllQuestionResponse {
  majorQuestionId: number;
  title: string;
  content: string;
  createdAt: string;
  shared: boolean;
  answer: AnswerType[];
}

export interface AllFAQQuestionResponse {
  majorQuestionId: number;
  title: string;
  content: string;
  createdAt: string;
  shared: boolean;
  answer: AnswerType | null;
}
