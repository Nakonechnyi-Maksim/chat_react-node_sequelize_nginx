import { useState, useEffect, useRef } from "react";
import MessageWrapper from "../wrapper/MessageWrapper";

import "./MessagePage.css";

export default function Message() {
  const [val, setVal] = useState("");
  const [msgs, setMsgs] = useState([]);
  const lastRef = useRef(null);

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
            <MessageWrapper>{el}</MessageWrapper>
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
