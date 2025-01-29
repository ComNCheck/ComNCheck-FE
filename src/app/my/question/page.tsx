"use client";

import React, { useState } from "react";
import styled from "styled-components";
import AddQuestionCard from "../myComponents/AddQuestionCard";
import TitleContainer from "@/components/setting/TitleContainer";
import { theme } from "@/app/styles/theme";
import ContainerWrapper from "@/components/container/ContainerWrapper";
// import { useRouter } from "next/router";

export default function Question() {
  // const router = useRouter();
  const handleSubmit = () => {
    // router.back();
  };

  return (
    <ContainerWrapper>
      <TitleContainer
        title="질문하기"
        description="학과와 관련된 궁금한 점을 마음껏 질문해주세요!"
      />
      <AddQuestionCard onSubmit={handleSubmit} submitButtonText="질문" />
    </ContainerWrapper>
  );
}
