import React, { createContext, useEffect, useState } from "react";
import { instance } from "../api/axios";

const DiaryContext = createContext();

export const DiaryProvider = ({ children }) => {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await instance.get("/diary/list/");
        setDiaries(response.data.diaries);
      } catch (error) {}
    };
    fetchDiaries();
  }, []);

  return <DiaryContext.Provider value={{ diaries, setDiaries }}>{children}</DiaryContext.Provider>;
};

export default DiaryContext;
