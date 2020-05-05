dateFr = function ()
{
     var date = new Date();

     var jour = date.getDate();
     if(jour<10) { jour = "0" + jour };
     var mois = date.getDate();
     if(mois<10) { mois = "0" + mois };
     var heure = date.getHours();
     if(heure<10) { heure = "0" + heure };
     var minutes = date.getMinutes();
     if(minutes<10) { minutes = "0" + minutes };

     return jour + "/" + mois + "/" + date.getFullYear() + " à " + heure + "h" + minutes;
}

module.exports = dateFr;