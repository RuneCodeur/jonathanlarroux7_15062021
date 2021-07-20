const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const xss = require('xss-clean')
const helmet = require('helmet');
const connection = require('./connect');
const rateLimit = require("express-rate-limit");

const forumRoutes = require('./routes/forum');
const messagesRoutes = require('./routes/message');
const userRoutes = require('./routes/user');

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100
});

//connection
connection.query("select CURTIME();",
function(err, result) {
  if(result){
  console.log('- - - il est '+result[0]['CURTIME()']+ ', et vous êtes connecté à la base de données MySQL ! - - -');
  }
  if(err){
  console.log('Impossible de se connecter, erreur suivante : ', err);
  }
});

//headers
const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(bodyParser.json());
app.use(helmet());
app.use(limiter);
app.use(xss());

app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/forum', forumRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;