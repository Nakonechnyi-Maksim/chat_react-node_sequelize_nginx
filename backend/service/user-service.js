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
      throw new Error(`Найди оишбку ${error.message}`);
    }
  }
  async getAllUsers() {
    try {
      response = await User.findAll();
      const { username, status } = response;
      return { username, status };
    } catch (error) {}
  }
}

module.exports = new UserService();
