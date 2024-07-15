import "./MessageWrapper.css";
// Тудушечка - сделать логическое отображение сообщений я/не я
export default function MessageWrapper({ children, whoSent }) {
  return (
    <div className="msgWrapper">
      <div className="whoSent">
        <p className="msg">{children}</p>
      </div>
    </div>
  );
}
