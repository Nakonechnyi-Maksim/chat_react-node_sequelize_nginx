import { useState } from "react";
import "./RegPage.css";

export default function AuthPage() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function regUser() {
    const reqBody = JSON.stringify({ username, email, login, password });
    const req = await fetch("http://176.100.124.148:5000/api/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqBody,
    });
    const res = await req.json();
    if (res.ok) {
      setIsAuth(true);
      console.warn("Пользователь успешно зарегестрирован ", res);
    } else {
      console.warn(
        "Произошла ошибка при регистрации пользователя: ",
        res.error
      );
    }
  }

  function handleClick() {
    regUser();
  }

  return (
    <div className="mainAuthBlock">
      <div className="authWrapper">
        <div className="formAuthWrapper">
          <h1>Регистрация</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="type"
            className="inputUsername"
            placeholder="Имя"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="inputEmail"
            placeholder="Почта"
          />
          <input
            onChange={(e) => setLogin(e.target.value)}
            type="login"
            className="inputLogin"
            placeholder="Логин"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="inputPass"
            placeholder="Пароль"
          />
          <button className="btnAuth" onClick={handleClick}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}
