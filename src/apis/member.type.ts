// 회원가입 시 이미지 제출
export interface memberType {
  studentCardImage: string;
  memberId: number;
  name: string;
  major: string;
  studentNumber: string;
  role: string;
  checkStudentCard: boolean;
  alarmMajorEvent: boolean;
  alarmMajorNotice: boolean;
  alarmEmploymentNotice: boolean;
}

// 학생회 리스트 반환값
interface Member {
  name: string;
  position: string;
}

interface President {
  name: string;
}
export interface PresidentCouncilResponse {
  president: President;
  councilList: Member[];
}
