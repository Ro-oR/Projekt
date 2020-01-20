const functions = require("./functions.js");
const Ticket = require("./ticket.js");
const RegionalTicket = require("./ticket.js");
const fs = require("fs");

function userCount(){
    var count = JSON.parse(fs.readFileSync('./userCount.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err);

            }
        })
    );
    count.UserCount++;

    fs.writeFileSync('./userCount.json', JSON.stringify(count), err => {
        if (err) { console.log("Schreibfehler", err) }
    });

    return count.UserCount
}

function angebotListe(){
    var angebote = JSON.parse(fs.readFileSync('./angebote.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err);

            }
        })
    );
    return angebote
}

function suchenListe(){
    var suchen = JSON.parse(fs.readFileSync('./suchen.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err);

            }
        })
    );
    return suchen
}

class User{
    constructor(username, contact){
        this.userID = userCount();
        this.username = username;
        this.contact = contact; //Handynummer/Email
        this.tickets = [];
        this.angebote = [];
        this.suchen = []
    }
    addTicket(bereich){
        var t = new Ticket(this.userID, bereich);
        this.tickets.push(t.ticketID);
        console.log(t.owner + " " + this.tickets)
    }
    addRegionalTicket(bereich){
        var t = new RegionalTicket(this.userID, bereich);
        this.tickets.push(t.ticketID);
        console.log(t.owner + " " + this.tickets)
    }
    addAngebot(fahrtstrecke){
        if(fahrtstrecke === "Fehler") return;
        this.angebote.push(fahrtstrecke);
        var neuesAngebot = {
            anbieter : this.userID,
            strecke : fahrtstrecke[0],
            datum : fahrtstrecke[1]
        };
        var alleAngebote = angebotListe();
        alleAngebote.push(neuesAngebot);
        fs.writeFileSync('./angebote.json', JSON.stringify(alleAngebote, null, 4), err => {
            if (err) { console.log("Schreibfehler", err) }
        });
        var suchen = functions.checkSuchen(fahrtstrecke);
        if(suchen !== 0) console.log("Mitfahrer gefunden! UserID " + suchen)
    }
    addSuche(fahrtstrecke){
        if(fahrtstrecke === "Fehler") return;
        var anbieter = functions.checkAngebote(fahrtstrecke);
        if(anbieter !== 0) console.log("Anbieter gefunden! UserID " + anbieter);
        else {
            console.log("Kein Anbieter gefunden.\nAnfrage wird den gesuchen hinzugefügt");
            this.suchen.push(fahrtstrecke);
            var neueSuche = {
                suchender : this.userID,
                strecke : fahrtstrecke[0],
                datum : fahrtstrecke[1]
            };
            var alleSuchen = suchenListe();
            alleSuchen.push(neueSuche);
            fs.writeFileSync('./suchen.json', JSON.stringify(alleSuchen, null, 4), err => {
                if (err) { console.log("Schreibfehler", err) }
            })
        }
    }
}
//
module.exports = User;