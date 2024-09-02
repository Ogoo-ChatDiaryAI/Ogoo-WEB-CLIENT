import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DiaryCard from "../components/DiaryCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useDiary } from "../context/useDiary";

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
    if (location.state && location.state.showModal) {
      const newDiary = location.state.newDiary;
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
    setSelectedDiary(null);
  };

  const handleSave = (updatedDiary) => {
    setDiaries((prevDiaries) =>
      prevDiaries.map((diary) => (diary.date === updatedDiary.date ? updatedDiary : diary))
    );
    setSelectedDiary(updatedDiary);
  };

  return (
    <DiaryContainer>
      <Header text={"나의 일기장"} />
      <Sidebar activeItem={"diary"} />
      <CardContainer>
        {diaries.map((diary) => (
          <DiaryCard
            key={diary.date}
            date={diary.date}
            emoji={diary.emoji}
            image={diary.image}
            title={diary.title}
            type="simple"
            onClick={() => handleCardClick(diary)}
          />
        ))}
      </CardContainer>
      {selectedDiary && (
        <Modal onClose={handleCloseModal}>
          <DiaryCard
            date={selectedDiary.date}
            emoji={selectedDiary.emoji}
            image={selectedDiary.image}
            title={selectedDiary.title}
            content={selectedDiary.content}
            type="detail"
            onSave={handleSave}
          />
        </Modal>
      )}
      <Footer />
    </DiaryContainer>
  );
};

export default Diary;
