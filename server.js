const express = require('express')
const bodyParser = require('body-parser')
//const bcrypt = require('bcrypt')
//const saltRounds = 10;
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const history = require('./controllers/history')



const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'Rav',
    password: '',
    database: 'test'
  }
});
// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//   	ssl: true,
//   }
// });

const whitelist = ['http://localhost:3001', 
'https://colorappfront.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express()
app.use(bodyParser.json())
app.use(cors())
 

app.get('/', (req, res) => {
	//res.send(database.users)
	res.send('it is working')
})
//------------------------------------------------------------------------
//app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt, saltRounds)})
//------------------------------------------------------------------------
app.post('/checkuser', (req, res) => {register.checkUserInDb(req, res, db)})
//------------------------------------------------------------------------
app.post('/register', (req, res) => {register.handleRegister(req, res, db)})
//------------------------------------------------------------------------
app.post('/entries', (req, res) => {register.returnEntries(req, res, db)})
//------------------------------------------------------------------------
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
//------------------------------------------------------------------------
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, db)})
//------------------------------------------------------------------------
app.post('/postcolors', (req, res) => {image.postColorsInDB(req, res, db)})
//------------------------------------------------------------------------
app.post('/history', (req, res) => {history.showHistory(req, res, db)})
//------------------------------------------------------------------------
app.post('/entries', (req, res) => {image.getEntries(req, res, db)})
//------------------------------------------------------------------------
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})









