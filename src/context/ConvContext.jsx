import { useContext, createContext, useState } from "react";
import React from "react";

const ConvContext = createContext();

const ConvContextProvider = ({ children }) => {
  const [conversation, setConversation] = useState([
    {
      text: "오늘 하루는 어땠어? 이야기를 들려줘 😎",
      isUser: false,
      date: new Date().toISOString().split("T")[0],
    },
  ]);

  return (
    <ConvContext.Provider value={{ conversation, setConversation }}>
      {children}
    </ConvContext.Provider>
  );
};

export default ConvContextProvider;

export const useConvContext = () => {
  const context = useContext(ConvContext);
  //context를 사용할 수 없으면 null 반환
  if (!context) {
    throw new Error("useConvContext must be used within a ContextProvider");
  }

  return context;
};
