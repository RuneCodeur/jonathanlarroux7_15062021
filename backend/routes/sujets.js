const express = require ('express');
const router = express.Router();

const sujetCtrl = require('../controllers/sujet');
const auth = require('../middleware/auth');

router.get('/:idCanal', auth,sujetCtrl.getSujet); // ok ?
router.post('/:idCanal/createSujet', sujetCtrl.createSujet); // ok ?
router.put('/:idCanal/:idSujet', sujetCtrl.modifySujet); //ok ?
router.delete('/:idCanal/:idSujet', sujetCtrl.deleteSujet); // ok ?

module.exports = router;