const Sequelize = require('sequelize');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");

const sequelize = new Sequelize("groupomania", "root", "oblivion",{
  dialect: "mysql",
  host:"localhost"
});


//selectionne tout les sujets du canal -- ok
exports.getSujet= (req, res) => {
  sequelize.query("SELECT id, nom_sujet, creator FROM list_sujet WHERE position_canal = " + req.body.idCanal + ";")
  .then(response => res.status(200).json({response}))
  .catch(error => res.status(500).json({error}));
};

//creer un sujet -- ok 
exports.createSujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true)){
    sequelize.query("INSERT INTO list_sujet SET nom_sujet='" + req.body.sujetName.replace("'", "''") + "', creator= " + req.body.userId + ", position_canal= " + req.body.idCanal + " ;")
    .then(() => res.status(200).json({ message: "nouveau sujet crée !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//modifie le nom d'un sujet -- ok
exports.modifySujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true)){
    sequelize.query("UPDATE list_sujet SET nom_sujet='" + req.body.sujetName.replace("'", "''") + "' WHERE id=" + req.body.idSujet + ";")
    .then(() => res.status(200).json({ message: "le sujet à changé de nom !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//supprime un sujet -- ok
exports.deleteSujet= (req, res) => {
    sequelize.query("DELETE FROM list_sujet WHERE id=" + req.body.idSujet + ";")
    .then(() => res.status(200).json({ message: "sujet supprimé !"}))
    .catch(error => res.status(500).json({error}));
};
