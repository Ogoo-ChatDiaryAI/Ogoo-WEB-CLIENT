const CLIENT_ID = import.meta.env.VITE_KAKAO_API_KEY;

const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI_LOCAL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid`;
