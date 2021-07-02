const jwt = require('jsonwebtoken');

//middelware pour authentifier l'utilisateur
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '487b05ac-0e11-4720-a02b-c36806ea094c');
        const userId = decodedToken.id;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
          } else {
            next();
        }
    } catch(error) {
        res.status(401).json({ error: error | 'requête non authentifiée !'});
    }
};