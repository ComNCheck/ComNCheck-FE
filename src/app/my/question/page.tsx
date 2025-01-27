"use client";

import React, { useState } from "react";
import styled from "styled-components";
import SubHeader from "@/components/SubHeader";
import AddQuestionCard from "../components/AddQuestionCard";
import { useRouter } from "next/router";

export default function Question() {
  const router = useRouter();
  const handleSubmit = () => {
    router.back();
  };

  return (
    <Container>
      <SubHeader
        title="질문하기"
        description="학과와 관련된 궁금한 점을 마음껏 질문해주세요!"
      />
      <AddQuestionCard onSubmit={handleSubmit} submitButtonText="질문" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;
  top: 11rem;
`;
