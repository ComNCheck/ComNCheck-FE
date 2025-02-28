import instance from "./instance";
import {
  majorEventList,
  majorNoticeList,
  makeEvent,
  makeEventDetail,
} from "./notice.type";
import axios from "axios";

export const getMajorEvent = async (): Promise<majorEventList> => {
  //과행사 게시글 목록 조회 api
  try {
    const response = await instance.get<majorEventList>(`/api/v1/major-event`);
    console.log("과행사 게시글 목록 조회 api 요청 성공", response);
    return response.data;
  } catch (error) {
    console.error("과행사 게시글 목록 조회 api 요청 실패:", error);
    throw error;
  }
};

export const getMajorNotice = async (
  size: number,
  page?: number
): Promise<majorNoticeList> => {
  //학부 게시글 목록 조회 api
  try {
    const response = await instance.get<majorNoticeList>(
      `/api/v1/major/notices/pages`,
      {
        params: {
          size: size,
          page: page,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployNotice = async (
  size: number,
  page?: number
): Promise<majorNoticeList> => {
  //취업 게시글 목록 조회 api
  try {
    const response = await instance.get<majorNoticeList>(
      `/api/v1/employment/notices/pages`,
      {
        params: {
          size: size,
          page: page,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const writeEvent = async (data: FormData): Promise<makeEvent> => {
  //과 행사 게시글 작성
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.post<makeEvent>(
      `${baseURL}/api/v1/major-event`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // FormData에 맞는 Content-Type 설정
        },
        withCredentials: true, // 쿠키 허용
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const inquireEvent = async (
  //특정 과행사 게시글 조회
  majorEventId: number
): Promise<makeEventDetail> => {
  try {
    const response = await instance.get<makeEventDetail>(
      `api/v1/major-event/${majorEventId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const modifyEvent = async (
  data: FormData,
  majorEventId: number
): Promise<makeEvent> => {
  //과 행사 게시글 수정
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const response = await axios.put<makeEvent>(
      `${baseURL}/api/v1/major-event/${majorEventId}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // FormData에 맞는 Content-Type 설정
        },
        withCredentials: true, // 쿠키 허용
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (
  //과행사 게시글 삭제
  majorEventId: number
): Promise<makeEvent> => {
  try {
    const response = await instance.delete<makeEvent>(
      `api/v1/major-event/${majorEventId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
