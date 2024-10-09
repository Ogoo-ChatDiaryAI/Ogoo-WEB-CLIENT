import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDiary } from "../context/useDiary";
import { instance } from "../api/axios";
import { useConvContext } from "../context/ConvContext";

const HeaderContainer = styled.div`
  width: calc(100% - 140px);
  background-color: #fff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 100px;
  z-index: 1;
  user-select: none;
`;

const Title = styled.div`
  font-size: 24px;
  color: black;
`;

const EndChatButton = styled.button`
  font-size: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Header = ({ text, type }) => {
  const navigate = useNavigate();
  const { setDiaries } = useDiary();
  const { conversation } = useConvContext();

  const handleEnd = async () => {
    const apiConversation = conversation.map((obj) => ({
      from: obj.isUser ? "user" : "Ogoo",
      text: obj.text,
    }));

    const response = await instance.post("/chat/end", {
      //chatSessionID: "아직 안정함",
      conversation: apiConversation,
    });

    // 대화 내용 기반으로 일기 생성
    const newDiary = {
      diaryId: response.data.tempDiaryId,
      date: new Date().toLocaleDateString(),
      emoji: response.data.emoji,
      image: null,
      title: response.data.diaryTitle,
      content: response.data.diaryContent,
    };

    // DiaryContext를 업데이트하고 Diary 페이지로 이동
    setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
    navigate("/diary", { state: { newDiary, showModal: true } });
  };

  return (
    <HeaderContainer>
      <Title>{text}</Title>
      {type === "chat" ? (
        <EndChatButton onClick={() => handleEnd()}>대화 종료</EndChatButton>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
