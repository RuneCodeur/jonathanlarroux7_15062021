const express = require ('express');
const router = express.Router();

const canalCtrl = require('../controllers/canal');
const auth = require('../middleware/auth');

router.get('/welcome', canalCtrl.getAllCanal); // ok ?
router.post('/createCanal', auth, canalCtrl.createCanal); // ok ?
router.post('/modifyCanal', auth, canalCtrl.modifyCanal); // ok ?
router.delete('/:idCanal', auth, canalCtrl.deleteCanal); // ok ?

module.exports = router; 