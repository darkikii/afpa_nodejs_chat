const http = require('http'); /*appel de http*/
const app = require('./app'); /*appel de notre appli*/
var ent = require('ent');/*permet de retirer le code html des form*/
require('./js/function');

/*renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne */
const normalizePort = val => {
  const port = parseInt(val, 10);/*renvoie un entier en base 10*/

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/*recherche les différentes erreurs et les gère de manière appropriée*/
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/*cré un serveur qui execute la fonction a chaque appel*/
const server = http.createServer(app);
var io = require('socket.io').listen(server);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/*server io*/
io.sockets.on('connection', function (socket) {

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        socket.pseudo = ent.encode(pseudo);
        socket.emit('message', { pseudo: 'ADMINISTRATEUR', message: 'Vous êtes bien connecté', date: 'NULL' });
        socket.broadcast.emit('message', { pseudo: socket.pseudo, message: 'vient de se connecter', date: 'NULL' });
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        var time = dateFr();
        message = ent.encode(message);
        socket.emit('message', { pseudo: socket.pseudo, message: message, date: time });
        socket.broadcast.emit('message', { pseudo: socket.pseudo, message: message, date: time });
    }); 
});

/*ecoute le serveur*/
server.listen(process.env.PORT || 8080);/*port par defaut ou 8080*/