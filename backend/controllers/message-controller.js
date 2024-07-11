const MessageService = require("../service/message-service");

class MessageController {
  async createMessage(req, res, next) {
    try {
      const { chat_id, sender_id, content } = req.body;
      const message = await MessageService.createMessage(
        chat_id,
        sender_id,
        content
      );
      return res.json(message);
    } catch (error) {
      console.error("Ошибка контроллера при создании сообщения", error);
      next(error);
    }
  }
  async showMessages(req, res, next) {
    try {
      const { chat_id } = req.body;
      const message = await MessageService.showMessages(chat_id);
      return res.json(message);
    } catch (error) {
      console.error("Ошибка при получении диалога");
      next(error);
    }
  }
}

module.exports = new MessageController();
