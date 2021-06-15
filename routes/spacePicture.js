const { Router } = require('express');
const router = Router();


router.get('/', async (req, res) =>{
  return res.render('spacePicture')
})

module.exports = router