var socket = io.connect('http://localhost:8080'); /*connection au serveur*/

/**********************************************************************************************************************************************************************
*********************************************************** formulaire d'inscription **********************************************************************************
**********************************************************************************************************************************************************************/

$('#pseudoInscription').focus();

// Contrôle du courriel en fin de saisie méthode avec expression régulière
$("#mailInscription").bind("blur", function (e) {
    // Correspond à une chaîne de la forme xxx@yyy.zzz
    var regexCourriel = /.+@.+\..+/;
    var validiteCourriel = "";
    if (!regexCourriel.test(e.target.value)) {
        validiteCourriel = "Adresse invalide";
    }
    $("#aide").css({ color: "red"});
    $("#aide").text(validiteCourriel);
});

// Vérification de la longueur du mot de passe saisi pendant la saisie
$("#passwordInscription").bind("input", function (e) {
    var mdp = e.target.value; // Valeur saisie dans le champ mdp
    var longueurMdp = "faible";
    var couleurMsg = "red"; // Longueur faible => couleur rouge
    if (mdp.length >= 8) {
        longueurMdp = "suffisante";
        couleurMsg = "green"; // Longueur suffisante => couleur verte
    } else if (mdp.length >= 4) {
        longueurMdp = "moyenne";
        couleurMsg = "orange"; // Longueur moyenne => couleur orange
    }
    var aideMdpElt = $("#aide");
    aideMdpElt.text("Longueur : " + longueurMdp); // Texte de l'aide
    aideMdpElt.css({ color: couleurMsg}); // Couleur du texte de l'aide
});

//verification des mots de passes
$("#confirmPasswordInscription").bind("blur",function(e){
    if($('#passwordInscription').val() != $('#confirmPasswordInscription').val()){
        $("#aide").css({ color: "red"});
        $("#aide").text("Les mots de passes sont différents");
    }
});

/*envoie un message au server par clic du bouton*/
$('#inscriptionValid').click(function () {
    $.post('/', { email: $('#mailInscription').val(), password: $('#passwordInscription').val(), password2: $('#confirmPasswordInscription').val(),pseudo: $('#pseudoInscription').val()}, function(data) {
        if(data.message === 'email est déjà utilisé'){
            $("#aide").css({ color: "red"});
            $("#aide").text("l'email est déja utilisé");
        }
        else if(data.message === 'Utilisateur créé !'){/*si utilisateur bien créé renvoie à la page de connexion*/
            document.location="http://localhost:8080/";
        }
    }, 'json');/*fin de post*/
    return false; /*pour bloquer le formulaire*/              
})/*fin de clic inscription*/

/**********************************************************************************************************************************************************************
*********************************************************** formulaire de login ***************************************************************************************
**********************************************************************************************************************************************************************/

/*redirige vers formulaires inscriptions*/
$('#inscription').click(function () {
    document.location="http://localhost:8080/inscr";          
})/*fin de clic inscription*/

/*gestion de la connexion*/
$('#connexionValid').click(function () {
    $.post('/login', { email: $('#mail').val(), password: $('#password').val()}, function(data) {
        if(data.message === 'Utilisateur connecté !'){/*si utilisateur autorisé à se connecter renvoie à la page de chat et crée un cookie pseudo*/
            document.cookie = "pseudo=" + data.pseudo;
            document.location="http://localhost:8080/chat";
        }
        else
        {
            $("#erreur").css({ color: "red"});
            $("#erreur").text(data.message);
        }
    }, 'json');/*fin de post*/
    return false; /*pour bloquer le formulaire*/               
})/*fin de clic connexion*/