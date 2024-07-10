const User = require("../models/users");
const bcrypt = require("bcrypt");
let response;

class UserService {
  async createUser(username, email, password) {
    try {
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        throw new Error(`А я тебя знаю, ${email} меняй мыло`);
      }
      const password_hash = await bcrypt.hash(password, 5);
      const user = await User.create({
        username,
        email,
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
