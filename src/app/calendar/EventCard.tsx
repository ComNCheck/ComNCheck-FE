import React from "react";
import styled from "styled-components";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  buttonText: string;
}

export default function EventCard({
  title,
  date,
  location,
  buttonText,
}: EventCardProps) {
  return (
    <CardWrapper>
      <Title>{title}</Title>
      <ul>
        <li>{date}</li>
        <li>{location}</li>
      </ul>
      <Button>{buttonText}</Button>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background: #fff;
  border-radius: 18px;
  border: 3px solid #f3f3f3;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin-top: 1.2rem;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 2.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  float: right;
`;
