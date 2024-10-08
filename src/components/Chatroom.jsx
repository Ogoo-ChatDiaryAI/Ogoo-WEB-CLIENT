import React, { useLayoutEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import Message from "./Message";
import { OpenAI } from "openai";

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
  const configuration = {
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  };
  const openai = new OpenAI(configuration);

  async function callChat() {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Say this is a test" }],
      stream: true,
    });
    for await (const chunk of stream) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
  }
  //"너는 따뜻하게 상대방의 말을 듣고, 대답해주는 사람이야. 그냥 대답만 하는게 아니라, 적절한 질문도 하면서 오늘 하루 있었던 일들을 전부 파악하며, 감정을 잡아 공감해주는 상담사역할이야. 사용자와 대화를 주고 받은 뒤 사용자의 대화 내용으로 일기를 작성할 수 있을만큼 필요한 질문과 반응들을 상대방에게 잘 보여줘야 해."
  const callGPT = async (userInputString) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "넌 오늘 하루 있었던 일을 묻고, 적절한 질문과 공감을 통해 이야기를 반말로 들어주는 상담사야",
        },
        { role: "user", content: userInputString },
      ],
    });
    //console.log("response:", response);
    return response.choices[0].message.content;
  };

  const nickName = "준혁";

  const getNowDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const stringDate = `${year}-${month}-${day}`;

    return stringDate;
  };

  const [messages, setMessages] = useState([
    {
      text: `${nickName}! 오늘 하루는 어땠어? 이야기를 들려줘 😎`,
      isUser: false,
      date: getNowDate(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatAreaRef = useRef();

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜
      setMessages([...messages, { text: newMessage, isUser: true, date: currentDate }]);
      setNewMessage("");
      setLoading(true);

      const response = await callGPT(newMessage);
      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, isUser: false, date: currentDate },
      ]);
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
