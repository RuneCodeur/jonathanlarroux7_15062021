const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
let regex = new RegExp("^[A-Za-z-_ 0-9]+$");
const Sequelize = require('sequelize');
let mailRegex = new RegExp("^[A-Za-z-_ 0-9.]+@([A-Za-z-_ 0-9-]+\.)+[A-Za-z]$");

const sequelize = new Sequelize("groupomania", "root", "oblivion",{
  dialect: "mysql",
  host:"localhost"
});
//crée un nouveau compte utilisateur --ok
exports.signup = (req, res) => {
  sequelize.query("INSERT INTO users (nom, mail, mdp, status) VALUES ( '" + req.body.pseudo + "', '" + req.body.mail + "', '" + req.body.mdp + "', 'lol' );").then(() => {
    console.log('utilisateur crée !');
  })
  sequelize.query("SELECT * FROM users;").then(([results, metadata]) => {
    console.log(results);
  })
};

//connecte un utilisateur à son compte.
exports.login = (req, res) => {
  if ((regex.test(req.body.password) == true) && (mailRegex.test(req.body.email) == true)){ 
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              '487b05ac-0e11-4720-a02b-c36806ea094c', //clé secrete
              { expiresIn: '1H' }, //durée d'expiration du token
              {httpOnly: true}
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
      })
    .catch(error => res.status(500).json({ error }));
  } else{
    return res.status(405).json({ error: "caractère non autorisé." });
  }
};

//modifie un utilisateur
exports.modify = (req, res) =>{
  if((regex.test(req.body.name) == true) && (regex.test(req.body.manufacturer) == true) && (regex.test(req.body.description) == true) && (regex.test(req.body.mainPepper) == true)){ 
    if((req.body.heat > 0) && (req.body.heat <= 10)){
      Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(500).json({ error }));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  } 
}
//supprime le compte utilisateur

exports.delete = (req, res) =>{
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(500).json({ error }));
      });
  })
  .catch(() => res.status(404).json({ message : "cette sauce n'existe pas." }));
}
