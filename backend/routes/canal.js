const express = require ('express');
const router = express.Router();

const canalCtrl = require('../controllers/canal');
const auth = require('../middleware/auth');

router.get('/welcome', auth, canalCtrl.getAllCanal); // ok
router.get('/:idCanal', auth,canalCtrl.getAllSujet); // ok
router.get('/:idCanal/:idSujet', auth, canalCtrl.getOneSujet);
router.post('/createCanal', auth, canalCtrl.createCanal); // ok (à modo)
router.post('/:idCanal/createSujet', canalCtrl.createSujet); // ok
router.put('/modifyCanal', auth, canalCtrl.modifyCanal); // ok (à modo)
router.put('/:idCanal/modifySujet', canalCtrl.modifySujet); //ok ( àmodo)
router.delete('/:idCanal', auth, canalCtrl.deleteCanal); // ok (penser a faire aussi supprimer les sujets et les messages) (à modo)
router.delete('/:idCanal/:idSujet', canalCtrl.deleteSujet); // ok (penser a faire aussi supprimer les messages) (à modo)

module.exports = router;