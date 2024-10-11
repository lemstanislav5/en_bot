const sqlite3 = require('sqlite3').verbose();
const db3 = '../english_words.db3';
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
    query(db3, 'run', 'CREATE TABLE if not exists `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `user_id` INTEGER, `first_name` TEXT, `last_name` TEXT, `access` INTEGER, `hours` INTEGER, `minutes` INTEGER, `words` INTEGER)')
      .then(result=>{ 
        console.log('создание таблицы users', result)
      }); 
  },
  findUser: (user_id) => {
    return query(db3, 'all', 'SELECT * FROM users WHERE user_id = ?', [user_id])
      .then(result => { 
        return result 
      }); 
  },
  addUser: ({id, first_name, last_name}) => { 
    return query(db3, 'run', 'INSERT INTO users (user_id, first_name, last_name, access, hours, minutes, words) values ("' + 
        id + '","' + first_name + '","' + last_name + '", 0, 0, 0, 0)', []);
  },
  addHours: (hours, user_id) => { 
    return query(db3, 'run', 'UPDATE users SET hours=? WHERE user_id=?', [hours, user_id]);
  },
  addMinutes: (minutes, user_id) => { 
    return query(db3, 'run', 'UPDATE users SET minutes=? WHERE user_id=?', [minutes, user_id]);
  },
  addWords: (words, user_id) => { 
    return query(db3, 'run', 'UPDATE users SET words=? WHERE user_id=?', [words, user_id]);
  },
  findWord: word => {
    //Пользовательсктий регистр запроса "Test"
    return query(db3, 'all', 'SELECT * FROM dictionary WHERE word = ?', [word])
      .then(result=>{ 
        //Если пользовательский запрос вернул пустой массив меняем регистр на нижний
        if (result.length === 0){
          return query(db3, 'all', 'SELECT * FROM dictionary WHERE word = ?', [word.toLowerCase()])
            .then(result=>{ 
              return result[0];
            }); 
        }
        return result[0];
      }); 
  }
}
