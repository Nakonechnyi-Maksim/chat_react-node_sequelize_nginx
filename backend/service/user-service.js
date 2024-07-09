const User = require("../models/users");
let response;

class UserService {
  async createUser(username, email, password) {
    try {
      const password_hash = password;
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
