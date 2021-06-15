// const User = require('../models/users.models')
// const Party  = require('../models/party.models')

const checkAuth = (req, res, next) => {
  const userId = req.session?.user?.id
  if(userId) {
    return next()
  }
  return res.redirect('/login')
}

// const checkUser = async (req, res, next) => {
//   const userId = req.session?.user?.id
//   const currentParty = await Party.findById(req.params.id)

//   if(userId && (String(userId) === currentParty.author.toString())) {
//     return next()
//   }
//   return res.redirect('/main')
// }
module.exports = {checkAuth, 
  // checkUser
}