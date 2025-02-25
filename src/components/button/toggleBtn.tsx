import {
  employAlarmToggle,
  eventAlarmToggle,
  majorAlarmToggle,
} from "@/apis/alarm";
import { theme } from "@/app/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BiSolidToggleRight, BiToggleLeft } from "react-icons/bi";

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface ToggleBtnProps {
  keyName: string;
  initialState: boolean;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ keyName, initialState }) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const storedData = localStorage.getItem("memberData");
    if (storedData) {
      const memberData = JSON.parse(storedData);
      if (memberData[keyName] !== undefined) {
        setIsActive(memberData[keyName]);
      }
    }
  }, [keyName]);

  // 상태가 변경될 때마다 로컬스토리지에 업데이트하고, API에 전송
  const handleToggle = async () => {
    const newState = !isActive;
    setIsActive(newState);

    const storedData = localStorage.getItem("memberData");
    if (storedData) {
      const memberData = JSON.parse(storedData);
      memberData[keyName] = newState; // 해당 항목 값을 변경
      localStorage.setItem("memberData", JSON.stringify(memberData)); // 업데이트된 memberData를 로컬스토리지에 저장
    }
    // API에 토글 상태 전송
    switch (keyName) {
      case "alarmEmploymentNotice":
        await employAlarmToggle(keyName, newState);
        break;
      case "alarmMajorEvent":
        await eventAlarmToggle(keyName, newState);
        break;
      case "alarmMajorNotice":
        await majorAlarmToggle(keyName, newState);
        break;
      default:
        console.log("알 수 없는 keyName: ", keyName);
        break;
    }
  };

  return (
    <ToggleContainer onClick={handleToggle}>
      {isActive ? (
        <BiSolidToggleRight size={40} color={theme.colors.primary} />
      ) : (
        <BiToggleLeft size={40} color={theme.colors.mutedText} />
      )}
    </ToggleContainer>
  );
};
export default ToggleBtn;
