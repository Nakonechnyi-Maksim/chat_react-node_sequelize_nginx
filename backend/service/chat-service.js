const User = require("../models/users");
const Chats_members = require("../models/chats_members");
const Chats = require("../models/chats");
User.belongsToMany(Chats, { through: Chats_members, foreignKey: "user_id" });
Chats.belongsToMany(User, { through: Chats_members, foreignKey: "chat_id" });

class ChatService {
  async createChat(user_id, chat_partner_id) {
    try {
      console.log("Вошли");
      const chat = await Chats.create({
        chat_name: "Личный диалог",
        chat_type: "Личный диалог",
      });
      console.log("Проверка ", chat);
      const chat_id = chat.chat_id;
      const chatFirstMember = await Chats_members.create({
        chat_id: chat_id,
        user_id: user_id,
      });
      console.log("Проверка ", chatFirstMember);
      const chatSecondMember = await Chats_members.create({
        chat_id: chat_id,
        user_id: chat_partner_id,
      });
      console.log("Проверка ", chatSecondMember);
      console.log(chat, "\n", chatFirstMember, "\n", chatSecondMember);
    } catch (error) {
      throw new Error("PIZDEC ", error);
    }
  }
}

module.exports = new ChatService();
