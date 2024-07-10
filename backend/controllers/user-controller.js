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
      return res.json(user);
    } catch (error) {
      console.error("Ошибка при создании пользователя ", error);
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
