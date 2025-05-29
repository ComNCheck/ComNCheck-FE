import * as React from "react";
import styled, { css } from "styled-components";

interface CalendarProps {
  mode?: string;
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  month?: Date;
  modifiers?: Record<string, (date: Date) => boolean>;
  modifiersClassNames?: Record<string, string>;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function Calendar({
  selected,
  onSelect,
  className,
  month,
  modifiers,
  modifiersClassNames,
}: CalendarProps) {
  // 현재 보여지는 달 상태
  const [viewMonth, setViewMonth] = React.useState<Date>(month ?? new Date());
  // 선택된 날짜 상태
  const [date, setDate] = React.useState<Date | undefined>(
    selected ?? undefined
  );

  // 월 이동
  const moveMonth = (diff: number) => {
    setViewMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + diff);
      return newMonth;
    });
  };

  // 달력 데이터 생성
  const year = viewMonth.getFullYear();
  const monthIdx = viewMonth.getMonth();
  const firstDay = new Date(year, monthIdx, 1);
  const lastDay = new Date(year, monthIdx + 1, 0);
  const firstWeekDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 6주(최대 42칸)로 렌더링
  const calendarCells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    calendarCells.push(new Date(year, monthIdx, d));
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  // 날짜 클릭
  const handleDayClick = (d: Date | null) => {
    if (!d) return;
    setDate(d);
    onSelect?.(d);
  };

  // 상단 날짜 텍스트
  const selectedText =
    date &&
    date.getMonth() === viewMonth.getMonth() &&
    date.getFullYear() === viewMonth.getFullYear()
      ? `${viewMonth.getFullYear()}년 ${viewMonth.getMonth() + 1}월 ${date.getDate()}일`
      : `${viewMonth.getFullYear()}년 ${viewMonth.getMonth() + 1}월`;

  return (
    <div className={className ?? ""}>
      <CalHeader>
        <CalTitle>{selectedText}</CalTitle>
        <NavArrows>
          <ArrowBtn onClick={() => moveMonth(-1)}>&lt;</ArrowBtn>
          <ArrowBtn onClick={() => moveMonth(1)}>&gt;</ArrowBtn>
        </NavArrows>
      </CalHeader>
      <CalTable>
        <thead>
          <tr>
            {WEEKDAYS.map((w) => (
              <th key={w}>{w}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: calendarCells.length / 7 }).map(
            (_, weekIdx) => (
              <tr key={weekIdx}>
                {calendarCells
                  .slice(weekIdx * 7, weekIdx * 7 + 7)
                  .map((cell, i) => {
                    if (!cell)
                      return (
                        <td key={i}>
                          <DayEmpty />
                        </td>
                      );
                    // modifiers 적용
                    let classNames = "";
                    if (modifiers && modifiersClassNames) {
                      Object.entries(modifiers).forEach(([key, fn]) => {
                        if (fn(cell))
                          classNames += " " + (modifiersClassNames[key] ?? "");
                      });
                    }
                    const isSelected =
                      date &&
                      cell.getFullYear() === date.getFullYear() &&
                      cell.getMonth() === date.getMonth() &&
                      cell.getDate() === date.getDate();
                    return (
                      <td key={i}>
                        <DayCircle
                          className={classNames}
                          $isSelected={isSelected}
                          onClick={() => handleDayClick(cell)}
                        >
                          {cell.getDate()}
                        </DayCircle>
                      </td>
                    );
                  })}
              </tr>
            )
          )}
        </tbody>
      </CalTable>
    </div>
  );
}

const CalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const CalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
`;

const NavArrows = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const ArrowBtn = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #357ae1;
  cursor: pointer;
  padding: 0 0.2rem;
`;

const CalTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.7rem;
  th {
    color: #222;
    font-size: 1.1rem;
    font-weight: 700;
    padding-bottom: 0.5rem;
  }
  td {
    text-align: center;
    padding: 0.2rem;
  }
`;

const DayCircle = styled.div<{ $isSelected?: boolean }>`
  width: 48px;
  height: 48px;
  margin: 0 auto;
  border-radius: 50%;
  background: #e6f0ff;
  color: #2d3a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 2px solid #357ae1;
      background: #fff !important;
      color: #357ae1 !important;
    `}
`;

const DayEmpty = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 auto;
`;
