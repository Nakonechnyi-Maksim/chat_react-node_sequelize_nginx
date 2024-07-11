const Message = require("../models/messages");

class MessageService {
  async createMessage(chat_id, sender_id, content) {
    try {
      const message = await Message.create({
        chat_id,
        sender_id,
        content,
      });
      return true;
    } catch (error) {
      throw new Error("Ошибка при отправке сообщения: ", error);
    }
  }
  async showMessages(chat_id) {
    try {
      const dialogue = await Message.findAll({ where: { chat_id } });
      return dialogue;
    } catch (error) {}
  }
}

module.exports = new MessageService();
