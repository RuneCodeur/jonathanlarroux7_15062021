const connection = require('../connect');
let regex = new RegExp("^[A-Za-z-éèêëçàâùï€$£_'.;:,@?!()\n 0-9]+$");
let fs = require('fs')

//obtient la liste de tout les messages du sujet
exports.getMsg= (req, res) => {
  connection.execute(
    "SELECT list_msg.id AS id, list_msg.id_user AS id_user, users.pseudo AS name_user, list_msg.message AS message, list_msg.media AS media, DATE_FORMAT(list_msg.date, '%d/%m/%Y à %HH%i') as date FROM list_msg LEFT OUTER JOIN users ON list_msg.id_user = users.id  WHERE position_canal = ? AND position_sujet= ? ;",
    [req.params.idCanal, req.params.idSujet],
    function(err, result){
      if(err){
        res.status(500).json({error: 'commande invalide'})
      }
      else if(result){
        res.status(200).json({result})
      }
    }
  )
};

//crée un message
exports.createMsg= (req, res) => {
  //si il n'y a pas de media
  if((regex.test(req.body.msg) === true)){
    if( req.file === undefined){
      connection.execute(
        "INSERT INTO list_msg SET id_user= ? , message= ? , date=SYSDATE(), position_canal= ?, position_sujet= ? ;",
        [req.body.id, req.body.msg, req.params.idCanal, req.params.idSujet],
        function(err, result){
          if(err){
            res.status(500).json({error: 'commande invalide'})
          }
          else if(result){
            res.status(200).json({message: "message posté !"})
          }
      })
    }
  //si il y a un media
    else if( req.file !== undefined){
      let response = JSON.parse(req.body.message)
       let localMedia = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      connection.execute(
        "INSERT INTO list_msg SET id_user= ? , message= ? , media=?, date=SYSDATE(), position_canal= ?, position_sujet= ? ;",
        [response.id, response.msg, localMedia, req.params.idCanal, req.params.idSujet],
        function(err, result){
          if(err){
            res.status(500).json({error: 'commande invalide'})
          }
          else if(result){
            res.status(200).json({message: "message posté !"})
          }
      })
    }
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
};

//obtient la liste de tout les messages récents
exports.getNewMsg= (req, res) => {
  connection.execute(
    "SELECT list_msg.message AS message, list_msg.id_user AS id_user, users.pseudo AS pseudo, list_msg.media AS media, DATE_FORMAT(list_msg.date, '%d/%m/%Y à %HH%i') as date, list_msg.position_canal AS idCanal, list_msg.position_sujet AS idSujet, list_sujet.nom_sujet AS nomSujet, list_canal.nom_canal AS nomCanal FROM list_msg LEFT OUTER JOIN list_canal ON list_msg.position_canal = list_canal.id LEFT OUTER JOIN list_sujet ON list_msg.position_sujet = list_sujet.id LEFT OUTER JOIN users ON list_msg.id_user = users.id ORDER BY date LIMIT 10;",
    function(err, result){
      if(err){
        res.status(500).json({error: 'commande invalide'})
      }
      else if(result){
        res.status(200).json({result})
      }
    }
  )
};

//modifie son message
exports.modifyMyMsg= (req, res) => {
  if((regex.test(req.body.msg) === true)){
    connection.execute(
      "UPDATE list_msg SET message= ? , date= NOW() WHERE id= ? ;",
      [req.body.newMsg, req.body.idMsg],
      function(err, result){
        if(err){
        res.status(500).json({error: 'commande invalide'})
        }
        else if(result){
        res.status(200).json({message: "message modifié !"})
        }
    })  
  }else{
    return res.status(405).json({ error: "Caractère non autorisé." });
  }
};

//supprime son message
exports.deleteMyMsg= (req, res) => {
  connection.execute(
    "SELECT media from list_msg WHERE id= ? ;",
    [req.params.idMsg],
    function (err, result){
      if(err){
        res.status(500).json({error: 'commande invalide'})
      }
      //si il n'y a pas de media
      else if(result[0].media === null){
        connection.execute(
          "DELETE FROM list_msg WHERE id= ? ;",
          [req.params.idMsg],
          function (err, result){
            if(err){
              res.status(500).json({error: 'commande invalide'})
            }
            else if(result){
              res.status(200).json({message: "message supprimé !"})
            }
        })
      }
      //si il y a un media
      else if (result[0].media !== null){
        const filename = result[0].media.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          connection.execute(
            "DELETE FROM list_msg WHERE id= ? ;",
            [req.params.idMsg],
            function (err, result){
              if(err){
                res.status(500).json({error: 'commande invalide'})
              }
              else if(result){
                res.status(200).json({message: "message supprimé !"})
              }
          })
        })
      }
    }
  )
};