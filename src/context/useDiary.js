import { useContext } from "react";
import DiaryContext from "./DiaryContext";

export const useDiary = () => useContext(DiaryContext);
