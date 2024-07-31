import React, { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import Footer from "../components/Footer";
import IntroCard from "../components/IntroCard";
import { useAuth } from "../context/useAuth";

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 60px; /* 푸터 높이만큼 패딩 추가 */
  box-sizing: border-box;
  user-select: none;
`;

const LogoImg = styled.img`
  width: 150px;
  margin-bottom: 10px;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  margin-top: 10px;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  & > div {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 5px;

    &.active {
      background-color: #000;
    }
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#4CAF50")};
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  font-size: 12px;
  text-decoration: none;
`;

const Icon = styled(FaSignInAlt)`
  margin-right: 5px;
`;

const cards = [
  {
    imageText: "오구 채팅 화면",
    cardText: "당신을 위한 따뜻한 AI 친구, 오구와 일상을 공유하세요!",
  },
  {
    imageText: "일기 생성 화면",
    cardText: "오구와의 대화를 바탕으로 만들어지는 일기를 확인해보세요!",
  },
  {
    imageText: "감정 레포트 화면",
    cardText: "매주 오구가 분석한 감정 레포트를 받아보세요!",
  },
  {
    imageText: "Let's get started!",
    cardText: "이제 로그인하고 더 많은 기능을 이용해보세요!",
  },
];

const Intro = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleLogin = () => {
    login();
    navigate("/home");
  };

  return (
    <IntroContainer>
      <LogoImg src={Logo} alt="Logo" />
      <IntroCard imageText={cards[currentCard].imageText} cardText={cards[currentCard].cardText} />
      <NavigationContainer>
        <Button onClick={handlePrev} disabled={currentCard === 0}>
          이전
        </Button>
        <Dots>
          {cards.map((_, index) => (
            <div key={index} className={currentCard === index ? "active" : ""}></div>
          ))}
        </Dots>
        {currentCard < cards.length - 1 ? (
          <Button onClick={handleNext}>다음</Button>
        ) : (
          <Button onClick={handleLogin}>
            <Icon />
            로그인
          </Button>
        )}
      </NavigationContainer>
      <Footer />
    </IntroContainer>
  );
};

export default Intro;
