const User = require("../models/users");
const bcrypt = require("bcrypt");
let response;

class UserService {
  async createUser(username, login, email, password) {
    try {
      const candidateLogin = await User.findOne({ where: { login } });
      const candidateEmail = await User.findOne({ where: { email } });
      if (candidateEmail) {
        throw new Error(`Пользователь с данным email: ${email} уже существует`);
      } else if (candidateLogin) {
        throw new Error(
          `Пользователь с данным логином: ${login} уже зарегестрирован! `
        );
      } else if (candidateEmail && candidateLogin) {
        throw new Error(`Ну ты ку-ку?`);
      }
      const password_hash = await bcrypt.hash(password, 5);
      const created_at = getCurrentFormattedTime();
      const user = await User.create({
        username,
        email,
        login,
        password_hash,
        created_at,
      });
      console.log(user);
    } catch (error) {
      throw new Error(`Найди оишбку ${error.message}`);
    }
  }
  async getAllUsers() {
    try {
      response = await User.findAll({ attributes: ["username", "status"] });
      return response;
    } catch (error) {}
  }
}

function getCurrentFormattedTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Месяцы от 0 до 11
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = new UserService();
