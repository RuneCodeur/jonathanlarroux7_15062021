const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // ok
router.post('/login', userCtrl.login); // ???
router.post('/modify', userCtrl.modify); //???
router.delete('/delete', userCtrl.delete); //???   

module.exports = router;