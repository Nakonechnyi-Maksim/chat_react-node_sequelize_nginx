import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Message from "../pages/Message";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/msg" element={<Message />} />
    </Routes>
  );
}
