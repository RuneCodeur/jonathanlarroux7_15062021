const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../connect');
let regex = new RegExp("^[A-Za-z-_ 0-9]+$");
let mailRegex = new RegExp("^[A-Za-z-_ 0-9.]+@([A-Za-z-_ 0-9-]+\.)+[A-Za-z]$");

//crée un nouveau compte utilisateur
exports.signup = (req, res) => {
  if ((regex.test(req.body.mdp) === true) && (mailRegex.test(req.body.mail) === true) && (regex.test(req.body.pseudo) === true)){
    bcrypt.hash(req.body.mdp, 10)
    .then(hash =>{
      connection.promise().query("INSERT INTO users SET pseudo ='" + req.body.pseudo + "', mail='" + req.body.mail + "', mdp='" + hash + "';")
      .then(() => {
        return res.status(200).json({ message: "utilisateur crée !" });
      })
      .catch(error => res.status(500).json({ error }));
    })
    .catch(() => res.status(500).json({ error: 'ce pseudo est déja utilisée' }));
  }else {
    return res.status(405).json({ error: "caractère non autorisé." });
  }
};

//connecte un utilisateur à son compte
exports.login = (req, res) => {
  if ((regex.test(req.query.mdp) === true) && (mailRegex.test(req.query.mail) === true)){
    connection.promise().query("SELECT * FROM users WHERE mail='" + req.query.mail + "' LIMIT 1;")
    .then(([row, fields]) =>{
      let response= row[0]
      bcrypt.compare(req.query.mdp, response.mdp, function(err, result){
        if(result === true){
          res.status(200).json({
          id: response.id,
          status: response.status,
          pseudo: response.pseudo,
          mail: response.mail,
          token: jwt.sign(
            {id: response.id},
            '487b05ac-0e11-4720-a02b-c36806ea094c', //clé secrete
            { expiresIn: '72H' }, //durée d'expiration du token
            {httpOnly: true})
          })
        }
        else{
          res.status(401).json({ error: "mot de passe incorrect." })
        }
      })
    }).catch(() => res.status(405).json({ error: "utilisateur introuvable." }));
  }else {
    return res.status(405).json({ error: "caractère non autorisé." });
  }
};

//modifie un utilisateur
exports.modify = (req, res) =>{
  if(regex.test(req.body.params.newPseudo) === true){ 
    connection.promise().query("UPDATE users SET pseudo = '" + req.body.params.newPseudo + "' WHERE id =" + req.body.params.id + ";")
    .then(() => res.status(200).json({ message: "pseudo de l'utilisateur modifié !"}))
    .catch(() => res.status(500).json({ error: "action non autorisé." }));
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
}

//supprime le compte utilisateur
exports.delete = (req, res) =>{
  if(regex.test(req.query.pseudo) === true){ 
  connection.promise().query ("DELETE FROM users WHERE id=" + req.query.id + " AND pseudo='" + req.query.pseudo + "';")
    .then(() => res.status(200).json({ message: "utilisateur supprimé !"}))
    .catch(() => res.status(500).json({ error: "action non autorisé." }));
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
}
