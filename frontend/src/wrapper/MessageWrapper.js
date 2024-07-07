import "./MessageWrapper.css";

export default function MessageWrapper({ children }) {
  return (
    <div className="msgWrapper">
      <div>
        <p className="msg">{children}</p>
      </div>
    </div>
  );
}
