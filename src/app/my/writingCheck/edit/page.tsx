"use client";

import React, { useState } from "react";
import styled from "styled-components";
import SubHeader from "@/components/SubHeader";
import { useRouter } from "next/navigation";
import AddQuestionCard from "../../components/AddQuestionCard";

export default function Edit() {
  const router = useRouter();

  const handleSubmit = () => {
    router.back();
  };

  return (
    <Container>
      <SubHeader
        title="내가 쓴 글 수정하기"
        description={
          <>
            내가 작성한 질문들을 한눈에 모아봤어요
            <br />
            답변이 완료된 질문을 수정할 수 없어요.
          </>
        }
      />
      <AddQuestionCard onSubmit={handleSubmit} submitButtonText="수정" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;
  top: 12rem;
`;
