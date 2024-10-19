const sqlite3 = require('sqlite3').verbose();
const db86060 = '../86060_words.db3';
const db3000 = '../3000_words.db3';
const query = (file, req, sql, params = []) => {
  return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(file, (err) => {
          if (err) console.error(err.message);
      });
      db.serialize(() => db[req](sql, params, 
          (err,res) => {
              if(err) reject(err);
              resolve(res);
          }
      ));  
      db.close((err) => {
          if (err) return console.error(err.message);
      });
  });
}

module.exports = {
  initialization: () => {
    query(db3000, 'run', 'CREATE TABLE if not exists `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER, `first_name` TEXT, `last_name` TEXT, `access` INTEGER, `hours` INTEGER, `minutes` INTEGER, `amountWords` INTEGER, `dayLesson` INTEGER, `learnedWordId` INTEGER)')
      .then(() => console.log('создание таблицы users')); 
  },
  findUser: (user_id) => {
    return query(db3000, 'all', 'SELECT * FROM users WHERE user_id = ?', [user_id])
      .then(result => { 
        return result 
      }); 
  },
  addUser: ({id, first_name, last_name}) => { 
    return query(db3000, 'run', 'INSERT INTO users (user_id, first_name, last_name, access, hours, minutes, amountWords, dayLesson, learnedWordId) values ("' + 
        id + '","' + first_name + '","' + last_name + '", 0, 0, 0, 0, 0, 0)', []);
  },
  addHours: (hours, user_id) => { 
    return query(db3000, 'run', 'UPDATE users SET hours=? WHERE user_id=?', [hours, user_id]);
  },
  addMinutes: (minutes, user_id) => { 
    return query(db3000, 'run', 'UPDATE users SET minutes=? WHERE user_id=?', [minutes, user_id]);
  },
  addAmountWords: (amountWords, user_id) => { 
    return query(db3000, 'run', 'UPDATE users SET amountWords=? WHERE user_id=?', [amountWords, user_id]);
  },
  getUsers: () => { 
    return query(db3000, 'all', 'SELECT * FROM users', [])
      .then(result=>{ 
        return result;
      });
  },
  dayLessonUserUpdate: (date, user_id) => {
    return query(db3000, 'run', 'UPDATE users SET dayLesson=? WHERE user_id=?', [date, user_id]);
  },
  getWords: (lastWord, amountWords) => {
    return query(db3000, 'all', 'SELECT * FROM dictionary WHERE id BETWEEN ? AND ?', [lastWord + 1, amountWords + lastWord])
      .then(result=>{ 
        console.log(lastWord, amountWords);
        return result;
      }); 
  },
  learnedWordIdUpdate: (learnedWordId, user_id) => {
    return query(db3000, 'run', 'UPDATE users SET learnedWordId=? WHERE user_id=?', [learnedWordId, user_id]);
  },
  gatАccess: user_id => {
    return query(db3000, 'run', 'UPDATE users SET access=? WHERE user_id=?', [1, user_id]);
  },
  findWord: word => {
    //Пользовательсктий регистр запроса "Test"
    return query(db86060, 'all', 'SELECT * FROM dictionary WHERE word = ?', [word])
      .then(result=>{ 
        //Если пользовательский запрос вернул пустой массив меняем регистр на нижний
        if (result.length === 0){
          return query(db86060, 'all', 'SELECT * FROM dictionary WHERE word = ?', [word.toLowerCase()])
            .then(result=>{ 
              return result[0];
            }); 
        }
        return result[0];
      }); 
  },
}
