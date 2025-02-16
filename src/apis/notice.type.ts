export interface majorEventList {
  //과행사 공지사항 목록 api
  eventName: string;
  date: string;
  time: Time;
  googleFormLink: string;
}
export interface Time {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface majorNoticeList {
  //학부 공지사항 목록 api
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content[];
}

export interface employmentNoticeList {
  //취업정보 공지사항 목록 api
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content[];
}

export interface Content {
  title: string;
  date: string;
  link: string;
  notice_id: number;
}

export interface makeEvent {
  eventName: string;
  date: string;
  time: string;
  location: string;
  notice: string;
  googleFormLink: string;
  cardNewsImages: string[]; // 이미지 URL 배열
  parsedDate?: string; // 날짜 형식
  parsedTime?: {
    hour: number;
    minute: number;
    second: number;
    nano: number;
  }; // 시간 정보
}

export interface makeEventDetail {
  //과행사 공지 단건조회
  id: number;
  eventName: string;
  date: string;
  time: Time;
  location: string;
  notice: string;
  googleFormLink: string;
  cardNewsImageUrls?: string[];
}
