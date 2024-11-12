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
  const { conversation, setConversation } = useConvContext();

  //초기 생성된 일기를 받아오고, 저장까지 한번에 하는 로직
  const handleEnd = async () => {
    const apiConversation = conversation.map((obj) => ({
      from: obj.isUser ? "user" : "Ogoo",
      text: obj.text,
    }));

    try {
      const response = await instance.post("/chat/end/", {
        //chatSessionID: "아직 안정함", -> 그냥 헤더로 변경하기로 함
        conversation: apiConversation,
      });

      const response2 = await instance.post("/chat/diary/save/", {
        title: response.data.diaryTitle,
        diaryContent: response.data.diaryContent,
        diary_id: response.data.diaryId,
      });
      // 대화 내용 기반으로 일기 생성
      console.log(response2.data.sentiment_analysis.emoji);
      const newDiary = {
        diaryId: response.data.diaryId,
        date: new Date().toLocaleDateString(),
        emoji: response2.data.sentiment_analysis.sentiment,
        image: null,
        title: response.data.diaryTitle,
        content: response.data.diaryContent,
      };

      // DiaryContext를 업데이트하고 Diary 페이지로 이동
      setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
      setConversation([
        {
          text: "오늘 하루는 어땠어? 이야기를 들려줘 😎",
          isUser: false,
          date: new Date().toISOString().split("T")[0],
        },
      ]);
      navigate("/diary", { state: { newDiary, showModal: true } });
    } catch (error) {
      //아직 에러 -> 기본 생기는 거 테스트
      const newDiary = {
        diaryId: -1,
        date: new Date().toLocaleDateString(),
        emoji: "angry",
        image: null,
        title: "테스트",
        content: "테스트입니다",
      };

      // DiaryContext를 업데이트하고 Diary 페이지로 이동
      setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
      navigate("/diary", { state: { newDiary, showModal: true } });
    }
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
