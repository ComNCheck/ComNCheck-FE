"use client";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Home() {
  return (
    <Wrapper>
      <div>splash 화면</div>

      <div>컴퓨터</div>
    </Wrapper>
  );
}
