import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import MessagePage from "../pages/MessagePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/prof" element={<ProfilePage />} />
      <Route path="/msg" element={<MessagePage />} />
    </Routes>
  );
}
