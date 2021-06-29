const sequelize = require('sequelize');

const connect = new sequelize("groupomania", "root", "oblivion",{
    dialect: "mysql",
    host:"localhost"
})

  module.exports = connect;