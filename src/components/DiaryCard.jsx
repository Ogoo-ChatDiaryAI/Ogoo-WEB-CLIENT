import React, { useState } from "react";
import styled from "styled-components";
import Anger from "../assets/emoji/anger.png";
import Negative from "../assets/emoji/negative.png";
import Neutral from "../assets/emoji/neutral.png";
import Positive from "../assets/emoji/positive.png";

const DiaryCardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (props.type === "detail" ? "auto" : "300px")};
  width: ${(props) => (props.type === "detail" ? "500px" : "350px")};
  min-height: ${(props) => (props.type === "detail" ? "580px" : "auto")};
  cursor: ${(props) => (props.type === "simple" ? "pointer" : "default")};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  background-color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const DateText = styled.div`
  color: black;
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const EditableTitle = styled.input`
  color: #555;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  border: none;
  background: none;
  width: 100%;
`;

const CardTitle = styled.h2`
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const EditableContent = styled.textarea`
  font-size: 15px;
  color: #555;
  width: 100%;
  height: 250px;
  border: none;
  background: none;
`;

const DiaryContent = styled.div`
  font-size: 16px;
  color: #555;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#4caf50" : "#ccc")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const DiaryCard = ({ diaryId, date, emoji, title, content, type, onClick, onSave }) => {
  const Icon =
    emoji === "happy"
      ? Positive
      : emoji === "anger"
        ? Anger
        : emoji === "neutral"
          ? Neutral
          : Negative;

  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableContent, setEditableContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditableTitle(title);
    setEditableContent(content);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // console.log(diaryId);
    onSave({
      diaryId,
      date,
      emoji,
      title: editableTitle,
      content: editableContent,
    });
  };

  return (
    <DiaryCardContainer type={type} onClick={type === "simple" ? onClick : null}>
      <CardHeader type={type}>
        <img src={Icon} alt="Emoji" style={{ width: "36px", height: "36px" }} />
        <DateText>{date}</DateText>
      </CardHeader>
      {isEditing ? (
        <EditableTitle value={editableTitle} onChange={(e) => setEditableTitle(e.target.value)} />
      ) : (
        <CardTitle>{title}</CardTitle> //모달 부분
      )}
      {isEditing ? (
        <EditableContent
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
        />
      ) : (
        <DiaryContent>{content}</DiaryContent>
      )}
      {type === "detail" && (
        <ButtonContainer>
          {isEditing ? (
            <>
              <Button onClick={handleCancelClick}>취소</Button>
              <Button primary onClick={handleSaveClick}>
                저장하기
              </Button>
            </>
          ) : (
            <Button primary onClick={handleEditClick}>
              수정하기
            </Button>
          )}
        </ButtonContainer>
      )}
    </DiaryCardContainer>
  );
};

export default DiaryCard;
