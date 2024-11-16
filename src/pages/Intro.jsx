import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Board1 from "../assets/boarding/board1.png";
import Board2 from "../assets/boarding/board2.png";
import Board3 from "../assets/boarding/board3.png";
import Board4 from "../assets/boarding/board4.png";
import Logo from "../assets/logo.png";
import { KAKAO_AUTH_URL } from "../auth/OAuth";
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
    imgSrc: Board1,
    imageText: "오구 채팅 화면",
    cardText: "당신을 위한 따뜻한 AI 친구, 오구와 일상을 공유하세요!",
  },
  {
    imgSrc: Board2,
    imageText: "일기 생성 화면",
    cardText: "오구와 즐겁게 대화하며 손쉽게 감정 일기를 만들어보세요!",
  },
  {
    imgSrc: Board3,
    imageText: "감정 레포트 화면",
    cardText: "오늘의 격언과 오구가 당신을 위해 고심한 조언도 확인해보세요!",
  },
  {
    imgSrc: Board4,
    imageText: "Let's get started!",
    cardText: "이제 로그인하고 오구와 함께 하루를 마무리해봅시다!",
  },
];

const Intro = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();
  //로그인 상태면 HOME으로 가도록! (useEffect 사용해야함)
  useEffect(() => {
    if (isLoggedIn) {
      // console.log("User is logged in, navigating to /home");
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

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

  const handleKakaoAuth = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogin = () => {
    handleKakaoAuth();
  };

  return (
    <IntroContainer>
      <LogoImg src={Logo} alt="Logo" />
      <IntroCard
        imgSrc={cards[currentCard].imgSrc}
        imageText={cards[currentCard].imageText}
        cardText={cards[currentCard].cardText}
      />
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
