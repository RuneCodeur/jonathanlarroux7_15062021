
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");

const connect = require('../connect')

//obtient la liste de tout les canaux -- ok 
exports.getAllCanal= (req, res) => {
  connect.query("SELECT * FROM list_canal;")
  .then(response => res.status(200).json({response}))
  .catch(error => res.status(500).json({error}));
};

//crée un canal --ok 
exports.createCanal= (req, res) => {
  if((regex.test(req.body.canalName) === true)){
    connect.query("INSERT INTO list_canal SET nom_canal='" + req.body.canalName + "';")
    .then(() => res.status(200).json({ message: "nouveau canal crée !"}))
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