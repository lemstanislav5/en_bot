const express = require('express');
const app = express();
const { createCanvas, loadImage, Image } = require('canvas');
const path = require('path');

app.get('/', function (req, res) {
  
  const ind = 50, width = 350, height = 300; // Отступ по краям, длина и высота
  const canvas = createCanvas(width + ind * 2, height + ind * 2);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Горизонтальные линии
  for(let i=0; i <= 300 ; i+=30){
    ctx.strokeStyle = '#393939';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.lineTo(0 + ind, i + ind);
    ctx.lineTo(350 + ind, i + ind);
    ctx.stroke();
  }

  // Вертикальные линии
  for(let i=0 ; i <= 350 ; i+=50){
    ctx.strokeStyle = '#393939';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.lineTo(i + ind, 0 + ind);
    ctx.lineTo(i + ind, 300 + ind);
    ctx.stroke();
  }

  // Массив количества слов, которые пользователь может повторить в течении дня
  const num = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  let stepVertical = 3;
  for (let i = num.length - 1; i >= 0; i--) {
    ctx.fillStyle = "black";
    ctx.font = "10px Impact";
    let emptySymbol = "";
    if(num[i] < 10) emptySymbol = "  ";
    if(100 > num[i] > 10) emptySymbol = " ";
    ctx.fillText(emptySymbol + num[i], 30, stepVertical + ind);
    stepVertical += 30;
  }
  // Массив дней недели
  const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  let stepHorizontal = 370;
  for (let i = days.length - 1; i >= 0; i--) {
    ctx.fillStyle = "black";
    ctx.font = "10px Impact";
    ctx.fillText(days[i], stepHorizontal, 360);
    stepHorizontal -= 50;
  } 

  // Данные для отрисовки
  const data = [10, 7, 20, 31, 39, 3, 44];
  let stepRights = 0;
  ctx.strokeStyle = '#4caf50';
  ctx.lineWidth = 3;
  ctx.beginPath();
  // высота блока остсавляет 30px, каждый блок содержить до 5 слов, 1 слово равно 3px
  const x = 30 / 5;
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(ind + 25 + stepRights, width - x * data[i]);
    stepRights += 50;
  }
  ctx.stroke();
  const imagePath = path.join(__dirname, './images/squid.png');
  console.log(imagePath);
  // loadImage(imagePath).then((image) => {
  //   ctx.drawImage(image, 0, 0, 370, 370);
  //   res.send('<img src="' + canvas.toDataURL() + '" />')
  // }).catch(err => {
  //   console.log(err);
  // })
  res.send('<img src="' + canvas.toDataURL() + '" />')
  
})

app.listen(3000);





module.exports = {
  clock: () => {

  }
}
