const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Chats_members = sequelize.define("chats_members", {
  chat_member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "chats",
      key: "chat_id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "user",
      key: "user_id",
    },
  },
});

module.exports = Chats_members;
