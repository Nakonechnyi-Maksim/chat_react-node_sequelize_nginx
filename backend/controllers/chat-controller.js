const chatService = require("../service/chat-service");

class ChatController {
  async createChat(req, res, next) {
    try {
      const { user_id, chat_partner_id } = req.body;
      console.log("Создание нового чата");
      const chat = await chatService.createChat(user_id, chat_partner_id);
      return res.json(chat);
    } catch (error) {
      console.error("Ошибка при создании чата: ", error);
      next(error);
    }
  }
}

module.exports = new ChatController();
