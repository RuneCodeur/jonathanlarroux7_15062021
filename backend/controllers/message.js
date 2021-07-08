const connection = require('../connect');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");


//obtient la liste de tout les messages du sujet -- ok
exports.getMsg= (req, res) => {
  connection.promise().query("SELECT list_msg.id AS id, list_msg.id_user AS id_user, users.pseudo AS name_user, list_msg.message AS message, list_msg.media AS media, DATE_FORMAT(list_msg.date, '%d/%m/%Y à %HH%i') as date FROM list_msg INNER JOIN users ON list_msg.id_user = users.id  WHERE position_canal = " + req.params.idCanal + " AND position_sujet= " + req.params.idSujet + ";")
  .then(([row, fields]) => {res.status(200).json({row})})
  .catch(error => res.status(500).json({error}));
};

//crée un message -- ok
exports.createMsg= (req, res) => {
  //si il n'y a pas de media
  if( req.file === undefined){
    if((regex.test(req.body.msg) === true)){
      console.log(req.body)
      connection.promise().query("INSERT INTO list_msg SET id_user=" + req.body.id + ", message='" + req.body.msg + "', date=SYSDATE(), position_canal=" + req.body.idCanal+ ", position_sujet=" + req.body.idSujet + ";")
      .then(() => res.status(200).json({ message: "message posté !"}))
      .catch(error => res.status(500).json({error})); 
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  //si il y a un media
  }else if( req.file !== undefined){
    if((regex.test(req.body.msg) === true)){
      media= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      connection.promise().query("INSERT INTO list_msg SET id_user=" + req.body.userId + ", name_user='" + req.body.userName + "', message='" + req.body.msg + "', media='" + media + "', date=SYSDATE(), position_canal=" + req.body.idCanal+ ", position_sujet=" + req.body.idSujet + ";")
      .then(() => res.status(200).json({ message: "message posté !"}))
      .catch(error => res.status(500).json({error}));
    }else{
      return res.status(405).json({ message: "Caractère non autorisé." });
    }
  }
};

//obtient la liste de tout les messages récents -- ok
exports.getNewMsg= (req, res) => {
  connection.promise().query("SELECT list_msg.id_user AS id_user, users.pseudo AS pseudo, list_msg.message AS message, list_msg.media AS media, DATE_FORMAT(list_msg.date, '%d/%m/%Y à %HH%i') as date, list_msg.position_canal AS idCanal, list_msg.position_sujet AS idSujet, list_sujet.nom_sujet AS nomSujet, list_canal.nom_canal AS nomCanal FROM list_msg INNER JOIN users ON list_msg.id_user = users.id INNER JOIN list_sujet ON list_msg.position_sujet = list_sujet.id INNER JOIN list_canal ON list_msg.position_canal = list_canal.id ORDER BY date LIMIT 10;")
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