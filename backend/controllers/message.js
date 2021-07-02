
const connect = require('../connect')
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");


//obtient la liste de tout les messages du sujet -- ok
exports.getMsg= (req, res) => {
  connect.query("SELECT id, id_user, name_user, message, media, DATE_FORMAT(date, '%d/%m/%Y à %HH%i') as date FROM list_msg WHERE position_canal = " + req.params.idCanal + " AND position_sujet= " + req.params.idSujet + ";")
  .then(response =>{ 
    res.status(200).json({response})})
  .catch(error => res.status(500).json({error}));
};

//crée un message -- ok
exports.createMsg= (req, res) => {
  console.log('lolilol423')
  //si il n'y a pas de media
  if( req.file === undefined){
    if((regex.test(req.body.msg) === true)){
      connect.query("INSERT INTO list_msg SET id_user=" + req.body.id + ", name_user= '" + req.body.pseudo + "', message='" + req.body.msg + "', date=NOW(), position_canal=" + req.body.idCanal+ ", position_sujet=" + req.body.idSujet + ";")
      .then(() => res.status(200).json({ message: "message posté !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  //si il y a un media
  }else if( req.file !== undefined){
    if((regex.test(req.body.msg) === true)){
      media= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      connect.query("INSERT INTO list_msg SET id_user=" + req.body.userId + ", name_user='" + req.body.userName + "', message='" + req.body.msg + "', media='" + media + "', date=NOW(), position_canal=" + req.body.idCanal+ ", position_sujet=" + req.body.idSujet + ";")
      .then(() => res.status(200).json({ message: "message posté !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  }
};

//obtient la liste de tout les messages récents -- ok
exports.getNewMsg= (req, res) => {
  connect.query("SELECT id_user, name_user, message, media, date, position_canal, position_sujet FROM list_msg ORDER BY date LIMIT 10;")
  .then(response => res.status(200).json({response}))
  .catch(error => res.status(500).json({error}));
};

//modifie son message --  ok
exports.modifyMyMsg= (req, res) => {
  //si il n'y a pas de media
  if( req.file === undefined){
    if((regex.test(req.body.msg) === true)){
      connect.query("UPDATE list_msg SET message= '" + req.body.msg + "', date= NOW() WHERE id=" + req.body.msgId + ";")
      .then(() => res.status(200).json({ message: "message modifié !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  //si il y a un media
  }else if( req.file !== undefined){
    if((regex.test(req.body.msg) === true)){
      media= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      connect.query("UPDATE list_msg SET message= '" + req.body.msg + "', media='" + media + "', date= NOW() WHERE id=" + req.body.msgId + ";")
      .then(() => res.status(200).json({ message: "message modifié !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  }
};

//supprime son message -- ok
exports.deleteMyMsg= (req, res) => {
  connect.query("DELETE FROM list_msg WHERE id=" + req.body.msgId + ";")
  .then(() => res.status(200).json({ message: "message supprimé !"}))
  .catch(error => res.status(500).json({error}));
};