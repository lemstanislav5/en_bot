const TelegramBot = require('node-telegram-bot-api');
const {API_KEY_BOT} = require('../config_bot.js');
const {sections, hours, minutes} = require('./src/sections');
const {commands} = require('./src/commands');
const { 
  findWord
} = require('./src/api.js');

const bot = new TelegramBot(API_KEY_BOT, {
  polling: {
    interval: 1000,
    autoStart: true
  }
});

bot.on("polling_error", err => console.log(err));
bot.on('text', async msg => {
  const id = msg.chat.id;
  const text = msg.text;
  try {
    switch(text) {
      case '/start':  
        setTimeout(() => bot.sendMessage(id, `Данный бот представляет собой словарь (переводчик) английских слов. Его функция обучения заключается в ежедневной автоматической отправке новых слов, которые нужно записывать и повторять.`), 500);
        break;
      case '/options': 
        setTimeout(() => bot.sendMessage(id, 'Выберите: ', sections), 500);
        break;
      default:
        if(/\d/.test(text) || /:/i.test(text) || /,/i.test(text)) {
          if(/\d/.test(text) && /:/i.test(text) && /,/i.test(text)) {
            return bot.sendMessage(id, 'Правильный формат времени!');
          } 
          return bot.sendMessage(id, 'Неправильный формат времени!');
        } 
        // Проверка слов
        const result = await findWord(text);
        if (result === undefined) return bot.sendMessage(id, 'Напишите слово!');
        const {word, transcription, translation} = result;
        await bot.sendMessage(id, word + ' ' + transcription + ' ' + translation);
    }
  }
  catch(error) {
    console.log(error);
  }
});

bot.setMyCommands(commands);

bot.on('callback_query', msg => {
  const data = msg.data;
  const id = msg.message.chat.id;
    //! ЧАСОВОЙ ПОЯС
    switch(data) {
      case '/сhoose time to study':  
        setTimeout(() => bot.sendMessage(id, 'Выберите час: ', hours), 500);
        break;
      case '/hours':  
        setTimeout(() => bot.sendMessage(id, 'Выберите минуты: ', minutes), 500);
        break;
      case '/select number of words': 
        setTimeout(() => bot.sendMessage(id, 'Выберите минуты: ', minutes), 500);
        break;
      default:
        console.log('default');
    }
});
