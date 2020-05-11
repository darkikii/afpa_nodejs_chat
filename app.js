const bodyParser = require('body-parser');/*pour extraire le json du formulaire envoyé (npm install --save body-parser)*/

/*a verifier utiliter*/
const jwt = require('jsonwebtoken');/*pour les token sert à identifier les user(npm install --save jsonwebtoken)*/

var app = require('express')();

app.use(bodyParser.json());

const chatRoutes = require('./routers/chat');

require('./db/db');
const Product = require('./models/User');/*notre class */

/*pour le CORES*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');/*donne l'acces a tout le monde (*)*/
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/', chatRoutes);

module.exports = app; /*exporte notre appli*/