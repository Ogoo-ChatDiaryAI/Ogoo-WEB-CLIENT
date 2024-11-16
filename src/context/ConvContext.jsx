import React, { createContext, useState } from "react";

const ConvContext = createContext();

export const ConvProvider = ({ children }) => {
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

export default ConvContext;
