const Users = require("./users");
const Chats_members = require("./chats_members");
const Chats = require("./chats");
const Messages = require("./messages");

//Связь многие ко многим между моделями users и chats через модель chats_members
Users.belongsToMany(Chats, { through: Chats_members, foreignKey: "user_id" });
Chats.belongsToMany(Users, { through: Chats_members, foreignKey: "chat_id" });

//Связь один ко многим между моделями chats и messages
Chats.hasMany(Messages, { foreignKey: "chat_id" });
Messages.belongsTo(Chats, { foreignKey: "chat_id" });

//Связь один ко многим между таблицами users и messages
Users.hasMany(Messages, { foreignKey: "sender_id" });
Messages.belongsTo(Users, { foreignKey: "sender_id" });

module.exports = { Users, Chats_members, Chats, Messages };
