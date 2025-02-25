import instance from "./instance";

export const eventAlarmToggle = async (keyName: string, status: boolean) => {
  try {
    const response = await instance.post(`/api/v1/member/alarm/major/events`, {
      keyName,
      status,
    });
    return response;
  } catch (error) {
    console.log("과행사 알림: ", error);
  }
};

export const majorAlarmToggle = async (keyName: string, status: boolean) => {
  try {
    const response = await instance.post(`/api/v1/member/alarm/major/notices`, {
      keyName,
      status,
    });
    return response;
  } catch (error) {
    console.log("과공지 알림: ", error);
  }
};

export const employAlarmToggle = async (keyName: string, status: boolean) => {
  try {
    const response = await instance.post(
      `/api/v1/member/alarm/employment/notices`,
      {
        keyName,
        status,
      }
    );
    return response;
  } catch (error) {
    console.log("취업정보알림: ", error);
  }
};
