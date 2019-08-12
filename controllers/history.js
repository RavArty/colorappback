
const showHistory = (req, res, db) => {
  
  const {id} = req.body
//  console.log('showhistory: ', id)
  db.select('imgurl', 'colors').from('colors')
  .where('id_user', '=', id)
//  .then(imgurl => console.log(imgurl))
  .then(data => res.json(data))
	.catch(err => res.status(404).json("unable to get data"))
//	postColorsInDB(req, db)
}

module.exports = {
  showHistory: showHistory
}