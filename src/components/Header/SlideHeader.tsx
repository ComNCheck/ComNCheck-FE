"use client";

import React from "react";
import styled from "styled-components";
import Image from "next/image";
import imageSrc from "../../../public/logo.png";
import bannerBackground from "../../../public/bannerBackground.png";
import { theme } from "@/app/styles/theme";

export default function SlideHeader() {
  return (
    <Header>
      <Overlay />
      <Content>
        <Title>2025학년도 1학기 개강총회</Title>
        <Date>2025.09.10(화) 18:00</Date>
        <Location>[미쳐버린 파닭]에서 만나요</Location>
        <ApplyButton>신청하기</ApplyButton>
      </Content>
      <ImageContainer>
        <StyledImage src={imageSrc} alt="개강총회 이미지" />
      </ImageContainer>
    </Header>
  );
}

const Header = styled.div`
  position: relative;
  width: 23rem;
  height: 10rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 1rem;
  color: white;
  background: url(${bannerBackground.src}) #0077ff 10%;
  background-color: ${theme.colors.primary};
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.primary};
  mix-blend-mode: screen;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const Title = styled.h1`
  color: ${theme.colors.contrast};
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
`;

const Date = styled.p`
  font-size: 1rem;
`;

const Location = styled.p`
  color: ${theme.colors.contrast};
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const ApplyButton = styled.button`
  display: inline-flex;
  width: 87px;
  height: 30px;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 40px;
  background: ${theme.colors.text};
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  width: 8rem;
  height: 8rem;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
`;

const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  object-fit: cover;
`;
