const connection = require('../connect');

//obtient la liste de tout les forums
exports.getAllForum= (req, res) => {
  connection.execute(
    "SELECT * FROM list_forum ;",
    function(err, result){
      if(err){
        res.status(500).json({error: 'Commande invalide.'});
      }
      else if(result){
        res.status(200).json({result});
      }
  });
};

//obtient la liste de tout les sujet suivant le forum choisi
exports.getAllSujet= (req, res) => {
  connection.execute(
    "SELECT list_sujet.id AS id, list_sujet.nom_sujet AS nom_sujet, list_sujet.id_user AS id_creator, users.pseudo AS pseudo_creator FROM list_sujet LEFT OUTER JOIN users on list_sujet.id_user = users.id WHERE id_forum = ? ;",
    [req.params.idForum],
    function(err, result){
      if(err){
        res.status(500).json({error: "Commande invalide."});
      }
      else if(result){
        res.status(200).json({result});
      }
  });
};

//crée un forum
exports.createForum= (req, res) => {
  if(req.body.forumName !== '' ){
    connection.execute(
      "INSERT INTO list_forum SET nom_forum= ? ;",
      [ req.body.forumName ],
      function(err, result){
        if(err){ 
          res.status(500).json({error: "Commande invalide."});
        }
        else if(result){
          res.status(200).json({message: "Nouveau forum crée !"});
        }
    })
  }else{
    return res.status(400).json({error: "Le titre du forum est vide."});
  }
};

//creer un sujet avec un message
exports.createSujet= (req, res) => {
  if (req.body.sujetName !== '' ){
    if(req.body.msg !== '' ){
      connection.promise().execute(
        "Set autocommit = 0 ;"
      )
      .then(() =>{
        return connection.promise().execute(
          "INSERT INTO list_sujet SET nom_sujet= ? , id_forum= ? , id_user= ? ;",
          [req.body.sujetName, req.params.idForum, req.body.id]
        )
      })
      .then(() =>{
        return connection.promise().execute(
          "INSERT INTO list_msg SET id_user= ? , message= ? , date= SYSDATE(), id_forum= ? , id_sujet= ( SELECT id FROM list_sujet ORDER BY id DESC LIMIT 0,1 ) ;",
          [req.body.id, req.body.msg, req.params.idForum]
        )
      })
      .then(() =>{
        return connection.promise().execute(
          "COMMIT ;"
        )
      })
      .then(
        connection.promise().execute(
          "SET autocommit= 1 ;"
        )
      )
      .then(()=>{ 
        res.status(200).json({message: "Nouveau sujet crée !"});
      })
      .catch(() =>{
        res.status(500).json({error: "Commande invalide."});
      })
    }else{
      return res.status(400).json({error: "Vous message est vide."});
    }
  }else{
    return res.status(405).json({error: "Vous devez donner un titre à votre sujet."});
  }
}

//modifie le nom d'un forum
exports.modifyForum= (req, res) => {
  if(req.body.forumName !== '' ){
    connection.execute(
      "UPDATE list_forum SET nom_forum= ? WHERE id= ? ;",
      [req.body.forumName, req.body.forumId],
      function(err, result){
        if(err){
          res.status(500).json({error: "commande invalide"});
        }
        else if(result){
          res.status(200).json({message: "nouveau nom pour ce forum !"});
        }
    })
  }else{
    return res.status(400).json({error: "le titre du forum est vide."});
  }
};

//modifie le nom d'un sujet
exports.modifySujet= (req, res) => {
  if(req.body.sujetName !== '' ){
    connection.execute(
      "UPDATE list_sujet SET nom_sujet= ? WHERE id= ? ;",
      [req.body.sujetName, req.body.idSujet],
      function(err, result){
        if(err){
          res.status(500).json({error: "commande invalide"});
        }
        else if(result){
          res.status(200).json({message: "nouveau nom pour ce sujet !"});
        }
    })
  }else{
    return res.status(400).json({error: "le titre du sujet est vide."});
  }
};

//supprime un forum
exports.deleteForum= (req, res) => {
  connection.execute(
    "DELETE FROM list_forum WHERE id= ? ;",
    [req.params.idForum],
    function(err, result){
      if(err){
        res.status(500).json({error: "commande invalide"});
      }
      else if(result){
        res.status(200).json({message: "forum supprimé !"});
      }
  })
};

//supprime un sujet
exports.deleteSujet= (req, res) => {
  connection.execute(
    "DELETE FROM list_sujet WHERE id= ? ;",
    [req.params.idSujet],
    function(err, result){
      if(err){
        res.status(500).json({error: "commande invalide"});
      }
      else if(result){
        res.status(200).json({message: "sujet supprimé !"});
      }
  })
};
