import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Тудушечка - user можно не использовать а только isAuth
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState({
    refreshToken: null,
    accessToken: null,
  });

  async function checkAuth() {
    try {
      const req = await fetch("http://176.100.124.148:5000/api/refresh", {
        method: "GET",
        credentials: "include",
      });
      const res = await req.json();
      console.warn("Токены ", res);
      if (res.accessToken && res.refreshtoken) {
        setIsAuth({
          refreshToken: res.refreshtoken,
          accessToken: res.accessToken,
        });
        setUser(res.user);
        Cookies.set("refreshtoken", res.refreshtoken, {
          expires: 30,
          secure: false,
          sameSite: "lax",
        });
      }
    } catch (error) {
      console.error("Ошибка при обновлении токена:", error);
      Cookies.remove("refreshtoken");
      setIsAuth({
        refreshToken: null,
        accessToken: null,
      });
      setUser(null);
    }
  }

  useEffect(() => {
    const refreshTokenFromCookies = Cookies.get("refreshtoken");
    console.warn(refreshTokenFromCookies);
    if (!refreshTokenFromCookies) {
      checkAuth();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
