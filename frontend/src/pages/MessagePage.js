import { useState, useEffect, useRef, useContext } from "react";
import MessageWrapper from "../wrapper/MessageWrapper";
import ChatContext from "../context/ChatContext";
import UserContext from "../context/UserContext";

import "./MessagePage.css";

export default function Message() {
  const { selectedChatId } = useContext(ChatContext);
  const { isAuth } = useContext(UserContext);
  const reqBody = JSON.stringify({
    chat_id: selectedChatId,
  });
  const [val, setVal] = useState("");
  const [msgs, setMsgs] = useState([]);
  const lastRef = useRef(null);

  useEffect(() => {
    lastRef.current?.lastElementChild?.scrollIntoView();
  }, [msgs]);

  useEffect(() => {
    if (selectedChatId) {
      getAllMsgs();
    }
  }, [selectedChatId]);

  async function getAllMsgs() {
    const req = await fetch("http://176.100.124.148:5000/api/show-dialogue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isAuth.accessToken}`,
      },
      body: reqBody,
    });
    const res = await req.json();
    setMsgs(res);
  }

  async function createMessage() {
    const reqBody = JSON.stringify({
      chat_id: selectedChatId,
      sender_id: isAuth.user_id,
      content: val,
    });
    const req = await fetch("http://176.100.124.148:5000/api/create-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    });
    const res = await req.json();
    setMsgs(res);
    getAllMsgs();
  }

  function displayMessage(msg) {
    setMsgs([...msgs, msg]);
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      await createMessage();
      displayMessage(val);
      setVal("");
    }
  }

  function handleChange(e) {
    setVal(e.target.value);
  }

  return (
    <div className="mainBlockMessage">
      <div className="viewPortMessage">
        <div ref={lastRef} className="displayMessage">
          {msgs.map((el) => (
            <MessageWrapper children={el.mcontent} whoSent={el.sender_id} />
          ))}
        </div>
        <input
          type="text"
          name=""
          id="main_chat_input"
          className="chatInput"
          value={val}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
