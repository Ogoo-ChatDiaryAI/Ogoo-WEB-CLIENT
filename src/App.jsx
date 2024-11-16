import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ConvProvider } from "./context/ConvContext";
import { DiaryProvider } from "./context/DiaryContext";
import Chat from "./pages/Chat";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import KakaoAuth from "./pages/KakaoAuth";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ConvProvider>
        <DiaryProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Intro />} />
              <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
              <Route path="/diary" element={<ProtectedRoute element={<Diary />} />} />
              <Route path="/oauth/events" element={<KakaoAuth />} />
            </Routes>
          </Router>
        </DiaryProvider>
      </ConvProvider>
    </AuthProvider>
  );
}

export default App;
