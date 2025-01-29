"use client";

import React, { useState } from "react";
import styled from "styled-components";
import SubHeader from "@/components/Header/SubHeader";
import { useRouter } from "next/navigation";
import AddQuestionCard from "../../myComponents/AddQuestionCard";
import ContainerWrapper from "@/components/container/ContainerWrapper";
import TitleContainer from "@/components/setting/TitleContainer";

export default function Edit() {
  const router = useRouter();

  const handleSubmit = () => {
    router.back();
  };

  return (
    <ContainerWrapper>
      <TitleContainer
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
    </ContainerWrapper>
  );
}
