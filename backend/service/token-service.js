const jwt = require("jsonwebtoken");
const { Users } = require("../models/associations");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(user_id, refreshToken) {
    const tokenData = await Users.findOne({
      where: { user_id },
    });

    if (tokenData.refreshToken) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const [updateToken] = await Users.update(
      { refreshToken },
      { where: user_id }
    );
    if (updateToken === 0) {
      console.log("No token update");
    } else {
      console.log("User token update successfully");
    }
  }
  async removeToken(refreshToken) {
    const [removedToken] = await Users.update(
      { refreshToken: null },
      { where: { refreshToken } }
    );
    if (removedToken === 0) {
      console.log("No token deleted");
    } else {
      console.log("User token delete successfully");
    }
  }
  async findToken(refreshToken) {
    const userData = await Users.findOne({ where: { refreshToken } });
    return { data: userData.refreshToken };
  }
}

module.exports = new TokenService();
