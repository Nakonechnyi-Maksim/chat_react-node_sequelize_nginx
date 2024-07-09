const User = require("../models/users");

class UserService {
  async createUser(username, email, password) {
    try {
      const password_hash = password;
      const user = await User.create({
        // user_id,
        username,
        email,
        password_hash,
      });
      console.log(user);
    } catch (error) {
      throw new Error(`Найди оишбку ${error.message}`);
    }
  }
}

module.exports = new UserService();
