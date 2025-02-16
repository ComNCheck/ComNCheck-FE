import instance from "./instance";
import {
  majorEventList,
  majorNoticeList,
  makeEvent,
  makeEventDetail,
} from "./notice.type";

export const getMajorEvent = async (): Promise<majorEventList> => {
  //과행사 게시글 목록 조회 api
  try {
    const response = await instance.get<majorEventList>(`/api/v1/major-event`);
    console.log("과행사 게시글 목록 조회 api 요청 성공" + response.data);
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

export const writeEvent = async (data: makeEvent): Promise<makeEvent> => {
  //과 행사 게시글 작성
  try {
    const response = await instance.post<makeEvent>(
      `/api/v1/major-event`,
      data
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
