import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import useConv from "../context/useConv";
import useGPT from "../context/useGPT";
import Message from "./Message";

const Chatroom = () => {
  const { conversation, setConversation } = useConv();

  //처음엔 전역 변수 conversation으로 초기화, 그 이후 messages 변하면 conversations에 반영
  const [messages, setMessages] = useState(conversation);
  useEffect(() => {
    setConversation(messages);
  }, [messages]);

  //시작은 대략 300토큰 사용 -> 점점 증가하며 1000토큰 사용이 평균, 1백만 토큰(대략 5천원) 사용 가능하다는 가정하에 1000번 대화할 수 있음
  const [newMessage, setNewMessage] = useState("");
  const chatAreaRef = useRef();

  const {
    response,
    loading: gptLoading,
    getGPTResponse,
    messages: gptMessages,
  } = useGPT({
    systemPrompt:
      "너는 오늘 하루 있었던 일을 물어보고, 반말로 대화하며 적절한 질문과 공감을 통해 이야기를 들어주는 친구야. \
      나중에 이 대화를 바탕으로 일기를 작성할 거니까, 일기 쓰기 좋은 흐름으로 대화를 이끌어줘. \
      대답은 간결하게 하고, 이모지를 적절히 사용해서 분위기를 살려줘.\
      내가 겪은 일과 느낀 감정을 구체적으로 표현할 수 있도록 부드럽게 질문을 이어가 줘.",
  });

  useEffect(() => {
    if (response) {
      const currentDate = new Date().toISOString().split("T")[0];
      const gptMessage = { text: response, isUser: false, date: currentDate };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
    }
  }, [response]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const currentDate = new Date().toISOString().split("T")[0];
      const userMessage = { text: newMessage, isUser: true, date: currentDate };

      // 사용자가 보낸 메시지를 추가
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      // GPT로부터 응답 받아오는 로직
      await getGPTResponse(newMessage);
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
        {gptLoading && (
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
  height: 38px;
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
  font-size: 18px;
  font-family: Dongle;
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
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
