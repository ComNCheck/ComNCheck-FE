"use client";

import styled from "styled-components";
import NextBtn from "@/components/button/nextBtn";
const Wrapper = styled.div``;
const Logo = styled.img``;
const MessageCpntainer = styled.div``;
const Message = styled.div``;

export default function Complete() {
  return (
    <Wrapper>
      <Logo></Logo>
      <MessageCpntainer>
        <Message></Message>
        <Message></Message>
        <NextBtn />
      </MessageCpntainer>
    </Wrapper>
  );
}
