const jwt = require('jsonwebtoken');
const connection = require('../connect');

exports.getAuth= (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '487b05ac-0e11-4720-a02b-c36806ea094c');
        const userId = decodedToken.id;
        if( req.body.id && req.body.id != userId ){
            return res.status(500).json({error: "Identifiant non valide."});
        }else{
            next();
        }
    }catch{
        return res.status(401).json({error: "Requête non authentifiée !"});
    }
};

exports.sensibleAuth= (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '487b05ac-0e11-4720-a02b-c36806ea094c');
        const userId = decodedToken.id;
        if(req.body.id !== userId) {
            return res.status(500).json({error: "Identifiant non valide."});
        
        //modification ou ajout d'un Forum
        }else if(req.route.path === '/modifyForum' || req.route.path === '/createForum'){
            connection.execute(
                "SELECT status FROM users WHERE id= ? LIMIT 1;",
                [userId],
                function(err, result){
                    //si l'utilisateur est un modérateur
                    if(result[0].status == 1){
                        next()
                    }
                    //si l'utilisateur n'est pas modérateur
                    else{
                        return res.status(403).json({error: "Action non autorisé."});
                    }
            })
        }
        //modification d'un sujet
        else if(req.route.path === "/:idForum/modifySujet"){
            connection.execute(
                "SELECT status FROM users WHERE id= ? LIMIT 1 ;",
                [userId],
                function(err, result){
                    //si l'utilisateur est un modérateur
                    if(result[0].status == 1){
                        next();
                    }
                    //si l'utilisateur n'est pas modérateur
                    else if(result[0].status == 0){
                        connection.execute(
                            "SELECT id_user FROM list_sujet WHERE id= ? ;",
                            [req.body.idSujet],
                            function(err, result){
                                //si l'utilisateur est l'auteur du sujet
                                if(result[0].id_user == userId){
                                    next();
                                }
                                //si l'utilisateur n'est pas l'auteur du sujet
                                else if(result[0].id_user != userId){
                                    return res.status(403).json({error: "Action non autorisé."});
                                }
                                else{
                                    return res.status(500).json({error: "Commande invalide."});
                                }
                        })
                    }
            })
        }
        //modification d'un message
        else if(req.route.path === "/:idForum/:idSujet/:idMsg"){
            connection.execute(
                "SELECT status FROM users WHERE id= ? LIMIT 1 ;",
                [userId],
                function(err, result){
                    //si l'utilisateur est un modérateur
                    if(result[0].status == 1){
                        next();
                    }
                    //si l'utilisateur n'est pas modérateur
                    else if(result[0].status == 0){
                        connection.execute(
                            "SELECT id_user FROM list_msg WHERE id= ? ;",
                            [req.params.idMsg],
                            function(err, result){
                                //si l'utilisateur est l'auteur du sujet
                                if(result[0].id_user == userId){
                                    next();
                                }
                                //si l'utilisateur n'est pas l'auteur du sujet
                                else if(result[0].id_user != userId){
                                    return res.status(403).json({error: "Action non autorisé."});
                                }
                                else{
                                    return res.status(500).json({error: "Commande invalide."});
                                }
                        })
                    }
            })
        }
        else{
            return res.status(500).json({error: "Commande invalide."});
        }
    } catch{
        return res.status(401).json({error: "Requête non authentifiée !"});
    }
};

exports.deleteAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "487b05ac-0e11-4720-a02b-c36806ea094c");
        const userId = decodedToken.id;
        if(userId){
            //si un forum est supprimé
            if(req.route.path === "/:idForum"){
                connection.execute(
                    "SELECT status FROM users WHERE id= ? LIMIT 1 ;",
                    [userId],
                    function(err, result){
                        //si l'utilisateur est un modo
                        if(result[0].status == 1){
                            next();
                        }
                        //si l'utilisateur n'est pas un modo
                        else{
                            return res.status(403).json({error: "Action non autorisé."});
                        }
                })
            }//si un sujet est supprimé
            if(req.route.path === "/:idForum/:idSujet"){
                connection.execute(
                    "SELECT status FROM users WHERE id= ? LIMIT 1 ;",
                    [userId],
                    function(err, result){
                        //si l'utilisateur est un modo
                        if(result[0].status == 1){
                            next()
                        }
                        //si l'utilisateur n'est pas modo
                        else if(result[0].status == 0){
                            connection.execute(
                                "SELECT id_user FROM list_sujet WHERE id= ? ;",
                                [req.params.idSujet],
                                function(err, result){
                                    //si l'utilisateur est l'auteur du sujet
                                    if(result[0].id_user == userId){
                                        next()
                                    }
                                    //si l'utilisateur n'est pas l'auteur du sujet
                                    else if(result[0].id_user != userId){
                                        return res.status(403).json({error: "Action non autorisé."})
                                    }
                                    else{
                                        return res.status(500).json({error: "Commande invalide."})
                                    }
                            })
                        }
                })
            }
            //si un message est supprimé
            if(req.route.path === "/:idForum/:idSujet/:idMsg"){
                connection.execute(
                    "SELECT status FROM users WHERE id= ? LIMIT 1 ;",
                    [userId],
                    function(err, result){
                        //si l'utilisateur est un modo
                        if(result[0].status == 1){
                            next();
                        }
                        //si l'utilisateur n'est pas modo
                        else if(result[0].status == 0){
                            connection.execute(
                                "SELECT id_user FROM list_msg WHERE id= ? ;",
                                [req.params.idMsg],
                                function(err, result){
                                    //si l'utilisateur est l'auteur du message
                                    if(result[0].id_user == userId){
                                        next();
                                    }
                                    //si l'utilisateur n'est pas l'auteur du message
                                    else if(result[0].id_user != userId){
                                        return res.status(403).json({error: "Action non autorisé."});
                                    }
                                    else{
                                        return res.status(500).json({error: "Commande invalide."});
                                    }
                            })
                        }
                })
            }
        } 
        else{
            return res.status(500).json({error: "Commande invalide."});
        }
    } catch(error) {
        return res.status(401).json({error: 'Requête non authentifiée !'});
    }
};