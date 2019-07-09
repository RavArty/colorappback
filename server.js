const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')


const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
  	ssl: true,
  }
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res) => {
	//res.send(database.users)
	res.send('it is working')
})
//------------------------------------------------------------------------
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt, saltRounds)})
//------------------------------------------------------------------------
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})
//------------------------------------------------------------------------
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
//------------------------------------------------------------------------
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
//------------------------------------------------------------------------
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})









