const { Router } = require('express');
const router = Router();


router.get('/', async (req, res) =>{
  return res.render('MarsPhoto')
})

module.exports = router