const connection = require('../connect');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");


//obtient la liste de tout les canaux
exports.getAllCanal= (req, res) => {
  connection.execute(
    "SELECT * FROM list_canal;",
    function(err, result){
      if(err){
        res.status(500).json({error: 'commande invalide'})
      }
      else if(result){
        res.status(200).json({result})
      }
  });
};

//obtient la liste de tout les sujet suivant le canal choisi
exports.getAllSujet= (req, res) => {
  connection.execute(
    "SELECT list_sujet.id AS id, list_sujet.nom_sujet AS nom_sujet, list_sujet.id_user AS id_user, users.pseudo AS pseudo_creator FROM list_sujet LEFT OUTER JOIN users on list_sujet.id_user = users.id WHERE position_canal = ? ;",
    [ req.params.idCanal ],
    function(err, result){
      if(err){
        res.status(500).json({error: "commande invalide"})
      }
      else if(result){
        res.status(200).json({result})
      }
  });
};

//crée un canal
exports.createCanal= (req, res) => {
  if((regex.test(req.body.params.canalName) === true)){
    connection.execute(
      "INSERT INTO list_canal SET nom_canal= ? ;",
      [ req.body.params.canalName ],
      function(err, result){
        if(err){
          res.status(500).json({error: "commande invalide"})
        }
        else if(result){
          res.status(200).json({message: "nouveau canal crée !"})
        }
    })
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
};

//creer un sujet avec un message
exports.createSujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true) && (regex.test(req.body.pseudo) === true) && (regex.test(req.body.msg) === true)){
    connection.promise().execute(
      "Set autocommit = 0;"
      )
    .then(() =>{
      return connection.promise().execute(
        "INSERT INTO list_sujet SET nom_sujet= ? , position_canal= ? , id_user= ? ;",
        [req.body.sujetName.replace("'", "''"), req.body.idCanal, req.body.id],
      )
    })
    .then(() =>{
      return connection.promise().execute(
        "INSERT INTO list_msg SET id_user= ? , message= ?, date=NOW(), position_canal= ? , position_sujet= ( SELECT id FROM list_sujet ORDER BY id DESC LIMIT 0,1 );",
        [req.body.id, req.body.msg.replace("'", "''") , req.body.idCanal]
      )
    })
    .then(() =>{
      return connection.promise().execute(
        "COMMIT;",
      )
    })
    .then(
      connection.promise().execute(
        "SET autocommit=1;"
      )
    ).then(()=>{ 
      res.status(200).json({ message: "nouveau sujet crée !"})
    })
    .catch(() =>{ res.status(500).json({ error: "commande invalide" })})
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
}

//modifie le nom d'un canal
exports.modifyCanal= (req, res) => {
  if((regex.test(req.body.canalName) === true)){
    connection.execute(
      "UPDATE list_canal SET nom_canal= ? WHERE id= ? ;",
      [ req.body.canalName, req.body.canalId ],
      function(err, result){
        if(err){
          res.status(500).json({error: "commande invalide"})
        }
        else if(result){
          res.status(200).json({message: "nouveau nom pour ce canal !"})
        }
    })
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
};

//modifie le nom d'un sujet
exports.modifySujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true)){
    connection.execute(
      "UPDATE list_sujet SET nom_sujet= ? WHERE id= ? ;",
      [req.body.sujetName.replace("'", "''"), req.body.sujetId],
      function(err, result){
        if(err){
          res.status(500).json({error: "commande invalide"})
        }
        else if(result){
          res.status(200).json({message: "nouveau nom pour ce sujet !"})
        }
    })
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
};

//supprime un canal
exports.deleteCanal= (req, res) => {
  connection.execute("DELETE FROM list_canal WHERE id= ? ;",
    [req.params.idCanal],
    function(err, result){
      if(err){
        res.status(500).json({error: "commande invalide"})
      }
      else if(result){
        res.status(200).json({message: "canal supprimé !"})
      }
  })
};

//supprime un sujet
exports.deleteSujet= (req, res) => {
  connection.execute("DELETE FROM list_sujet WHERE id= ? ;",
    [req.params.idSujet],
    function(err, result){
      if(err){
        res.status(500).json({error: "commande invalide"})
      }
      else if(result){
        res.status(200).json({message: "canal supprimé !"})
      }
  })
};
