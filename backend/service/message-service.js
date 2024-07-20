const { Messages, Chats_members } = require("../models/associations");

class MessageService {
  async createMessage(sender_id, patrner_id, mcontent) {
    const checkDialogues = await Chats_members.findOne({
      where: { user_id: [sender_id, patrner_id] },
    });
    const { chat_id } = checkDialogues;
    try {
      await Messages.create({
        chat_id,
        sender_id,
        mcontent,
      });
      return { msg: "Сообщение отправлено" };
    } catch (error) {
      throw new Error("Ошибка при отправке сообщения: ", error);
    }
  }
  async showMessages(sender_id, patrner_id) {
    try {
      const checkDialogues = await Chats_members.findOne({
        where: { user_id: [sender_id, patrner_id] },
      });
      const { chat_id } = checkDialogues;
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
