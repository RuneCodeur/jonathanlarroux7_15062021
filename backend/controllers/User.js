const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../connect');
let regex = new RegExp('^([a-zA-Z0-9]){3,20}$');
let mailRegex = new RegExp("^[A-Za-z-_0-9.]+@([A-Za-z-_0-9-]+.)+[A-Za-z]$");
let regexMdp = new RegExp ('^.{5,}$');

//crée un nouveau compte utilisateur
exports.signup = (req, res) => {
  if((req.body.mdp && regexMdp.test(req.body.mdp) === true) && (req.body.mail && mailRegex.test(req.body.mail) === true) && (req.body.pseudo && regex.test(req.body.pseudo) === true)){
    bcrypt.hash(req.body.mdp, 10)
    .then(hash =>{
      connection.execute(
        "INSERT INTO users SET pseudo = ? , mail= ? , mdp= ? ;",
        [req.body.pseudo, req.body.mail, hash],
        function(err, result){
          if(err){
            res.status(400).json({error: "Pseudo ou mail déja utilisé."});
          }
          else if(result){
            res.status(200).json({message: "Utilisateur crée !"});
          }
      })
    })
    .catch(() => res.status(500).json({ error }));
  }else {
    return res.status(405).json({error: "Caractère non autorisé."});
  }
};

//connecte un utilisateur à son compte
exports.login = (req, res) => {
  if((req.query.mdp && regex.test(req.query.mdp) === true) && (req.query.mail && mailRegex.test(req.query.mail) === true)){
    connection.execute(
      "SELECT * FROM users WHERE mail= ? LIMIT 1 ;",
      [req.query.mail],
      function(err, response){
        if(err){
          res.status(500).json({error: "Commande invalide."});
        }
        else if(response){
          if(response[0] == undefined ){
            res.status(405).json({error: "Utilisateur non trouvé."});
          }else{
            bcrypt.compare(req.query.mdp, response[0].mdp, function(err, result){ 
              if(result === true){
              res.status(200).json({
              id: response[0].id,
              status: response[0].status,
              pseudo: response[0].pseudo,
              mail: response[0].mail,
              token: jwt.sign(
                {id: response[0].id},
                '487b05ac-0e11-4720-a02b-c36806ea094c', //clé secrete
                { expiresIn: '72H' }, //durée d'expiration du token
                {httpOnly: true})
              })
              }
              else{
                return res.status(401).json({error: "Mot de passe incorrect."});
              }
            })
          }
        }
    })
  }else {
    return res.status(405).json({error: "Caractère non autorisé."});
  }
};

//modifie un utilisateur
exports.modify = (req, res) =>{
  if(req.body.newPseudo !== ''){
    if(regex.test(req.body.newPseudo) === true){ 
      connection.execute(
        "UPDATE users SET pseudo = ? WHERE id = ? ;",
        [req.body.newPseudo, req.body.id],
        function(err, result){
          if(err){
            res.status(400).json({error: "Pseudo déja utilisé."});
          }
          else if(result){
            res.status(200).json({message: "Votre pseudo à été modifié !"});
          }
      })
    }else{
      return res.status(405).json({error: "Caractère non autorisé."});
    }
  }else{
    return res.status(405).json({error: "Votre pseudo doit contenir au moins 3 caractères."});
  }
}

//supprime le compte utilisateur
exports.delete = (req, res) =>{
  if(regex.test(req.query.pseudo) === true){ 
    connection.execute("DELETE FROM users WHERE id= ? AND pseudo= ? ;",
    [req.query.id, req.query.pseudo],
    function(err, result){
      if(err){
        res.status(500).json({error: "Action non autorisé."});
      }
      else if(result){
        res.status(200).json({message: "Utilisateur supprimé !"});
      }
  })
  }else{
    return res.status(500).json({error: "Action non autorisé."});
  }
}
