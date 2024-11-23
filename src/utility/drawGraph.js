const express = require('express');
const app = express();

const { createCanvas, loadImage, Image } = require('canvas');
const path = require('path');

app.get('/', function (req, res) {
  const indent = 50; // Отступ по краям
  const canvas = createCanvas(350+indent*2, 300+indent*2);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "#cdc9c9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // var text = ctx.measureText('Awesome!');

  ctx.strokeStyle = '#4caf50';
  ctx.beginPath();
  ctx.lineTo(0, 102);
  ctx.lineTo(350, 102);
  ctx.stroke();

  for(let i=0; i <= 300 ; i+=30){
    ctx.strokeStyle = '#393939';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.lineTo(0+indent, i+indent);
    ctx.lineTo(350+indent, i+indent);
    ctx.stroke();
  }

  for(let i=0 ; i <= 350 ; i+=50){
    ctx.strokeStyle = '#393939';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.lineTo(i+indent, 0+indent);
    ctx.lineTo(i+indent, 300+indent);
    ctx.stroke();
  }
  const indicators = [0, 5, 10, 20, 50, 100, 200, 300, 500, 700, 1000];
  let step = indent;
  for (let i=indicators.length - 1; i >= 0; i--) {
    ctx.fillStyle = "steelblue";
    ctx.font = '10px Impact';
    ctx.rotate(0);
    //let emptySymbol
    ctx.fillText(indicators[i], 20, step);
    step += 30;
  }

  ctx.fillStyle = "steelblue";
  ctx.font = '10px Impact';
  ctx.rotate(0);
  ctx.fillText('Awesome!', 0, 100);
  // Draw cat with lime helmet
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
