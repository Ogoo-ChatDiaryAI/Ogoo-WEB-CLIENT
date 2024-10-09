import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DiaryCard from "../components/DiaryCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useDiary } from "../context/useDiary";
import { instance } from "../api/axios";

const DiaryContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-left: 100px;
  overflow-y: auto;
  flex-grow: 1;
  background-color: white;
  padding: 80px 20px;
`;

const Diary = () => {
  const location = useLocation();
  const { diaries, setDiaries } = useDiary();
  const [selectedDiary, setSelectedDiary] = useState(null);

  useEffect(() => {
    //showModal이 true일 경우
    if (location.state && location.state.showModal) {
      const newDiary = location.state.newDiary; //newDiary를 받아옴
      setDiaries((prevDiaries) => {
        if (!prevDiaries.some((diary) => diary.date === newDiary.date)) {
          return [...prevDiaries, newDiary];
        }
        return prevDiaries;
      });
      setSelectedDiary(newDiary);
    }
  }, [location.state, setDiaries]);

  const handleCardClick = (diary) => {
    setSelectedDiary(diary);
  };

  const handleCloseModal = () => {
    setSelectedDiary(null); //선택된 모달(떠있는 모달)의미하는 듯
  };

  const handleSave = async (updatedDiary) => {
    try {
      const respoonse = await instance.post(`/diary/${updatedDiary.diaryId}`, {
        title: updatedDiary.title,
        diaryContent: updatedDiary.content,
      });

      setDiaries((prevDiaries) =>
        prevDiaries.map((diary) => (diary.diaryId === updatedDiary.diaryId ? updatedDiary : diary))
      );
      setSelectedDiary(updatedDiary);
    } catch (error) {
      //임시로 그냥 대충 저장해둠 (요청 안보내고)
      setDiaries((prevDiaries) =>
        prevDiaries.map((diary) => (diary.diaryId === updatedDiary.diaryId ? updatedDiary : diary))
      );
      setSelectedDiary(updatedDiary);
    }
  };

  return (
    <DiaryContainer>
      <Header text={"나의 일기장"} />
      <Sidebar activeItem={"diary"} />
      <CardContainer>
        {diaries.map((diary) => {
          return (
            <DiaryCard
              key={diary.diaryId}
              diaryId={diary.diaryId}
              date={diary.date}
              emoji={diary.emoji}
              image={diary.image}
              title={diary.title}
              type="simple"
              onClick={() => handleCardClick(diary)}
            />
          );
        })}
      </CardContainer>
      {selectedDiary && (
        <Modal onClose={handleCloseModal}>
          <DiaryCard
            diaryId={selectedDiary.diaryId}
            date={selectedDiary.date}
            emoji={selectedDiary.emoji}
            image={selectedDiary.image}
            title={selectedDiary.title}
            content={selectedDiary.content}
            type="detail"
            onSave={(updatedDiary) => handleSave(updatedDiary)}
          />
        </Modal>
      )}
      <Footer />
    </DiaryContainer>
  );
};

export default Diary;
