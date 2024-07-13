import { useState, useEffect, useRef, useContext } from "react";
import MessageWrapper from "../wrapper/MessageWrapper";
import ChatContext from "../context/ChatContext";

import "./MessagePage.css";

export default function Message() {
  const chat_id = useContext(ChatContext);
  const reqBody = JSON.stringify({
    chat_id: chat_id.selectedChatId,
  });
  const [val, setVal] = useState("");
  const [msgs, setMsgs] = useState([]);
  const lastRef = useRef(null);
  useEffect(() => {
    (async function getAllMessage() {
      const req = await fetch("http://176.100.124.148:5000/api/show-dialogue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: reqBody,
      });
      const res = await req.json();
      setMsgs(res);
    })();
  }, [reqBody]);
  useEffect(() => {
    lastRef.current?.lastElementChild?.scrollIntoView();
  }, [msgs]);

  function displayMessage(msg) {
    setMsgs([...msgs, msg]);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
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
            <MessageWrapper>{el.mcontent}</MessageWrapper>
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
