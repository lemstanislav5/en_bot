const TelegramBot = require('node-telegram-bot-api');
const {API_KEY_BOT} = require('../config_bot.js');
const { 
  findWord
} = require('./api_db');

const bot = new TelegramBot(API_KEY_BOT, {
  polling: {
    interval: 300,
    autoStart: true
  }
});

bot.on("polling_error", err => console.log(err));
bot.on('text', async msg => {
  try {
    if(msg.text == '/start') {
      await bot.sendMessage(msg.chat.id, `Данный бот представляет собой словарь (переводчик) английских слов. Его функция обучения заключается в ежедневной автоматической отправке новых слов, которые нужно записывать и повторять.`);
    }
    if(msg.text == '/time') {
      await bot.sendMessage(msg.chat.id, `Для выбора времени повторения и количества слов напишите сообщение формата (ЧЧ:ММ,СЛ): 15:12,5`);
    } 
    else {
      // Выбор времени
      if(/\d/.test(msg.text) || /:/i.test(msg.text) || /,/i.test(msg.text)) {
        if(/\d/.test(msg.text) && /:/i.test(msg.text) && /,/i.test(msg.text)) {
          return bot.sendMessage(msg.chat.id, 'Правильный формат времени!');
        } 
        return bot.sendMessage(msg.chat.id, 'Неправильный формат времени!');
      } 
      // Проверка слов
      const result = await findWord(msg.text);
      if (result === undefined) return bot.sendMessage(msg.chat.id, 'Напишите слово!');
      const {word, transcription, translation} = result;
      await bot.sendMessage(msg.chat.id, word + ' ' + transcription + ' ' + translation);
    }
  }
  catch(error) {
    console.log(error);
  }
});

const commands = [
  {
    command: "start",
    description: "Запуск бота"
  },
  {
    command: "time",
    description: "Установить время для повторения"
  },
]

bot.setMyCommands(commands);

