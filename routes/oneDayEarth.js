const { Router } = require('express');
const router = Router();


router.get('/', async (req, res) =>{
  return res.render('oneDay')
})

module.exports = router