const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"superman",
    password:"crypto",
    database:"groupomania",
});

module.exports = connection;