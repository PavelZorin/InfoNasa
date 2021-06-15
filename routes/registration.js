const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.models');

router.get('/', (req, res) => {
  res.render('registration');
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const secretPass = await bcrypt.hash(password, 10);
    try {
      const currentUser = await User.create({
        name,
        email,
        password: secretPass,
      });
      if (currentUser) {
        req.session.user = {
          id: currentUser._id,
          name: currentUser.name,
          email: currentUser.email,
        };
        return res.redirect('/')
      }
    } catch (e) {
      return res.status(418).redirect('/registration')
    }
  }
  return res.status(418).redirect('/registration')
});

module.exports = router;

