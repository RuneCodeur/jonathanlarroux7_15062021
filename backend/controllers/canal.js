const connection = require('../connect');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");


//obtient la liste de tout les canaux
exports.getAllCanal= (req, res) => {
  connection.promise().query("SELECT * FROM list_canal;")
  .then(([row, fields]) =>{res.status(200).json({row})})
  .catch(error => res.status(500).json({error}))
};

//obtient la liste de tout les sujet suivant le canal choisi -- ok
exports.getAllSujet= (req, res) => {
  connection.promise().query("SELECT id, nom_sujet, id_creator, pseudo_creator FROM list_sujet WHERE position_canal = " + req.params.idCanal + ";")
  .then(([row, fields]) =>{res.status(200).json({row})})
  .catch(error => res.status(500).json({error}));
};

//crée un canal
exports.createCanal= (req, res) => {
  if((regex.test(req.body.params.canalName) === true)){
    connection.promise().query("INSERT INTO list_canal SET nom_canal='" + req.body.params.canalName + "';")
    .then(() => res.status(200).json({ message: "nouveau canal crée !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//creer un sujet avec un message -- ok 
exports.createSujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true) && (regex.test(req.body.pseudo) === true) && (regex.test(req.body.msg) === true)){
    connection.promise().query("SET autocommit=0;")
    .then(() => {
      connection.promise().query("INSERT INTO list_sujet SET nom_sujet='" + req.body.sujetName.replace("'", "''") + "', position_canal= " + req.body.idCanal + ", id_creator= " + req.body.id + ", pseudo_creator= '" + req.body.pseudo + "';")
      .then(() => {
      connection.promise().query("INSERT INTO list_msg SET id_user=" + req.body.id + ", name_user= '" + req.body.pseudo + "', message='" + req.body.msg.replace("'", "''") + "', date=NOW(), position_canal=" + req.body.idCanal+ ", position_sujet= ( SELECT id FROM list_sujet ORDER BY id DESC LIMIT 0,1 );")
      .then(() => {
        connection.promise().query("COMMIT;")
        .then(() => {
          connection.promise().query("SET autocommit=1;")
          .then(() => res.status(200).json({ message: "nouveau sujet crée !"}))
          .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
      })
      .catch(error => res.status(500).json({error}));
      })
      .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }

};

//modifie le nom d'un canal --ok 
exports.modifyCanal= (req, res) => {
  if((regex.test(req.body.canalName) === true)){
    connection.promise().query("UPDATE list_canal SET nom_canal='" + req.body.canalName + "' WHERE id=" + req.body.canalId + ";")
    .then(() => res.status(200).json({ message: "nouveau canal crée !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//modifie le nom d'un sujet -- ok
exports.modifySujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true)){
    connection.promise().query("UPDATE list_sujet SET nom_sujet='" + req.body.sujetName.replace("'", "''") + "' WHERE id=" + req.body.sujetId + ";")
    .then(() => res.status(200).json({ message: "le sujet à changé de nom !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//supprime un canal --ok
exports.deleteCanal= (req, res) => {
  if((regex.test(req.body.canalName) === true)){
    connection.promise().query("DELETE FROM list_canal WHERE id=" + req.params.idCanal + ";")
    .then(() => res.status(200).json({ message: "canal supprimé !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "ce canal n'existe pas." });
  }
};

//supprime un sujet -- ok
exports.deleteSujet= (req, res) => {
    connection.promise().query("DELETE FROM list_sujet WHERE id=" + req.params.idSujet + ";")
    .then(() => res.status(200).json({ message: "sujet supprimé !"}))
    .catch(error => res.status(500).json({error}));
};
