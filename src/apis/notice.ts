import instance from "./instance";
import { majorEventList, majorNoticeList } from "./notice.type";

export const getMajorEvent = async (): Promise<majorEventList> => {
  //과행사 게시글 목록 조회 api
  try {
    const response = await instance.get<majorEventList>(`/api/v1/major-event`);
    return response.data;
  } catch (error) {
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
