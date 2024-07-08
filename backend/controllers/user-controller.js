const userService = require("../service/user-service");

class UserController {
  async createUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      console.log("Создание пользователя");
      const user = await userService.createUser(username, email, password);
    } catch (error) {
      console.error("Ошибка при создании пользователя ", error);
      next(error);
    }
  }
}
