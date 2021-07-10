const express = require ('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup); 
router.get('/login', userCtrl.login); 
router.put('/modify', auth.getAuth, userCtrl.modify); 
router.delete('/delete',auth.getAuth, userCtrl.delete);

module.exports = router;