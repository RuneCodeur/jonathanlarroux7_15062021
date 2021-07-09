const express = require ('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:idCanal/:idSujet', auth, msgCtrl.getMsg);
router.post('/:idCanal/:idSujet/create', auth, multer, msgCtrl.createMsg); // penser a rajouter l'ajout des fichiers
router.get('/New', auth, msgCtrl.getNewMsg);
router.put('/:idCanal/:idSujet/:idMsg', auth, multer, msgCtrl.modifyMyMsg); // à modo
router.delete('/:idCanal/:idSujet/:idMsg', auth, msgCtrl.deleteMyMsg); // à modo

module.exports = router;