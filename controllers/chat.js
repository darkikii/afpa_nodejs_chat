const bcrypt = require('bcrypt');/*cryptage (npm install --save bcrypt)*/
var ent = require('ent');
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
  /*verification des données reçu*/
  var pseudo = ent.encode(req.body.pseudo);
  var email = ent.encode(req.body.email);
  var password = ent.encode(req.body.password);
  var password2 = ent.encode(req.body.password2);

  if(password != password2){
    res.status(400).json({ message: 'les mots de passes sont différents' });
  }
  else {
    bcrypt.hash(password, 10)
        .then(hash => {
          const user = new User({
            pseudo: pseudo,
            email: email,
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
  /*verification des données reçu*/
  var email = ent.encode(req.body.email);
  var password = ent.encode(req.body.password);

  User.findOne({ email: email })/*lecture bdd*/
    .then(user => {
      if (!user) {/*si on trouve pas de user*/
        return res.status(201).json({ message: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(201).json({ message: 'Mot de passe incorrect !' });
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