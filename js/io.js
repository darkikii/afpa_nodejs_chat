var socket = io.connect('http://localhost:8080'); /*connection au serveur*/
            
/*lecture des cookies*/
var allcookies = document.cookie;

// met tout les cookies dans un tableau
cookiearray = allcookies.split(';');

// verifie chaque cookie
for(var i=0; i<cookiearray.length; i++) {
    name = cookiearray[i].split('=')[0];
    if(name === "pseudo"){
      pseudo = cookiearray[i].split('=')[1];
    }/*fin de if name*/
}/*fin de for*/

/*envoie du cookie pseudo au server*/
var test = 0;/*pour envoyer une seule fois au server*/
if(pseudo != '' && test == 0){
    // Et on l'envoie avec le signal "nouveau_client" 
    socket.emit('nouveau_client', pseudo);
    test++;
}           

/*envoie un message au server par clic du bouton*/
$('#messageValid').click(function () {
    socket.emit('message', messageNew.value);
    $('#messageNew').val(' ').focus();/*vide le champ + focus*/
    return false;/*pour bloquer l'envoie du formulaire */
})

/*on ecoute les messages de type message*/
socket.on('message', function(data) {
    if(data.date === 'NULL'){
        $('.chat').prepend('<p>' + '<strong>' + data.pseudo + '</strong>: ' + data.message + '</p>');
    }
    else $('.chat').prepend('<p><em>' + data.date + ' </em><strong>' + data.pseudo + '</strong>: ' + data.message + '</p>');              
})