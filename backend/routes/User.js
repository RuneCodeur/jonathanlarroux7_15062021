const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); 
router.get('/login', userCtrl.login); 
router.put('/modify', userCtrl.modify); 
router.delete('/delete', userCtrl.delete);

module.exports = router;