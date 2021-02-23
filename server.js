const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const {SERVER_PORT, MONGO_URI}= process.env
const mongoose = require('mongoose');
const controller = require('./controller')


mongoose.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
const db=mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', ()=> console.log('Mongo DB connected'))

app.use(express.urlencoded());
app.use(express.json());



app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user', controller.addUser)
app.get('/api/exercise/users', controller.getUsers)
app.post('/api/exercise/add', controller.addExercise)
app.get('/api/exercise/log', controller.getLog)



const listener = app.listen(SERVER_PORT, () => {
  console.log('Your app is listening on port ' + SERVER_PORT)
})
