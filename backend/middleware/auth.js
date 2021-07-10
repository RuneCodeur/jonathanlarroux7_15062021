const jwt = require('jsonwebtoken');
const connection = require('../connect');

exports.getAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '487b05ac-0e11-4720-a02b-c36806ea094c');
        const userId = decodedToken.id;
        if (req.body.id && req.body.id !== userId) {
            return res.status(500).json({ error: 'identifiant non valide'})
          } else {
            next();
        }
    } catch {
        return res.status(401).json({ error: 'requête non authentifiée !'});
    }
};

exports.sensibleAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '487b05ac-0e11-4720-a02b-c36806ea094c');
        const userId = decodedToken.id;
        if (req.body.id !== userId) {
            return res.status(500).json({ error: 'identifiant non valide'})
        }
        //modification ou ajout d'un canal
        else if(req.route.path === '/modifyCanal' || req.route.path === '/createCanal'){
            connection.execute('SELECT status FROM users WHERE id= ? LIMIT 1;',
                [userId],
                function (err, result){
                    //si l'utilisateur est un moderateur
                    if (result[0].status === 1){
                        next()
                    }
                    //si l'utilisateur n'est pas moderateur
                    else{
                        return res.status(403).json({ error: 'action non autorisé'})
                    }
            })
        }
        //si je modifie un sujet
        else if(req.route.path === '/:idCanal/modifySujet'){
            connection.execute('SELECT status FROM users WHERE id= ? LIMIT 1;',
                [userId],
                function (err, result){
                    //si l'utilisateur est un modo
                    if (result[0].status === 1){
                        next()
                    }
                    //si l'utilisateur n'est pas modo
                    else if(result[0].status === 0) {
                        connection.execute('SELECT id_user FROM list_sujet WHERE id= ?;',
                        [req.body.sujetId],
                        function(err, result){
                            //si l'utilisateur est l'auteur du sujet
                            if (result[0].id_user === userId){
                                next()
                            }
                            //si l'utilisateur n'est pas l'auteur du sujet
                            else if (result[0].id_user !== userId){
                                return res.status(403).json({error: "action non autorisé"})
                            }
                            else{
                                return res.status(500).json({error: "commande invalide"})
                            }
                        })
                    }
            })
        }
        //si je modifie un message
        else if(req.route.path === '/:idCanal/:idSujet/:idMsg'){
            connection.execute('SELECT status FROM users WHERE id= ? LIMIT 1;',
                [userId],
                function (err, result){
                    //si l'utilisateur est un modo
                    if (result[0].status === 1){
                        next()
                    }
                    //si l'utilisateur n'est pas modo
                    else if(result[0].status === 0) {
                        connection.execute('SELECT id_user FROM list_msg WHERE id= ?;',
                        [req.body.idMsg],
                        function(err, result){
                            //si l'utilisateur est l'auteur du sujet
                            if (result[0].id_user === userId){
                                next()
                            }
                            //si l'utilisateur n'est pas l'auteur du sujet
                            else if (result[0].id_user !== userId){
                                return res.status(403).json({error: "action non autorisé"})
                            }
                            else{
                                return res.status(500).json({error: "commande invalide"})
                            }
                        })
                    }
            })
        }
        else {
            return res.status(500).json({error: "commande invalide"})
        }
    } catch {
        return res.status(401).json({ error: 'requête non authentifiée !'});
    }
};

exports.deleteAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '487b05ac-0e11-4720-a02b-c36806ea094c');
        const userId = decodedToken.id;
        if (userId) {
            //si un canal est supprimé
            if(req.route.path === '/:idCanal'){
                connection.execute('SELECT status FROM users WHERE id= ? LIMIT 1;',
                    [userId],
                    function (err, result){
                        //si l'utilisateur est un modo
                        if (result[0].status === 1){
                            next()
                        }
                        //si l'utilisateur n'est pas un modo
                        else{
                            return res.status(403).json({ error: 'action non autorisé'})
                        }
                })
            }//si un sujet est supprimé
            if(req.route.path === '/:idCanal/:idSujet'){
                connection.execute('SELECT status FROM users WHERE id= ? LIMIT 1;',
                    [userId],
                    function (err, result){
                        //si l'utilisateur est un modo
                        if (result[0].status === 1){
                            next()
                        }
                        //si l'utilisateur n'est pas modo
                        else if(result[0].status === 0) {
                            connection.execute('SELECT id_user FROM list_sujet WHERE id= ?;',
                            [req.params.idSujet],
                            function(err, result){
                                //si l'utilisateur est l'auteur du sujet
                                if (result[0].id_user === userId){
                                    next()
                                }
                                //si l'utilisateur n'est pas l'auteur du sujet
                                else if (result[0].id_user !== userId){
                                    return res.status(403).json({error: "action non autorisé"})
                                }
                                else{
                                    return res.status(500).json({error: "commande invalide"})
                                }
                            })
                        }
                })
            }
            //si un message est supprimé
            if (req.route.path === '/:idCanal/:idSujet/:idMsg'){
                connection.execute('SELECT status FROM users WHERE id= ? LIMIT 1;',
                [userId],
                function (err, result){
                    //si l'utilisateur est un modo
                    if (result[0].status === 1){
                        next()
                    }
                    //si l'utilisateur n'est pas modo
                    else if(result[0].status === 0) {
                        connection.execute('SELECT id_user FROM list_msg WHERE id= ?;',
                        [req.params.idMsg],
                        function(err, result){
                            //si l'utilisateur est l'auteur du message
                            if (result[0].id_user === userId){
                                next()
                            }
                            //si l'utilisateur n'est pas l'auteur du message
                            else if (result[0].id_user !== userId){
                                return res.status(403).json({error: "action non autorisé"})
                            }
                            else{
                                return res.status(500).json({error: "commande invalide"})
                            }
                        })
                    }
            })
            }
        } 
        else {
            return res.status(500).json({error: "commande invalide"})
        }
    } catch(error) {
        return res.status(401).json({ error: 'requête non authentifiée !'});
    }
};