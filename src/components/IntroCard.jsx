import React from "react";
import styled from "styled-components";

const IntroCardContainer = styled.div`
  width: 800px;
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
  width: 800px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
`;

const BoardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Text = styled.div`
  color: black;
  font-size: 20px;
  text-align: left;
  margin-bottom: 20px;
`;

const IntroCard = ({ imgSrc, imageText, cardText }) => {
  return (
    <IntroCardContainer>
      <ImageContainer>
        <BoardImg src={imgSrc} alt={imageText} />
      </ImageContainer>
      <Text>{cardText}</Text>
    </IntroCardContainer>
  );
};

export default IntroCard;
