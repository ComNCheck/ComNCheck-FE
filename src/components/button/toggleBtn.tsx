import {
  employAlarmToggle,
  eventAlarmToggle,
  majorAlarmToggle,
} from "@/apis/alarm";
import { theme } from "@/app/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 1.5rem;
`;

const SwitchButton = styled.button<{ active: boolean }>`
  position: relative;
  width: 3rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  background-color: ${({ active }) =>
    active ? theme.colors.primary : theme.colors.mutedText};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0.125rem;
    left: ${({ active }) => (active ? "calc(100% - 1.375rem)" : "0.125rem")};
    width: 1.25rem;
    height: 1.25rem;
    background-color: white;
    border-radius: 50%;
    transition: left 0.3s ease;
  }
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
    <SwitchContainer>
      <SwitchButton onClick={handleToggle} active={isActive}></SwitchButton>
    </SwitchContainer>
  );
};
export default ToggleBtn;
