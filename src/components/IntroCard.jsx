import React from "react";
import styled from "styled-components";

const IntroCardContainer = styled.div`
  width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`;

const ImageContainer = styled.div`
  width: 400px;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
`;

const Text = styled.div`
  color: black;
  font-size: 20px;
  text-align: left;
  margin-bottom: 20px;
`;

const IntroCard = ({ imageText, cardText }) => {
  return (
    <IntroCardContainer>
      <ImageContainer>
        {/* 실제 서비스 화면 이미지 추가 예정 */}
        <span>{imageText}</span>
      </ImageContainer>
      <Text>{cardText}</Text>
    </IntroCardContainer>
  );
};

export default IntroCard;
