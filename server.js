const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {SERVER_PORT, MONGO_URI}= process.env
const mongoose = require('mongoose');

mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
const db=mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> console.log('Mongo DB connected'))



app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(SERVER_PORT, () => {
  console.log('Your app is listening on port ' + SERVER_PORT)
})
