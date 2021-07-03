const express = require ('express');
const router = express.Router();

const msgCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/:idCanal/:idSujet', auth, msgCtrl.getMsg); // ok
router.post('/:idCanal/:idSujet/create', auth, multer, msgCtrl.createMsg); // ok (penser a rajouter l'ajout des fichiers)
router.get('/New', auth, msgCtrl.getNewMsg); // ok (penser a faire une route qui conduit vers le sujet du msg)
router.put('/:idCanal/:idSujet/:idMsg', auth, multer, msgCtrl.modifyMyMsg); // ok (à modo)
router.delete('/:idCanal/:idSujet/:idMsg', auth, msgCtrl.deleteMyMsg); // ok (renvoie le total des messages dans le sujet. si =1, supprime aussi le sujet)(modo)

module.exports = router;