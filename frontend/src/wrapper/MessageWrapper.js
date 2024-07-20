import "./MessageWrapper.css";
import { useContext } from "react";
import UserContext from "../context/UserContext";
// Тудушечка - сделать логическое отображение сообщений я/не я
export default function MessageWrapper({ children, whoSent }) {
  const { isAuth } = useContext(UserContext);
  return (
    <>
      {isAuth.user_id === whoSent ? (
        <div className="myMsgs">
          <div className="msgWrapper">
            <p className="msg">{children}</p>
          </div>
        </div>
      ) : (
        <div className="partnerMsgs">
          <div className="msgWrapper">
            <p className="msg">{children}</p>
          </div>
        </div>
      )}
    </>
  );
}
