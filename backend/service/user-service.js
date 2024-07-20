const { Op } = require("sequelize");
const { Users } = require("../models/associations");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../DTO/UserDto");
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
      } else {
        const password_hash = await bcrypt.hash(password, 5);
        const user = await Users.create({
          username,
          email,
          login,
          password_hash,
        });
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({ ...userDto });
        await tokenService.saveToken(userDto.user_id, tokens.refreshtoken);
        return { ...tokens, user: userDto };
      }
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
    const user = await Users.findOne({ where: { email } });
    try {
      if (user) {
        const { password_hash } = await Users.findOne({ where: { email } });
        const checkPassword = await bcrypt.compare(password, password_hash);
        if (checkPassword) {
          const userDto = new UserDto(user);
          const tokens = tokenService.generateToken({ ...userDto });
          await tokenService.saveToken(userDto.user_id, tokens.refreshtoken);
          return { ...tokens, user_id };
        } else {
          return { message: "Неправильный пароль" };
        }
      } else {
        return { message: "Пользователя с такой почтой нет" };
      }
    } catch (error) {
      throw new Error(`Ошибка при входе: ${error}`);
    }
  }
  async logout(refreshtoken) {
    const token = await tokenService.removeToken(refreshtoken);
    return token;
  }
  async refresh(refreshtoken) {
    if (!refreshtoken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshtoken);
    const tokenFromDb = await tokenService.findToken(refreshtoken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();