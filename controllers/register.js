const handleRegister = (req, res, db) =>{
	const { email, name, id } = req.body;

  // if(!email || !name || !password){
  //   return res.status(400).json('incorrect form of submission')
  // }
  // const hash = bcrypt.hashSync(password, saltRounds)
    
  db('users').select()
  .where('id', '=', id)
  .then(function(rows) {
      if (rows.length===0) {
          // no matching records found
          return db('users').insert({
            id: id,
            name: name,
            email: email
          })
          .then(res => res.json())
          .catch(err => res.status(400).json('unable to register', err))
      } else {
        res.json(rows[0].entries)
       // console.log('user exists')
      }
  })
  .catch(err => res.status(400).json('unable to select from user: ', err))
}    

module.exports = { 
  handleRegister: handleRegister
}