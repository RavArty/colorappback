// check if user exists in db
  const checkUserInDb = (req, res, db) =>{
    const { id } = req.body;
    
    db('users').select()
    .where('id', '=', id)
    .then(function(rows) {
        if (rows.length===0) {
            // no matching records found
          return res.status(204).json('user not in db')
        } else {
          return res.status(202).json('user already exists')
        }
    })
    .catch(err => res.status(400).json('unable to select from user: ', err))
      
  }
// register user in db
  const handleRegister = (req, res, db) =>{
    const { email, name, id } = req.body;

    db('users').insert({
      id: id,
      name: name,
      email: email
    })
    .returning('email')
    .then(email => res.json(email))
    .catch(err => res.status(400).json('unable to register (server)', err))
    
  }  
// returns number of uploaded images after logging
  const returnEntries = (req, res, db) => {
    const { id } = req.body
    db('users').select()
    .where('id', '=', id)
    .returning('entries')
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('unable to select from user entries: ', err))
  }
   

module.exports = { 
  checkUserInDb: checkUserInDb,
  handleRegister: handleRegister,
  returnEntries: returnEntries
}