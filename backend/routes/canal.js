const express = require ('express');
const router = express.Router();

const canalCtrl = require('../controllers/canal');
const auth = require('../middleware/auth');

router.get('/welcome', auth, canalCtrl.getAllCanal); 
router.get('/:idCanal', auth,canalCtrl.getAllSujet);
router.post('/createCanal', auth, canalCtrl.createCanal); // à modo
router.post('/:idCanal/createSujet', canalCtrl.createSujet); 
router.put('/modifyCanal', auth, canalCtrl.modifyCanal); // à modo
router.put('/:idCanal/modifySujet', canalCtrl.modifySujet); // à modo
router.delete('/:idCanal', auth, canalCtrl.deleteCanal); // à modo
router.delete('/:idCanal/:idSujet', canalCtrl.deleteSujet); // à modo

module.exports = router;