const User = require("../models/users");
const bcrypt = require("bcrypt");
let response;

class UserService {
  async createUser(username, login, email, password) {
    try {
      const candidateLogin = await User.findOne({ where: { login } });
      const candidateEmail = await User.findOne({ where: { email } });
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
      const user = await User.create({
        username,
        email,
        login,
        password_hash,
      });
      console.log(user);
    } catch (error) {
      throw new Error(`Ошибка при создании пользователя: ${error.message}`);
    }
  }
  async getAllUsers() {
    try {
      response = await User.findAll();
      const { username, status } = response;
      return { username, status };
    } catch (error) {
      throw new Error(`Ошибка при получении пользователей: ${error}`);
    }
  }
  async login(email, password) {
    try {
      const hashPassword = await bcrypt.hash(password, 5);
      const isAuthUser = await User.findOne({
        where: { email, password_hash: hashPassword },
      });
      if (isAuthUser) {
        return true;
      } else return false;
    } catch (error) {
      throw new Error(`Ошибка при входе: ${error}`);
    }
  }
}

module.exports = new UserService();
