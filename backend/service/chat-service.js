const { Chats, Chats_members } = require("../models/associations");

class ChatService {
  async createChat(user_id, chat_partner_id) {
    try {
      const checkChat = await Chats_members.findAll({
        where: { user_id: [user_id, chat_partner_id] },
      });
      if (checkChat.length == 0) {
        const chat = await Chats.create({
          chat_name: "Личный",
          chat_type: "Личный",
        });
        const chat_id = chat.chat_id;
        await Chats_members.bulkCreate([
          { chat_id: chat_id, user_id: +user_id },
          { chat_id: chat_id, user_id: +chat_partner_id },
        ]);
        return { msg: "Чат создан" };
      }
      return checkChat;
    } catch (error) {
      throw new Error("Ошибка сервиса при создании чата: ", error);
    }
  }
}

module.exports = new ChatService();
