const jwt = require("jsonwebtoken");
const { Users } = require("../models/associations");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshtoken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return { accessToken, refreshtoken };
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

  async saveToken(user_id, refreshtoken) {
    const tokenData = await Users.findOne({
      where: { user_id },
    });
    if (tokenData) {
      tokenData.refreshtoken = refreshtoken;
      await tokenData.save();
      return;
    }
    await Users.update({ refreshtoken }, { where: user_id });
  }
  async removetoken(refreshtoken) {
    const [removedToken] = await Users.update(
      { refreshtoken: null },
      { where: { refreshtoken } }
    );
    if (removedToken === 0) {
      console.log("No token deleted");
    } else {
      console.log("User token delete successfully");
    }
  }
  async findToken(refreshtoken) {
    const userData = await Users.findOne({ where: { refreshtoken } });
    return userData ? userData.refreshtoken : null;
  }
}

module.exports = new TokenService();
