const express = require ('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:idForum/:idSujet', auth.getAuth, msgCtrl.getMsg);
router.post('/:idForum/:idSujet/create', auth.getAuth, multer, msgCtrl.createMsg);
router.get('/New', auth.getAuth, msgCtrl.getNewMsg);
router.put('/:idForum/:idSujet/:idMsg', auth.sensibleAuth, msgCtrl.modifyMyMsg);
router.delete('/:idForum/:idSujet/:idMsg', auth.deleteAuth, msgCtrl.deleteMyMsg);

module.exports = router;