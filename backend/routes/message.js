const express = require ('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:idCanal/:idSujet', auth, msgCtrl.getMsg); // ok ?
router.post('/:idCanal/:idSujet/create', auth, multer, msgCtrl.createMsg); // ok ?
router.get('/New', auth, msgCtrl.getNewMsg); // ok ?
router.put('/:idCanal/:idSujet/:idMsg', auth, multer, msgCtrl.modifyMyMsg); // ok ?
router.delete('/:idCanal/:idSujet/:idMsg', auth, msgCtrl.deleteMyMsg); // ok ?

module.exports = router;