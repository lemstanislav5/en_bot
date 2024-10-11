const TelegramBot = require('node-telegram-bot-api');
const {API_KEY_BOT, ID_USER} = require('../config_bot.js');
const {sections, hours, minutes, amountWords} = require('./src/sections');
const {commands} = require('./src/commands');
const {findWord, initialization, findUser, addUser, addHours, addMinutes, addAmountWords, getUsers, dayLessonUserUpdate, getWords, learnedWordIdUpdate} = require('./src/api.js');

const bot = new TelegramBot(API_KEY_BOT, {
  polling: {
    interval: 1000,
    autoStart: true
  }
});

initialization();
bot.on("polling_error", err => console.log(err));
bot.on('text', async msg => {
  const id = msg.chat.id;
  const text = msg.text;
  findUser(msg.from.id)
    .then(result => {
      if(result.length === 0) {
        addUser(msg.from);
        console.log('Пользователь добавлен!')
      } else {
        console.log('Пользователь существует!')
      }
    })
  if(ID_USER != msg.from.id) return bot.sendMessage(id, '✋ Привет! У Вас нет доступа. Извините! 😕');
  try {
    switch(text) {
      case '/start':  
        bot.sendPhoto(id, "./src/img/book.png") 
        setTimeout(() => bot.sendMessage(id, `✋ Привет! \nДанный бот представляет собой словарь (переводчик) английских слов. \nЕго функция обучения заключается в ежедневной автоматической отправке новых слов, которые нужно записывать и повторять.`), 800);
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

bot.on('callback_query', async msg => {
  const data = msg.data;
  const id = msg.message.chat.id;
  const user = await findUser(id);
    //! ЧАСОВОЙ ПОЯС
    switch(data) {
      case '/сhoose time to study':  
        setTimeout(() => bot.sendMessage(id, 'Выберите час: ', hours), 500); 
        break;
      case '/select number of words': 
        setTimeout(() => bot.sendMessage(id, 'Выберите количество слов: ', amountWords), 500);
        break;
      default:
        if(data.includes('/hours')){
          const userHours = parseInt(data.replace('/hours_', ''));
          addHours(userHours, id);
          setTimeout(() => bot.sendMessage(id, 'Выберите минуты: ', minutes), 500);
        } 
        if(data.includes('/minutes')){
          const userMinutes = parseInt(data.replace('/minutes_', ''));
          addMinutes(userMinutes, id);
          if(user[0].amountWords === 0) {
            setTimeout(() => bot.sendMessage(id, 'Выберите количество слов: ', amountWords), 500);
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
          bot.sendMessage(user.user_id, 'СЛОВА');
          const words = await getWords(user.amountWords, user.learnedWordId);
          words.forEach(item => {
            bot.sendMessage(user.user_id, item.word + ' [' + item.transcription + '] ' + item.translation);
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