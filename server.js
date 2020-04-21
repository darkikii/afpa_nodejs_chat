var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);// Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile('./views/index.html');
});

io.sockets.on('connection', function (socket) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        socket.pseudo = pseudo;
        socket.emit('message', 'vous êtes bien connecté.');
        socket.broadcast.emit('message', pseudo + ' vient de se connecter.');
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        socket.emit('message', socket.pseudo +': ' + message);
        socket.broadcast.emit('message', socket.pseudo +': ' + message);
    }); 
});

server.listen(8080);