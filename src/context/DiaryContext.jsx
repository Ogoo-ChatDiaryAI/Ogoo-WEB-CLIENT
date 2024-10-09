import React, { createContext, useState } from "react";

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [diaries, setDiaries] = useState([
    {
      diaryId: -1, //내가 임시로 정해놓은 거니까
      date: "2024.06.03",
      emoji: "happy",
      image: null,
      title: "Title 1 is title",
      content:
        "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    },
    {
      diaryId: -1,
      date: "2024.06.04",
      emoji: "angry",
      image: null,
      title: "Title 2 is not title",
      content:
        "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    },
    {
      diaryId: -1,
      date: "2024.06.05",
      emoji: "sad",
      image: null,
      title: "Title 3 is title",
      content:
        "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    },
    {
      diaryId: -1,
      date: "2024.06.06",
      emoji: "fear",
      image: null,
      title: "Title 4 is not title",
      content:
        "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    },
  ]);

  return <DiaryContext.Provider value={{ diaries, setDiaries }}>{children}</DiaryContext.Provider>;
};

export default DiaryContext;
