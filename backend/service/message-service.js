const { Messages } = require("../models/associations");

class MessageService {
  async createMessage(chat_id, sender_id, mcontent) {
    try {
      await Messages.create({
        chat_id,
        sender_id,
        mcontent,
      });
      return true;
    } catch (error) {
      throw new Error("Ошибка при отправке сообщения: ", error);
    }
  }
  async showMessages(chat_id) {
    try {
      const dialogue = await Messages.findAll({ where: { chat_id } });
      return dialogue;
    } catch (error) {
      throw new Error("Ошибка при получении диалога: ", error);
    }
  }
}

module.exports = new MessageService();