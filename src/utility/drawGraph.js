const express = require('express')
const app = express()

const { createCanvas, loadImage, Image } = require('canvas')
const path = require('path');

app.get('/', function (req, res) {
  const canvas = createCanvas(200, 200)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '30px Impact'
  ctx.rotate(0)
  ctx.fillText('Awesome!', 10, 100)

  // Draw line under text
  var text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()

  // Draw cat with lime helmet
  const imagePath = path.join(__dirname, './images/squid.png');
  console.log(imagePath)
  loadImage(imagePath).then((image) => {
    ctx.drawImage(image, 0, 0, 370, 370)
    res.send('<img src="' + canvas.toDataURL() + '" />')
  }).catch(err => {
    console.log(err)
  })
  
})

app.listen(3000)





module.exports = {
  clock: () => {

  }
}
