const { Op } = require("sequelize");
const { Users } = require("../models/associations");
const bcrypt = require("bcrypt");
let response;

class UserService {
  async createUser(username, login, email, password) {
    try {
      const candidateLogin = await Users.findOne({ where: { login } });
      const candidateEmail = await Users.findOne({ where: { email } });
      if (candidateEmail && candidateLogin) {
        throw new Error(`Ну ты ку-ку?`);
      } else if (candidateEmail) {
        throw new Error(`Пользователь с данным email: ${email} уже существует`);
      } else if (candidateLogin) {
        throw new Error(
          `Пользователь с данным логином: ${login} уже зарегестрирован! `
        );
      }
      const password_hash = await bcrypt.hash(password, 5);
      await Users.create({
        username,
        email,
        login,
        password_hash,
      });
      return { msg: "Пользователь успешно создан" };
    } catch (error) {
      throw new Error(`Ошибка при создании пользователя: ${error.message}`);
    }
  }
  async getAllUsers() {
    try {
      response = await Users.findAll({
        where: {
          status: {
            [Op.ne]: null,
          },
        },
      });
      const users = response.map((user) => ({
        id: user.user_id,
        username: user.username,
        status: user.status,
      }));
      return users;
    } catch (error) {
      throw new Error(`Ошибка при получении пользователей: ${error}`);
    }
  }
  async login(email, password) {
    try {
      if (Users.findOne({ where: { email } })) {
        const { user_id, password_hash } = await Users.findOne({
          where: { email },
        });
        const checkPassword = await bcrypt.compare(password, password_hash);
        if (checkPassword) {
          return { user_id: user_id };
        }
        return { msg: "Неверный пароль" };
      } else return false;
    } catch (error) {
      throw new Error(`Ошибка при входе: ${error}`);
    }
  }
}

module.exports = new UserService();
