const connection = require('../connect');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");


//obtient la liste de tout les messages du sujet -- ok
exports.getMsg= (req, res) => {
  connection.promise().query("SELECT id, id_user, name_user, message, media, DATE_FORMAT(date, '%d/%m/%Y à %HH%i') as date FROM list_msg WHERE position_canal = " + req.params.idCanal + " AND position_sujet= " + req.params.idSujet + ";")
  .then(([row, fields]) => {res.status(200).json({row})})
  .catch(error => res.status(500).json({error}));
};

//crée un message -- ok
exports.createMsg= (req, res) => {
  //si il n'y a pas de media
  if( req.file === undefined){
    if((regex.test(req.body.msg) === true)){
      connection.promise().query("INSERT INTO list_msg SET id_user=" + req.body.id + ", name_user= '" + req.body.pseudo + "', message='" + req.body.msg + "', date=SYSDATE(), position_canal=" + req.body.idCanal+ ", position_sujet=" + req.body.idSujet + ";")
      .then(() => res.status(200).json({ message: "message posté !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  //si il y a un media
  }else if( req.file !== undefined){
    if((regex.test(req.body.msg) === true)){
      media= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      connection.promise().query("INSERT INTO list_msg SET id_user=" + req.body.userId + ", name_user='" + req.body.userName + "', message='" + req.body.msg + "', media='" + media + "', date=NOW(), position_canal=" + req.body.idCanal+ ", position_sujet=" + req.body.idSujet + ";")
      .then(() => res.status(200).json({ message: "message posté !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  }
};

//obtient la liste de tout les messages récents -- ok
exports.getNewMsg= (req, res) => {
  connection.promise().query("SELECT id_user, name_user, message, media, DATE_FORMAT(date, '%d/%m/%Y à %HH%i') as date, position_canal, position_sujet FROM list_msg ORDER BY date LIMIT 10;")
  .then(([row, fields]) =>{res.status(200).json({row})})
  .catch(error => res.status(500).json({error}));
};

//modifie son message --  ok
exports.modifyMyMsg= (req, res) => {
  //si il n'y a pas de media
  if( req.file === undefined){
    if((regex.test(req.body.msg) === true)){
      connection.promise().query("UPDATE list_msg SET message= '" + req.body.newMsg + "', date= NOW() WHERE id=" + req.body.id + ";")
      .then(() => res.status(200).json({ message: "message modifié !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  //si il y a un media
  }else if( req.file !== undefined){
    if((regex.test(req.body.msg) === true)){
      media= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      connection.promise().query("UPDATE list_msg SET message= '" + req.body.msg + "', media='" + media + "', date= NOW() WHERE id=" + req.body.msgId + ";")
      .then(() => res.status(200).json({ message: "message modifié !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  }
};

//supprime son message -- ok
exports.deleteMyMsg= (req, res) => {
  connection.promise().query("DELETE FROM list_msg WHERE id=" + req.params.idMsg + ";")
  .then(() => res.status(200).json({ message: "message supprimé !"}))
  .catch(error => res.status(500).json({error}));
};