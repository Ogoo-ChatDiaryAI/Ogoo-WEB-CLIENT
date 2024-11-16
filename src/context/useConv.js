import { useContext } from "react";
import ConvContext from "./ConvContext";

const useConv = () => {
  const context = useContext(ConvContext);
  if (!context) {
    throw new Error("useConv must be used within a ConvContextProvider");
  }

  return context;
};

export default useConv;
