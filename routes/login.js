const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.models');

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email });
  if (currentUser) {
    const validation = await bcrypt.compare(password, currentUser.password);
    if (currentUser && validation) {
      req.session.user = {
        id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
      };
      return res.redirect('/')
    } else {
      return res.status(418).redirect('/login')
    }
  } else {
    return res.status(418).redirect('/login')
  }
});

module.exports = router;