const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"oblivion",
    database:"groupomania",
})

  module.exports = connection;