const clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: 'f708fd0eb7ad441c93f44dae1de7d9e0'
});

const handleApiCall = (req, res, db) => {
	
	app.models.predict(Clarifai.COLOR_MODEL, req.body.input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json('unable to load API', err))
}

const getEntries = (req, res, db) => {
	const {id} = req.body
	db('users').where('id', '=', id)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(404).json("unable to get entries"))
}
const postColorsInDB = (req, res, db) => {
	const {id, input, colors} = req.body
	db('colors').insert({
		id_user: id,
		imgurl: input,
		colors: colors
	})
	.then(res => res.json())
	.catch(err => res.status(404).json("unable to insert colors ", err))
}

const handleImage = (req, res, db) => {
	const {id} = req.body
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0])
	})
	.catch(err => res.status(404).json("unable to get entries"))
//	postColorsInDB(req, db)
}

module.exports = {
  handleImage: handleImage,
	handleApiCall: handleApiCall,
	postColorsInDB: postColorsInDB,
	getEntries: getEntries
}