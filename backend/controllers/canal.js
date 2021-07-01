
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");

const connect = require('../connect')

//obtient la liste de tout les canaux -- ok 
exports.getAllCanal= (req, res) => {
  connect.query("SELECT * FROM list_canal;")
  .then(response => res.status(200).json({response}))
  .catch(error => res.status(500).json({error}));
};

//obtient la liste de tout les sujet suivant le canal choisi -- ok
exports.getAllSujet= (req, res) => {
  connect.query("SELECT id, nom_sujet, id_creator, pseudo_creator FROM list_sujet WHERE position_canal = " + req.params.idCanal + ";")
  .then(response => res.status(200).json({response}))
  .catch(error => res.status(500).json({error}));
};

//crée un canal --ok 
exports.createCanal= (req, res) => {
  if((regex.test(req.body.params.canalName) === true)){
    connect.query("INSERT INTO list_canal SET nom_canal='" + req.body.params.canalName + "';")
    .then(() => res.status(200).json({ message: "nouveau canal crée !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//creer un sujet avec un message -- ok 
exports.createSujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true) && (regex.test(req.body.pseudo) === true) && (regex.test(req.body.msg) === true)){
    connect.query("SET autocommit=0;")
    .then(() => {
      connect.query("INSERT INTO list_sujet SET nom_sujet='" + req.body.sujetName.replace("'", "''") + "', position_canal= " + req.body.idCanal + ", id_creator= " + req.body.id + ", pseudo_creator= '" + req.body.pseudo + "';")
      .then(() => {
      connect.query("INSERT INTO list_msg SET id_user=" + req.body.id + ", name_user= '" + req.body.pseudo + "', message='" + req.body.msg.replace("'", "''") + "', date=NOW(), position_canal=" + req.body.idCanal+ ", position_sujet= ( SELECT id FROM list_canal ORDER BY id DESC LIMIT 0,1 );")
      .then(() => {
        connect.query("COMMIT;")
        .then(() => {
          connect.query("SET autocommit=1;")
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
    connect.query("UPDATE list_canal SET nom_canal='" + req.body.canalName + "' WHERE id=" + req.body.idCanal + ";")
    .then(() => res.status(200).json({ message: "nouveau canal crée !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//modifie le nom d'un sujet -- ok
exports.modifySujet= (req, res) => {
  if((regex.test(req.body.sujetName) === true)){
    connect.query("UPDATE list_sujet SET nom_sujet='" + req.body.sujetName.replace("'", "''") + "' WHERE id=" + req.body.idSujet + ";")
    .then(() => res.status(200).json({ message: "le sujet à changé de nom !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "Caractère non autorisé." });
  }
};

//supprime un canal --ok
exports.deleteCanal= (req, res) => {
  if((regex.test(req.body.canalName) === true)){
    connect.query("DELETE FROM list_canal WHERE id=" + req.body.idCanal + " AND nom_canal='" + req.body.canalName + "';")
    .then(() => res.status(200).json({ message: "canal supprimé !"}))
    .catch(error => res.status(500).json({error}));
  }else{
    return res.status(405).json({ message: "ce canal n'existe pas." });
  }
};

//supprime un sujet -- ok
exports.deleteSujet= (req, res) => {
    connect.query("DELETE FROM list_sujet WHERE id=" + req.body.idSujet + ";")
    .then(() => res.status(200).json({ message: "sujet supprimé !"}))
    .catch(error => res.status(500).json({error}));
};
