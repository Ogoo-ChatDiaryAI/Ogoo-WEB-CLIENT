import React from "react";
import styled from "styled-components";
import Chatroom from "../components/Chatroom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const ChatContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function Chat() {
  return (
    <ChatContainer>
      <Header text={"오구"} type={"chat"} />
      <Sidebar activeItem={"chat"} />
      <Chatroom></Chatroom>
      <Footer />
    </ChatContainer>
  );
}

export default Chat;
