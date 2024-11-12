import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DiaryProvider } from "./context/DiaryContext";
import Chat from "./pages/Chat";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import Report from "./pages/Report";
import KakaoAuth from "./pages/KakaoAuth";
import ProtectedRoute from "./routes/ProtectedRoute";
import ConvContextProvider from "./context/ConvContext";

function App() {
  return (
    <AuthProvider>
      <ConvContextProvider>
        <DiaryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
              <Route path="/diary" element={<ProtectedRoute element={<Diary />} />} />
              <Route path="/report" element={<ProtectedRoute element={<Report />} />} />
              <Route path="/oauth/events" element={<KakaoAuth />} />
            </Routes>
          </Router>
        </DiaryProvider>
      </ConvContextProvider>
    </AuthProvider>
  );
}

export default App;
