import React, { useState } from "react";
import {
  FaAngry,
  FaGrimace,
  FaGrinSquint,
  FaMeh,
  FaSadTear,
  FaSmile,
  FaSurprise,
} from "react-icons/fa";
import styled from "styled-components";

const DiaryCardContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (props.type === "detail" ? "auto" : "450px")};
  width: ${(props) => (props.type === "detail" ? "500px" : "350px")};
  min-height: ${(props) => (props.type === "detail" ? "660px" : "auto")};
  cursor: ${(props) => (props.type === "simple" ? "pointer" : "default")};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  top: 0;
  background-color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const DateText = styled.div`
  color: black;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

const ImageContainer = styled.div`
  background-color: #e0e0e0;
  width: 100%;
  max-width: 300px;
  height: auto;
  max-height: 300px;
  aspect-ratio: 1/1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px auto;
  flex-shrink: 0;
`;

const PlaceholderText = styled.div`
  color: #888;
  font-size: 14px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const EditableTitle = styled.input`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border: none;
  background: none;
  width: 100%;
  margin-bottom: 10px;
`;

const CardTitle = styled.h2`
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const EditableContent = styled.textarea`
  font-size: 14px;
  color: #555;
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: none;
  background: none;
`;

const DiaryContent = styled.div`
  font-size: 14px;
  color: #555;
  margin-top: 10px;
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#4caf50" : "#ccc")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const DiaryCard = ({ diaryId, date, emoji, image, title, content, type, onClick, onSave }) => {
  const Icon =
    emoji === "happy"
      ? FaGrinSquint
      : emoji === "sad"
        ? FaSadTear
        : emoji === "angry"
          ? FaAngry
          : emoji === "surprise"
            ? FaSurprise
            : emoji === "fear"
              ? FaGrimace
              : emoji === "neutral"
                ? FaMeh
                : FaSmile;

  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableContent, setEditableContent] = useState(content);
  const [selectedImage, setSelectedImage] = useState(image);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSelectedImage(image);
    setEditableTitle(title);
    setEditableContent(content);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave({
      diaryId,
      date,
      emoji,
      image: selectedImage,
      title: editableTitle,
      content: editableContent,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DiaryCardContainer type={type} onClick={type === "simple" ? onClick : null}>
      <CardHeader type={type}>
        <Icon color="#FFD700" size={24} />
        <DateText>{date}</DateText>
      </CardHeader>
      {isEditing ? (
        <ImageContainer
          isEditing={isEditing}
          onClick={() => document.getElementById(`fileInput-${date}`).click()}
        >
          {selectedImage ? (
            <ImagePreview src={selectedImage} alt="Selected" />
          ) : (
            <PlaceholderText>클릭해서 사진 넣기</PlaceholderText>
          )}
          <HiddenFileInput
            id={`fileInput-${date}`}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ImageContainer>
      ) : (
        <ImageContainer type={type}>
          {selectedImage ? (
            <ImagePreview src={selectedImage} alt="사진" />
          ) : (
            <PlaceholderText>사진 없음</PlaceholderText>
          )}
        </ImageContainer>
      )}
      {isEditing ? (
        <EditableTitle value={editableTitle} onChange={(e) => setEditableTitle(e.target.value)} />
      ) : (
        <CardTitle>{editableTitle}</CardTitle> //모달 부분
      )}
      {isEditing ? (
        <EditableContent
          value={editableContent}
          onChange={(e) => setEditableContent(e.target.value)}
        />
      ) : (
        <DiaryContent>{editableContent}</DiaryContent>
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
