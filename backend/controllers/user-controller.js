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
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
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
      return res.json(checkAuth);
    } catch (error) {
      console.error("Ошибка при авторизации пользователя: ", error);
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
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
