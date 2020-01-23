const functions = require("./functions.js");
const Ticket = require("./ticket.js");
const RegionalTicket = require("./ticket.js");
const fs = require("fs");

function userCount(){
    let count = JSON.parse(fs.readFileSync('./userCount.json', 'utf8', (err) => {
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
    let angebote = JSON.parse(fs.readFileSync('./angebote.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err);

            }
        })
    );
    return angebote
}

function suchenListe(){
    let suchen = JSON.parse(fs.readFileSync('./suchen.json', 'utf8', (err) => {
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
        this.suchen = [];
    }
    addTicket(bereich){
        let t = new Ticket(this.userID, bereich);
        this.tickets.push(t.ticketID);
        console.log(t.owner + " " + this.tickets)
    }
    addRegionalTicket(bereich){
        let t = new RegionalTicket(this.userID, bereich);
        this.tickets.push(t.ticketID);
        console.log(t.owner + " " + this.tickets)
    }
    writeUserData(){
        let users = functions.readUserData();
        for(let i = 0; i < users.length; i++){
            if (users[i] !== null) {
                if (users[i].userID === this.userID) users[i] = this
            }
        }
        fs.writeFileSync('./userData.json', JSON.stringify(users, null, 4), err => {
            if (err) { console.log("Schreibfehler", err) }
        });
    }
    addAngebot(fahrtstrecke){
        try {
            if (fahrtstrecke.includes("Fehler")) return fahrtstrecke;
            let returnString = "";
            this.angebote.push(fahrtstrecke);

            this.writeUserData()

            let neuesAngebot = {
                anbieter: this.userID,
                strecke: fahrtstrecke[0],
                datum: fahrtstrecke[1]
            };
            let alleAngebote = angebotListe();
            alleAngebote.push(neuesAngebot);
            fs.writeFileSync('./angebote.json', JSON.stringify(alleAngebote, null, 4), err => {
                if (err) {
                    console.log("Schreibfehler", err)
                }
            });
            let suchen = functions.checkSuchen(fahrtstrecke);
            if (suchen !== 0) returnString = "Mitfahrer gefunden! UserID " + suchen
            else returnString = "Angebot erfolgreich eingefügt"
            return returnString
        }
        catch (e) {
            console.log(e)
            return "Fehler 500"
        }
    }
    addSuche(fahrtstrecke){
        try{
            if(fahrtstrecke.includes("Fehler")) return fahrtstrecke;
            let anbieter = functions.checkAngebote(fahrtstrecke);
            let returnString = "";
            if(anbieter !== 0) returnString = "Anbieter gefunden! UserID " + anbieter;
            else {
                returnString = "Kein Anbieter gefunden.\nAnfrage wird den gesuchen hinzugefügt";
                this.suchen.push(fahrtstrecke);
                let neueSuche = {
                    suchender : this.userID,
                    strecke : fahrtstrecke[0],
                    datum : fahrtstrecke[1]
                };
                let alleSuchen = suchenListe();
                alleSuchen.push(neueSuche);
                fs.writeFileSync('./suchen.json', JSON.stringify(alleSuchen, null, 4), err => {
                    if (err) { console.log("Schreibfehler", err) }
                });

                this.printUser();

                this.writeUserData()
            }
            return returnString
        }
        catch (e) {
            console.log(e)
            return "Fehler 500"
        }
    }
    printUser(){//TODO Rausnehmen!
        console.log("\nTest");
        console.log(this.userID);
        console.log(this.username);
        console.log(this.contact);
        console.log(this.tickets);
        console.log(this.angebote);
        console.log(this.suchen + "\n");
    }
}
//
module.exports = User;