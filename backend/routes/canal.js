const express = require ('express');
const router = express.Router();

const canalCtrl = require('../controllers/canal');
const auth = require('../middleware/auth');

router.get('/welcome', auth.getAuth, canalCtrl.getAllCanal); 
router.get('/:idCanal', auth.getAuth,canalCtrl.getAllSujet);
router.post('/createCanal', auth.sensibleAuth, canalCtrl.createCanal);
router.post('/:idCanal/createSujet', auth.getAuth, canalCtrl.createSujet); 
router.put('/modifyCanal', auth.sensibleAuth, canalCtrl.modifyCanal); 
router.put('/:idCanal/modifySujet',auth.sensibleAuth, canalCtrl.modifySujet); 
router.delete('/:idCanal', auth.deleteAuth, canalCtrl.deleteCanal);
router.delete('/:idCanal/:idSujet', auth.deleteAuth, canalCtrl.deleteSujet);

module.exports = router;