import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Bubble from "../assets/bubble.png";
import Ogoo from "../assets/ogoo.png";
import useGPT from "../context/useGPT";

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useGPT 훅을 초기화합니다.
  const {
    response: gptAdvice,
    loading: gptLoading,
    error: gptError,
    getGPTResponse,
  } = useGPT({
    systemPrompt: "주어진 명언에 대해서 설명하고 관련된 조언을 간단하게 제공해줘.",
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://korean-advice-open-api.vercel.app/api/advice");
        setQuote(response.data);
        setLoading(false);

        // 명언을 가져온 후 GPT로부터 조언을 요청합니다.
        const prompt = `너는 다음을 간단히 설명해주고, 관련해서 조언을 주는 친구야. 항상 반말로 대답하고, 이모지를 적절히 써서 친근하게 이야기해줘: "${response.data.message}"`;
        getGPTResponse(prompt);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    // 명언을 가져오는 함수는 페이지가 처음 로드될 때 한 번만 호출됩니다.
    fetchQuote();
  }, []); // 빈 배열을 의존성으로 설정하여 useEffect가 단 한 번만 실행되도록 함

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <QuoteContainer>
      <QuoteContent>
        {quote && (
          <div>
            <QuoteMsg>"{quote.message}"</QuoteMsg>
            <QuoteAuthor>
              - {quote.author} ({quote.authorProfile})
            </QuoteAuthor>
          </div>
        )}
      </QuoteContent>
      <AdviceContainer>
        <BubbleImg src={Bubble} alt="bubble" />
        <AdviceContent>
          {gptLoading
            ? "너를 위한 조언을 생각해보고 있어!"
            : gptError
              ? "GPT 조언을 불러오는 데 실패했습니다."
              : gptAdvice}
        </AdviceContent>
      </AdviceContainer>
      <QuoteFooter>
        <OgooImg src={Ogoo} />
        오구의 한마디 !
      </QuoteFooter>
    </QuoteContainer>
  );
};

export default Quote;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: black;
`;

const QuoteFooter = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-left: 60px;
`;

const OgooImg = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 15px;
`;

const QuoteContent = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 30px;
  border: 1px solid black;
`;

const QuoteMsg = styled.div`
  font-family: Yeon Sung;
  font-size: 35px;
`;

const QuoteAuthor = styled.div`
  font-family: Jua;
  font-size: 25px;
  text-align: right;
`;

// 이미지와 텍스트를 겹치기 위한 컨테이너
const AdviceContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const BubbleImg = styled.img`
  position: absolute;
  align-items: center;
  width: 80%;
  height: 100%;
  z-index: 1;
`;

// 이미지 위에 나타나는 텍스트
const AdviceContent = styled.div`
  position: relative;
  z-index: 2;
  color: #f5f5f5; // 글자 색상
  font-family: Sunflower;
  font-size: 22px;
  text-align: center;
  padding: 10px;
  width: 70%;
`;
