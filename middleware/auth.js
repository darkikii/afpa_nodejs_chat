const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async(req, res, next) => {
    /*verifie si plusieurs cookie*/
    if(req.headers.cookie.indexOf(';') < 0){
        return res.status(400).json({ message: 'Vous n\'avez pas accès à cet page' });
    }
    else{/*cherche le cookie pseudo*/
        var allcookies = req.headers.cookie;
       
        // met tout les cookies dans un tableau
        cookiearray = allcookies.split(';');
       
        // verifie chaque cookie
        for(var i=0; i<cookiearray.length; i++) {
            name = cookiearray[i].split('=')[0];
            if(name === "pseudo"){
                pseudo = cookiearray[i].split('=')[1];
            }/*fin de if name*/
        }/*fin de for*/
    }/*fin de if else*/
    
    next();
}
module.exports = auth;