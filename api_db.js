const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db3');
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
  findWord: word => {
    console.log(word);
    //Пользовательсктий регистр запроса "Test"
    return query('data.db3', 'all', 'SELECT * FROM dictionary WHERE word = ?', [word])
      .then(result=>{ 
        //Если пользовательский запрос вернул пустой массив меняем регистр на нижний
        if (result.length === 0){
          return query('data.db3', 'all', 'SELECT * FROM dictionary WHERE word = ?', [word.toLowerCase()])
            .then(result=>{ 
              return result[0];
            }); 
        }
        return result[0];
      }); 
  }
}