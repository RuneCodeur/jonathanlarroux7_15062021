const express = require ('express');
const router = express.Router();

const forumCtrl = require('../controllers/forum');
const auth = require('../middleware/auth');

router.get('/', auth.getAuth, forumCtrl.getAllForum); 
router.get('/:idForum', auth.getAuth,forumCtrl.getAllSujet);
router.post('/createForum', auth.sensibleAuth, forumCtrl.createForum);
router.post('/:idForum/createSujet', auth.getAuth, forumCtrl.createSujet); 
router.put('/modifyForum', auth.sensibleAuth, forumCtrl.modifyForum); 
router.put('/:idForum/modifySujet',auth.sensibleAuth, forumCtrl.modifySujet); 
router.delete('/:idForum', auth.deleteAuth, forumCtrl.deleteForum);
router.delete('/:idForum/:idSujet', auth.deleteAuth, forumCtrl.deleteSujet);

module.exports = router;