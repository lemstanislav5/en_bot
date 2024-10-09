const fs = require('fs');
const dictionary = JSON.parse(fs.readFileSync('words.json', 'utf8'));
console.log('Записей в базе: ' + dictionary.length);

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db3');
db.serialize(() => {
  db.run("CREATE TABLE if not exists `dictionary` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `word` TEXT, `transcription` TEXT, `translation` TEXT)");
  for (let i = 0; i < dictionary.length; i++) {
    let word = dictionary[i][0];
    let transcription = dictionary[i].length === 2 ? '' : dictionary[i][1];
    let translation = dictionary[i].length === 2 ? dictionary[i][1] : dictionary[i][2];
    db.run('INSERT INTO dictionary (word, transcription, translation) VALUES (?, ?, ?)', [word, transcription, translation], (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Данные вставлены. ID: ' + i);
    });
  }
});

db.close();