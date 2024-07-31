import React, { useLayoutEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import Message from "./Message";

const ChatroomContainer = styled.div`
  margin-left: 100px;
  margin-top: 60px;
  margin-bottom: 64px;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: calc(100% - 124px);
`;

const ChatAreaContainer = styled.div`
  background-color: white;
  padding: 10px;
  overflow-y: auto;
  height: calc(100% - 70px);
`;

const ChatInputContainer = styled.div`
  width: calc(100% - 100px - 10px);
  height: 30px;
  position: fixed;
  bottom: 64px;
  left: 100px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  color: black;
  background-color: white;
  flex-grow: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 14px;
  font-family: Dongle;
`;

const SendButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 50%;
  border: none;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const dotFlashing = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const LoadingDots = styled.div`
  // 로딩 애니메이션
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 20px;
  & span {
    display: block;
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 5px;
    animation: ${dotFlashing} 1s infinite alternate;
  }
  & span:nth-child(2) {
    animation-delay: 0.3s;
  }
  & span:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

const Chatroom = () => {
  const [messages, setMessages] = useState([
    { text: "안녕!", isUser: false, date: "2023-07-29" },
    { text: "오늘 하루는 어땠어??", isUser: false, date: "2023-07-29" },
    {
      text: "오늘 드디어 시험이 끝났어! 마침내 난 자유의 몸이 된거야 우하하",
      isUser: true,
      date: "2023-07-29",
    },
    {
      text: "와! 드디어 끝났구나!! 고생했어! ㅎㅎ 자유의 몸이 된 소감이 어때? 오늘의 계획은 있니?",
      isUser: false,
      date: "2023-07-29",
    },
    {
      text: "너무너무너무 행복해!! 일단 오늘은 하루종일 자고 내일은 콘서트를 보러갈거야 헤헤",
      isUser: true,
      date: "2023-07-30",
    },
    { text: "헉 재밌겠다! 무슨 콘서트야?", isUser: false, date: "2023-07-30" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef();

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜
      setMessages([...messages, { text: newMessage, isUser: true, date: currentDate }]);
      setNewMessage("");
      setLoading(true);

      // 로딩 애니메이션을 잠시 보여준 후 상대방 메시지 추가
      setTimeout(() => {
        setLoading(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "와 대박!", isUser: false, date: currentDate },
        ]);
      }, 1500); // 1.5초 후에 메시지 추가
    }
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  useLayoutEffect(() => {
    // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatroomContainer>
      <ChatAreaContainer ref={chatAreaRef}>
        {messages.map((msg, index) => {
          const showDateDivider = index === 0 || messages[index].date !== messages[index - 1].date;
          return (
            <Message
              key={index}
              text={msg.text}
              isUser={msg.isUser}
              showDateDivider={showDateDivider}
              date={msg.date}
            />
          );
        })}
        {loading && (
          <Message
            text={
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            }
            isUser={false}
            showDateDivider={false}
          />
        )}
      </ChatAreaContainer>
      <ChatInputContainer>
        <Input
          type="text"
          placeholder="메시지 입력"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleEnter}
        />
        <SendButton onClick={handleSendMessage}>
          <FaPaperPlane />
        </SendButton>
      </ChatInputContainer>
    </ChatroomContainer>
  );
};

export default Chatroom;
