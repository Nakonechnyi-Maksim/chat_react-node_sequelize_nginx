const userService = require("../service/user-service");

class UserController {
  async createUser(req, res, next) {
    try {
      const { username, login, email, password } = req.body;
      console.log("Создание пользователя");
      const user = await userService.createUser(
        username,
        login,
        email,
        password
      );
      res.cookie("refreshtoken", user.refreshtoken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax", // практические тоже самое для чего нужен cors
        secure: false, // true - https
      });
      return res.json(user);
    } catch (error) {
      console.error("Ошибка при создании пользователя ", error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const checkAuth = await userService.login(email, password);
      if (checkAuth.refreshtoken) {
        res.cookie("refreshtoken", checkAuth.refreshtoken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "lax", // практические тоже самое для чего нужен cors
          secure: false, // true - https
        });
      }
      return res.json(checkAuth);
    } catch (error) {
      console.error("Ошибка при авторизации пользователя: ", error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshtoken } = req.cookies;
      const token = await userService.logout(refreshtoken);
      res.clearCookie("refreshtoken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      console.log(req.cookies);
      const { refreshtoken } = req.cookies;
      const userData = await userService.refresh(refreshtoken);
      res.cookie("refreshtoken", userData.refreshtoken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax", // практические тоже самое для чего нужен cors
        secure: false, // true - https
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.error("Ошибка при получении всех пользователей", error);
      next(error);
    }
  }
}

module.exports = new UserController();
