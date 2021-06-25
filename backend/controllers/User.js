const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');
const Sequelize = require('sequelize');
let regex = new RegExp("^[A-Za-z-_ 0-9]+$");
let mailRegex = new RegExp("^[A-Za-z-_ 0-9.]+@([A-Za-z-_ 0-9-]+\.)+[A-Za-z]$");

const sequelize = new Sequelize("groupomania", "root", "oblivion",{
  dialect: "mysql",
  host:"localhost"
});

//crée un nouveau compte utilisateur -- ok
exports.signup = (req, res) => {
  if ((regex.test(req.body.mdp) === true) && (mailRegex.test(req.body.mail) === true) && (regex.test(req.body.pseudo) === true)){
    bcrypt.hash(req.body.mdp, 10)
    .then(hash =>{
      sequelize.query("INSERT INTO users SET nom ='" + req.body.pseudo + "', mail='" + req.body.mail + "', mdp='" + hash + "', status='poisson';")
      .then(() => {
        return res.status(200).json({ message: "utilisateur crée !" });
      })
      .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  }else {
    return res.status(405).json({ error: "caractère non autorisé." });
  }
};

//connecte un utilisateur à son compte. -- ok
exports.login = (req, res) => {
  console.log(req.query)
  if ((regex.test(req.query.mdp) === true) && (mailRegex.test(req.query.mail) === true)){
    sequelize.query("SELECT * FROM users WHERE mail='" + req.query.mail + "';")
    .then(response => {
      bcrypt.compare(req.query.mdp, response.mdp)
      .then(() => {
        console.log('utilisateur connecté !')
        res.status(200).json({
        id: response.id,
        status: response.status,
        pseudo: response.pseudo,
        mail: response.mail,
        token: jwt.sign(
          {id: response.id},
          '487b05ac-0e11-4720-a02b-c36806ea094c', //clé secrete
          { expiresIn: '1H' }, //durée d'expiration du token
          {httpOnly: true})
        })
      }).catch(() => res.status(401).json({ error: "mot de passe incorrect." }));
    }).catch(() => res.status(405).json({ error: "utilisateur introuvable." }));
  }else {
    console.log("caractère non autorisé.")
    return res.status(405).json({ error: "caractère non autorisé." });
  }
};

//modifie un utilisateur -- ok ?
exports.modify = (req, res) =>{
  if((regex.test(req.body.newName) === true) && (mailRegex.test(req.body.mail) === true)){ 
    sequelize.query("UPDATE users SET nom = '" + req.body.newName + "' WHERE id =" + req.body.id + " AND mail ='" + req.body.mail + "';")
    .then(() => res.status(200).json({ message: "pseudo de l'utilisateur modifié !"}))
    .catch(() => res.status(500).json({ error: "action non autorisé." }));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
}

//supprime le compte utilisateur -- ok ?
exports.delete = (req, res) =>{
  if((mailRegex.test(req.body.mail) === true) && (regex.test(req.body.pseudo) === true)){ 
  sequelize.query ("DELETE FROM users WHERE mail='" + req.body.mail + "' AND id=" + req.body.id + " AND nom='" + req.body.pseudo + "';")
    .then(() => res.status(200).json({ message: "utilisateur supprimé !"}))
    .catch(() => res.status(500).json({ error: "action non autorisé." }));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
}
