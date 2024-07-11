const sequelize = require("../db");
const { DataTypes, Sequelize } = require("sequelize");

const Chat = sequelize.define(
  "chats",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      defaultValue: Sequelize.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
  },
  { timestamps: false }
);

module.exports = Chat;
