const { Chats, Chats_members } = require("../models/associations");

class ChatService {
  async createChat(user_id, chat_partner_id) {
    try {
      console.log("Вошли");
      const chat = await Chats.create({
        chat_name: "Личный",
        chat_type: "Личный",
      });
      const chat_id = chat.chat_id;
      const chatMembers = await Chats_members.bulkCreate([
        { chat_id: chat_id, user_id: +user_id },
        { chat_id: chat_id, user_id: +chat_partner_id },
      ]);
      return true;
    } catch (error) {
      throw new Error("Ошибка сервиса при создании чата: ", error);
    }
  }
}

module.exports = new ChatService();
