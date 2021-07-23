const nl2br  = require('nl2br');
const connection = require('../connect');
const fs = require('fs');

//obtient la liste de tout les messages du sujet
exports.getMsg= (req, res) => {
  connection.execute(
    "SELECT list_msg.id AS id, list_msg.id_user AS id_user, users.pseudo AS name_user, list_msg.message AS message, list_msg.media AS media, DATE_FORMAT(list_msg.date, '%d/%m/%Y à %HH%i') as date FROM list_msg LEFT OUTER JOIN users ON list_msg.id_user = users.id  WHERE id_forum = ? AND id_sujet= ? ;",
    [req.params.idForum, req.params.idSujet],
    function(err, result){
      if(err){
        res.status(500).json({error: "commande invalide"});
      }
      else if(result){
        res.status(200).json({result});
      }
    }
  )
};

//crée un message
exports.createMsg= (req, res) => {
  //si il y a un media
  if( req.file !== undefined ){
    let response = JSON.parse(req.body.message);
    let localMedia = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    connection.execute(
      "INSERT INTO list_msg SET id_user= ? , message= ? , media= ? , date= SYSDATE(), id_forum= ?, id_sujet= ? ;",
      [response.id, nl2br(response.msg), localMedia, req.params.idForum, req.params.idSujet],
      function(err, result){
        if(err){
          res.status(500).json({error: "commande invalide"});
        }
        else if(result){
          res.status(200).json({message: "message posté !"});
        }
    })
    //si il y a juste du texte
  }else{
    //si il y a un gif 
    if(req.body.gif !== '' ){
      connection.execute(
        "INSERT INTO list_msg SET id_user= ? , message= ? , media= ? , date=SYSDATE() , id_forum= ? , id_sujet= ? ;",
        [req.body.id, nl2br(req.body.msg), req.body.gif, req.params.idForum, req.params.idSujet],
        function(err, result){
          if(err){
            res.status(500).json({error: 'commande invalide'});
          }
          else if(result){
            res.status(200).json({message: "message posté !"});
          }
      })
    }
      //si il n'y a pas de gif
      else if(req.body.msg !== ''){
      connection.execute(
        "INSERT INTO list_msg SET id_user= ? , message= ? , date=SYSDATE() , id_forum= ? , id_sujet= ? ;",
        [req.body.id, nl2br(req.body.msg), req.params.idForum, req.params.idSujet],
        function(err, result){
          if(err){
            res.status(500).json({error: 'commande invalide'});
          }
          else if(result){
            res.status(200).json({message: "message posté !"});
          }
      })
    }else{
      return res.status(400).json({error: "votre message est vide."});
    }
  }
};

//obtient la liste de tout les messages récents
exports.getNewMsg= (req, res) => {
  connection.execute(
    "SELECT list_msg.message AS message, list_msg.id_user AS id_user, users.pseudo AS pseudo, list_msg.media AS media, DATE_FORMAT(list_msg.date, '%d/%m/%Y à %HH%i') as date, list_msg.id_forum AS idForum, list_msg.id_sujet AS idSujet, list_sujet.nom_sujet AS nomSujet, list_forum.nom_Forum AS nomForum FROM list_msg JOIN list_forum ON list_msg.id_Forum = list_forum.id JOIN list_sujet ON list_msg.id_sujet = list_sujet.id JOIN users ON list_msg.id_user = users.id ORDER BY date DESC LIMIT 10 ;",
    function(err, result){
      if(err){
        res.status(500).json({error: 'commande invalide'});
      }
      else if(result){
        res.status(200).json({result});
      }
    }
  )
};

//modifie un message
exports.modifyMyMsg= (req, res) => {
  if(req.body.newMsg !== ''){
    connection.execute(
      "UPDATE list_msg SET message= ? WHERE id= ? ;",
      [nl2br(req.body.newMsg), req.params.idMsg],
      function(err, result){
        if(err){
          res.status(500).json({error: 'commande invalide'});
        }
        else if(result){
          res.status(200).json({message: "message modifié !"});
        }
    })
  }else{
    return res.status(400).json({error: "Votre message est vide"});
  }
};

//supprime son message
exports.deleteMyMsg= (req, res) => {
  connection.execute(
    "SELECT media from list_msg WHERE id= ? ;",
    [req.params.idMsg],
    function (err, result){
      if(err){
        res.status(500).json({error: 'commande invalide'});
      }
      //si il n'y a pas de media
      else if(result[0].media === null){
        connection.execute(
          "DELETE FROM list_msg WHERE id= ? ;",
          [req.params.idMsg],
          function (err, result){
            if(err){
              res.status(500).json({error: 'commande invalide'});
            }
            else if(result){
              res.status(200).json({message: "message supprimé !"});
            }
        })
      }
      //si il y a un media
      else if(result[0].media !== null){
        const filename = result[0].media.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          connection.execute(
            "DELETE FROM list_msg WHERE id= ? ;",
            [req.params.idMsg],
            function (err, result){
              if(err){
                res.status(500).json({error: 'commande invalide'});
              }
              else if(result){
                res.status(200).json({message: "message supprimé !"});
              }
          })
        })
      }
    }
  )
};