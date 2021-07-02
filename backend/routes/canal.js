const express = require ('express');
const router = express.Router();

const canalCtrl = require('../controllers/canal');
const auth = require('../middleware/auth');

router.get('/welcome', auth, canalCtrl.getAllCanal); // ok
router.get('/:idCanal', auth,canalCtrl.getAllSujet); // ok
router.post('/createCanal', auth, canalCtrl.createCanal); // ok
router.post('/:idCanal/createSujet', canalCtrl.createSujet); // ok
router.put('/modifyCanal', auth, canalCtrl.modifyCanal); // ok ?
router.put('/:idCanal/modifySujet', canalCtrl.modifySujet); //ok ?
router.delete('/:idCanal', auth, canalCtrl.deleteCanal); // ok (penser a faire aussi supprimer les sujets et les messages)
router.delete('/:idCanal/:idSujet', canalCtrl.deleteSujet); // ok (penser a faire aussi supprimer les messages)

module.exports = router;