// returns all uploaded images and colors
const showHistory = (req, res, db) => {
  
  const {id} = req.body
  db.select('imgurl', 'colors', 'colorvalues').from('colors')
  .where('id_user', '=', id)
  .then(data => res.json(data))
	.catch(err => res.status(404).json("unable to get data"))
}

module.exports = {
  showHistory: showHistory
}