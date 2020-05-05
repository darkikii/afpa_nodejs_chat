/*const jwt = require('jsonwebtoken');*//*pour les token sert à identifier les user(npm install --save jsonwebtoken)*/

/*const User = require('../models/User');*/
var path = require('path');
// Chargement de la page index.html
exports.index = (req, res, next) => {
  res.sendFile(path.resolve('views/index.html'));
};

exports.chat = (req, res, next) => {
  res.sendFile(path.resolve('views/chat.html'));
};

exports.inscr = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};