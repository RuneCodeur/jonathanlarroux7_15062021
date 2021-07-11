const express = require ('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:idCanal/:idSujet', auth.getAuth, msgCtrl.getMsg);
router.post('/:idCanal/:idSujet/create', auth.getAuth, multer, msgCtrl.createMsg);
router.get('/New', auth.getAuth, msgCtrl.getNewMsg);
router.put('/:idCanal/:idSujet/:idMsg', auth.sensibleAuth, msgCtrl.modifyMyMsg);
router.delete('/:idCanal/:idSujet/:idMsg', auth.deleteAuth, msgCtrl.deleteMyMsg);

module.exports = router;