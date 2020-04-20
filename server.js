var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./views/index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io (npm install socket.io)
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('petit_nouveau', function(pseudo) {
        socket.pseudo = pseudo;
        socket.messages = socket.messages + '\n' + socket.pseudo + ' est connecté !';
        console.log(socket.messages);
        socket.emit('message', socket.messages);
        socket.broadcast.emit('message', socket.messages);
    });

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log(message);
        socket.emit('message', message);
        socket.broadcast.emit('message', message);
    });

});/*fin de io.sockets*/


server.listen(8080);