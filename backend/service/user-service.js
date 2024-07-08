const { User } = require("../models/users");

class UserService {
  async createUser(username, email, password) {
    try {
      const user = await User.create(UserData);
      console.log(user);
    } catch (error) {
      throw new Error(`Найди оишбку ${error.message}`);
    }
  }
}

module.exports = UserService;
