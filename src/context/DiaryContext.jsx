import React, { createContext, useEffect, useState } from "react";
import { instance } from "../api/axios";

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [diaries, setDiaries] = useState([
    // {
    //   diaryId: -1, //내가 임시로 정해놓은 거니까
    //   date: "2024.06.03",
    //   emoji: "happy",
    //   image: null,
    //   title: "Title 1 is title",
    //   content:
    //     "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    // },
    // {
    //   diaryId: -2,
    //   date: "2024.06.04",
    //   emoji: "angry",
    //   image: null,
    //   title: "Title 2 is not title",
    //   content:
    //     "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    // },
    // {
    //   diaryId: -3,
    //   date: "2024.06.05",
    //   emoji: "sad",
    //   image: null,
    //   title: "Title 3 is title",
    //   content:
    //     "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    // },
    // {
    //   diaryId: -4,
    //   date: "2024.06.06",
    //   emoji: "fear",
    //   image: null,
    //   title: "Title 4 is not title",
    //   content:
    //     "Use the power of AI to help you summarize documents, highlight key points, find specific information, and more.",
    // },
  ]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await instance.get("/diary/list/");
        setDiaries(response.data.diaries); //해당 배열안의 객체에는 iamge 속성 자체가 없긴 함
      } catch (error) {}
    };
    fetchDiaries();
  }, []);

  return <DiaryContext.Provider value={{ diaries, setDiaries }}>{children}</DiaryContext.Provider>;
};

export default DiaryContext;
