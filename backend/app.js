const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const connect = require('./connect');

const messagesRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const canalRoutes = require('./routes/canal');

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100
});

//connection
try {
  connect.authenticate();
  console.log('- - - Connecté à la base de données MySQL! - - -');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

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

app.use('/images', express.static(path.join(__dirname, 'images')));

//routes principale
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/canal', canalRoutes);

module.exports = app;