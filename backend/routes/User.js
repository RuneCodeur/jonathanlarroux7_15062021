const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // ok
router.get('/login', userCtrl.login); // ok
router.put('/modify', userCtrl.modify); // ok ?
router.delete('/delete', userCtrl.delete); // ok ? 

module.exports = router;