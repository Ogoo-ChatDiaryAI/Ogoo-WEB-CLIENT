import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-end;
  justify-content: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  max-width: 60%;
  padding: 10px 20px;
  border-radius: 10px;
  border-bottom-right-radius: ${(props) => (props.isUser ? "0" : "10px")};
  border-bottom-left-radius: ${(props) => (props.isUser ? "10px" : "0")};
  background-color: ${(props) => (props.isUser ? "#d3fcef" : "#dcf8c6")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: ${(props) => (props.isUser ? "0 0 0 10px" : "0 10px 0 0")};
  word-break: break-word;
`;

const MessageText = styled.div`
  color: black;
  font-size: 18px;
  font-family: Sunflower;
  line-height: 1.4;
`;

const DateDividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  font-size: 15px;
  color: #888;
  user-select: none;
`;

const Line = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`;

const DateText = styled.div`
  padding: 0 10px;
`;

const Message = ({ text, isUser, showDateDivider, date }) => {
  return (
    <>
      {showDateDivider && (
        <DateDividerContainer>
          <Line />
          <DateText>{date}</DateText>
          <Line />
        </DateDividerContainer>
      )}
      <MessageContainer isUser={isUser}>
        <MessageBubble isUser={isUser}>
          <MessageText>{text}</MessageText>
        </MessageBubble>
      </MessageContainer>
    </>
  );
};

export default Message;
