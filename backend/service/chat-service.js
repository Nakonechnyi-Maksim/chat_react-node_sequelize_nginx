const User = require("../models/users");
const Chats_members = require("../models/chats_members");
const Chats = require("../models/chats");
User.hasMany(Chats_members, {
  foreignKey: "user_id", // Внешний ключ в таблице Order
  sourceKey: "user_id", // Первичный ключ в таблице User
});
Chats_members.hasMany(Chats, {
  foreignKey: "chat_id",
  sourceKey: "chat_id",
});

class ChatService {
  async createChat(user_id, chat_partner_id) {
    try {
      const chat = await Chats.create({
        chat_name: "Личный диалог",
        chat_type: "Личный диалог",
      });
      const chatFirstMember = await Chats_members.create({
        chat_id: chat.chat_id,
        user_id: user_id,
      });
      const chatSecondMember = await Chats_members.create({
        chat_id: chat.chat_id,
        user_id: chat_partner_id,
      });
      console.log(chat, "\n", chatFirstMember, "\n", chatSecondMember);
    } catch (error) {
      throw new Error("PIZDEC");
    }
  }
}

module.exports = new ChatService();
