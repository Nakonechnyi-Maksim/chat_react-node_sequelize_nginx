import "./MessageWrapper.css";

export default function MessageWrapper({ children, whoSent }) {
  return (
    <div className="msgWrapper">
      <div className="whoSent">
        <p className="msg">{children}</p>
      </div>
    </div>
  );
}
