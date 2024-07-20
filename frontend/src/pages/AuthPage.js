import { useState, useContext } from "react";
import "./AuthPage.css";
import UserContext from "../context/UserContext";

export default function AuthPage() {
  const { isAuth, setIsAuth } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegUser, setIsRegUser] = useState(true);
  // Тудушечка - Подумать как можно вынести в отдельную функцию следующие две функции
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
    if (res) {
      setIsAuth({
        refreshToken: res.refreshtoken,
        accessToken: res.accessToken,
      });
      console.warn("Пользователь успешно зарегестрирован ", res);
    } else {
      console.warn(
        "Произошла ошибка при регистрации пользователя: ",
        res.error
      );
    }
  }

  async function authUser() {
    const reqBody = JSON.stringify({ email, password });
    const req = await fetch("http://176.100.124.148:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: reqBody,
    });
    const res = await req.json();
    if (res) {
      setIsAuth({
        refreshToken: res.refreshtoken,
        accessToken: res.accessToken,
      });
      console.warn("Пользователь успешно авторизован ", res);
    } else {
      console.warn(
        "Произошла ошибка при авторизации пользователя: ",
        res.error
      );
    }
  }
  async function newUser() {
    setIsRegUser(!isRegUser);
  }
  // Тудушечка - Вынести в отдельные компоненты регистрацию/авторизацию
  return isRegUser ? (
    <div className="mainAuthBlock">
      <div className="authWrapper">
        <div className="formAuthWrapper">
          <h1>Авторизация</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="inputEmail"
            placeholder="Почта"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="inputPass"
            placeholder="Пароль"
          />
          <button className="btnAuth" onClick={authUser}>
            Авторизоваться
          </button>
          <button className="btnAuth" onClick={newUser}>
            Новый пользователь
          </button>
        </div>
      </div>
    </div>
  ) : (
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
          <button className="btnAuth" onClick={regUser}>
            Зарегистрироваться
          </button>
          <button className="btnAuth" onClick={newUser}>
            Авторизоваться
          </button>
        </div>
      </div>
    </div>
  );
}
