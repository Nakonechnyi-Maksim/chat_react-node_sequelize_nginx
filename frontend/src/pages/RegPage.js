import { useEffect, useState } from "react";
import "./RegPage.css";

export default function AuthPage() {
  return (
    <div className="mainAuthBlock">
      <div className="authWrapper">
        <div className="formAuthWrapper">
          <h1>Авторизация</h1>
          <input type="email" className="inputEmail" placeholder="Почта" />
          <input type="password" className="inputPass" placeholder="Пароль" />
          <button className="btnAuth">Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
}
