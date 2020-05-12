const bcrypt = require('bcrypt');/*cryptage (npm install --save bcrypt)*/
const User = require('../models/User');

var path = require('path');

// Chargement de la page index.html
exports.index = (req, res, next) => {
  res.sendFile(path.resolve('views/index.html'));
};

// Chargement de la page chat.html
exports.chat = (req, res, next) => {
  res.sendFile(path.resolve('views/chat.html'));
};

exports.vueInscr = (req, res, next) => {
  res.sendFile(path.resolve('views/inscription.html'));
};


/*inscription utilisateur*/
exports.inscr = (req, res, next) => {
  if(req.body.password != req.body.password2){
    res.status(400).json({ message: 'les mots de passes sont différents' });
  }
  else {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash
          });/*fin de creation user*/
          user.save()
            .then(() => res.status(200).json({ message: 'Utilisateur créé !' }))
            .catch(() => res.status(201).json({ message: 'email est déjà utilisé' }));/*si on met status 400 ne fonctionne pas*/
        })/*fin de then hash*/
        .catch(error => res.status(500).json({ error }));
  }/*fin de if else*/
};

/*connection utilisateur*//*token ne fonctionne pas*/
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })/*lecture bdd*/
    .then(user => {
      if (!user) {/*si on trouve pas de user*/
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ message: 'Utilisateur connecté !', pseudo: user.pseudo })
          /*res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });*/
        })/*fin then*/
        .catch(error => res.status(500).json({ error }));/*erreur de connexion bdd*/
    })
    .catch(error => res.status(500).json({ error }));/*erreur de connexion bdd*/
};