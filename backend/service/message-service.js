const { Messages, Chats_members } = require("../models/associations");

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
  async showMessages(user_id, chat_id) {
    try {
      const checkDialogues = await Chats_members.findOne({
        where: { user_id, chat_id },
      });
      if (checkDialogues) {
        const dialogue = await Messages.findAll({ where: { chat_id } });
        if (dialogue) {
          return dialogue;
        }
      }
    } catch (error) {
      throw new Error("Ошибка при получении диалога: ", error);
    }
  }
}

module.exports = new MessageService();
