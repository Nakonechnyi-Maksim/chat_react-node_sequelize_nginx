const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Chat = sequelize.define("chats", {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  chat_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chat_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  update_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = Chat;
