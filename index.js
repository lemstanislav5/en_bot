const TelegramBot = require('node-telegram-bot-api');
const {API_KEY_BOT, ID_USER, PASSWORD} = require('../config_bot.js');
//!teamsDoNotRepeat
const {sections, hours, minutes, amountWords, сontinue, teamsRepeat, teamsDoNotRepeat} = require('./src/sections');
const {commands} = require('./src/commands');
const {findWord, initialization, findUser, addUser, addHours, addMinutes, 
       addAmountWords, getUsers, dayLessonUserUpdate, getWords, learnedWordIdUpdate,
       gatАccess} = require('./src/api.js');

const bot = new TelegramBot(API_KEY_BOT, {
  polling: {
    interval: 1000,
    autoStart: true
  }
});

const isAccess = (id, user, msg, text) => {
  console.log(user)
  if(user.length === 0) {
    addUser(msg.from);
    return false;
  } else {
    if(PASSWORD === text) {
      gatАccess(id);
      setTimeout(() => bot.sendMessage(id, `✋ Привет! \nДанный бот представляет собой словарь 📚 английских слов. \nЕго функция обучения 👨‍🏫 заключается в ежедневной отправке новых слов, которые нужно записывать и повторять.`), 800);
      setTimeout(() => bot.sendMessage(id, '✅Выберите: ', sections), 800);
      setTimeout(() => bot.sendMessage(ID_USER, 'Зарегистрировался новый пользователь'), 800);
      return true;
    } else if(ID_USER !== msg.from.id && user[0].access !== 1) {
      bot.sendMessage(id, '✋ Привет! У Вас нет доступа. Извините! 😕');
      return false;
    } else {
      return true;
    }
  }
}

initialization();
bot.on("polling_error", err => console.log(err));
bot.on('text', async msg => {
  const id = msg.chat.id;
  const text = msg.text;
  const user = await findUser(msg.from.id);
  const access = isAccess(id, user, msg, text);
  if(!access) return null;

  try {
    switch(text) {
      case '/start':  
        // bot.sendPhoto(id, "./src/img/book.png") 
        setTimeout(() => bot.sendMessage(id, `✋ Привет! \nДанный бот представляет собой словарь 📚 английских слов. \nЕго функция обучения 👨‍🏫 заключается в ежедневной отправке новых слов, которые нужно записывать и повторять.`), 800);
        setTimeout(() => bot.sendMessage(id, 'Выберите: ', sections), 800);
        break;
      default:
        if(PASSWORD === text) return null;
        const result = await findWord(text);
        if (result === undefined) return bot.sendMessage(id, 'Напишите слово!');
        const {word, transcription, translation} = result;
        await bot.sendMessage(id, word + ' ' + transcription + ' ' + translation, teamsRepeat);
    }
  }
  catch(error) {
    console.log(error);
  }
});

bot.setMyCommands(commands);

bot.on('callback_query', async msg => {
  const text = msg.data;
  const id = msg.message.chat.id;
  const user = await findUser(id);
  const access = isAccess(id, user, msg, text);
  if(!access) return null;
    switch(text) {
      case '/сhoose time to study':  
        setTimeout(() => bot.sendMessage(id, '🕛 Выберите час: ', hours), 500); 
        break;
      case '/select number of words': 
        setTimeout(() => bot.sendMessage(id, '📋 Выберите количество слов: ', amountWords), 500);
        break;
      case '/start training':
        const words = await getWords(user[0].learnedWordId, user[0].amountWords);
        const countWords = words.length - 1;
        words.forEach((item, i) => {
          const text = item.word + ' [' + item.transcription + '] ' + item.translation;
          if(countWords === i) return setTimeout(() => bot.sendMessage(user[0].user_id, text, сontinue), 1000);
          setTimeout(() => bot.sendMessage(user[0].user_id, text, teamsRepeat), 300);
        });
        learnedWordIdUpdate(user[0].learnedWordId + user[0].amountWords, user[0].user_id)
        break;
      default:
        if(data.includes('/hours')){
          const userHours = parseInt(data.replace('/hours_', ''));
          addHours(userHours, id);
          setTimeout(() => bot.sendMessage(id, '🕒 Выберите минуты: ', minutes), 500);
        } 
        if(data.includes('/minutes')){
          const userMinutes = parseInt(data.replace('/minutes_', ''));
          addMinutes(userMinutes, id);
          if(user[0].amountWords === 0) {
            setTimeout(() => bot.sendMessage(id, '📋 Выберите количество слов: ', amountWords), 500);
          } else {
            setTimeout(() => bot.sendMessage(id, '🤝 Поздравляю! \nЕжедневно в ' + user[0].hours + ' час. ' + userMinutes + ' мин.' + ' мы будем изучать по ' + user[0].amountWords + ' слов(a).'), 500);
          }
        }
        if(data.includes('/amountWords')){
          const amountWords = parseInt(data.replace('/amountWords_', ''));
          addAmountWords(amountWords, id);
          setTimeout(() => bot.sendMessage(id, '🤝 Поздравляю! \nЕжедневно в ' + user[0].hours + ' час. ' + user[0].minutes + ' мин.' + ' мы будем изучать по ' + amountWords + ' слов(a).'), 500);
        }
        
    }
});

setInterval(async () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const users = await getUsers();
  users.forEach(async user => {
    if(user.amountWords > 0 && user.dayLesson !== currentDay){
      if(user.hours === hours){
        // Допустима погрешность в 1 минуту
        if(minutes === user.minutes || user.minutes === minutes + 1){
          const words = await getWords(user.learnedWordId, user.amountWords);
          words.forEach((item, i) => {
            const text = item.word + ' [' + item.transcription + '] ' + item.translation;
            if(countWords === i) return setTimeout(() => bot.sendMessage(user.user_id, text, сontinue), 1200);
            setTimeout(() => bot.sendMessage(user.user_id, text, teamsRepeat), 200);
          });
          // Обновление последнего выученого слова
          learnedWordIdUpdate(user.learnedWordId + user.amountWords, user.user_id)
          // Обновление даты последнего урока
          dayLessonUserUpdate(currentDay, user.user_id);
        }
      }
    }
  });
  // функция получает данные всех пользователей у которых количество слов больше 0 
  // и сравнивает время, если время обучения больше текущего но меньше текущее + 1 минута, 
  // функция выбирает рандомные слова для обучения
}, 1000);