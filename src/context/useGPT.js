import { OpenAI } from "openai";
import { useState } from "react";

const useGPT = ({
  model = "gpt-3.5-turbo", // 기본 모델을 설정합니다.
  initialMessages = [], // 기본 메시지 배열을 설정합니다.
  systemPrompt = "너는 사용자와 대화를 나누는 챗봇이야. 항상 반말로 대답해.", // 기본 시스템 프롬프트
} = {}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // OpenAI configuration 설정
  const configuration = {
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  };
  const openai = new OpenAI(configuration);

  // GPT-3.5 모델에 대화를 보내고 응답을 받는 함수
  const getGPTResponse = async (userMessage) => {
    setLoading(true);
    setError(null);

    const updatedMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
      { role: "user", content: userMessage },
    ];

    try {
      const result = await openai.chat.completions.create({
        model,
        messages: updatedMessages,
      });

      const gptResponse = result.choices[0].message.content;
      setResponse(gptResponse);

      // 메시지 상태 업데이트
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: userMessage },
        { role: "assistant", content: gptResponse },
      ]);
    } catch (err) {
      setError("GPT 응답을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return { response, messages, loading, error, getGPTResponse };
};

export default useGPT;
