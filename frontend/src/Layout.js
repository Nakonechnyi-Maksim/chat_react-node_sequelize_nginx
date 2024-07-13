import SideBar from "./wrapper/MainSideBar";
import ChatContext from "./context/ChatContext";
import { useState } from "react";
import "./Layout.css";

export default function Layout({ children }) {
  const [selectedChatId, setSelectedChatId] = useState({});
  return (
    <ChatContext.Provider value={{ selectedChatId, setSelectedChatId }}>
      <div className="layout">
        <SideBar />
        <div className="content">{children}</div>
      </div>
    </ChatContext.Provider>
  );
}
