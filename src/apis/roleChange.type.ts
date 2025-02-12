// 등급신청 폼 api
export interface roleChangeType {
  name: string;
  studentNumber: number;
  major: string;
  requestPosition: string;
  requestRole: string;
}

// 과회장 - 등급 신청 목록 api
export interface roleChangeListType {
  requestId: number;
  name: string;
  requestPosition: string;
}

// 과회장 - 등급 신청 목록 api - 특정 신청 목록 값
export interface roleChangeDetailType {
  requestId: number;
  memberId: number;
  name: string;
  major: string;
  studentNumber: number;
  position: string;
  status: string;
}
