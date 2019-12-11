const functions = require("./functions.js")
const Ticket = require("./ticket.js");
const RegionalTicket = require("./ticket.js");
const fs = require("fs");

function userCount(){
    var count = JSON.parse(fs.readFileSync('./userCount.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err)
                return
            }
        })
    )
    count.UserCount++

    fs.writeFileSync('./userCount.json', JSON.stringify(count), err => {
        if (err) { console.log("Schreibfehler", err) }
    })

    return count.UserCount
}

function angebotListe(){
    var angebote = JSON.parse(fs.readFileSync('./angebote.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err)
                return
            }
        })
    )
    return angebote
}

function suchenListe(){
    var suchen = JSON.parse(fs.readFileSync('./suchen.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err)
                return
            }
        })
    )
    return suchen
}

class User{
    constructor(username, contact){
        this.userID = userCount()
        this.username = username
        this.contact = contact //Handynummer/Email
        this.tickets = new Array
        this.angebote = new Array
        this.suchen = new Array
    }
    addTicket(bereich){
        var t = new Ticket(this.userID, bereich)
        this.tickets.push(t.ticketID)
        console.log(t.owner + " " + this.tickets)
    }
    addRegionalTicket(bereich){
        var t = new RegionalTicket(this.userID, bereich)
        this.tickets.push(t.ticketID)
        console.log(t.owner + " " + this.tickets)
    }
    addAngebot(fahrtstrecke){
        this.angebote.push(fahrtstrecke)
        var neuesAngebot = {
            anbieter : this.userID,
            strecke : fahrtstrecke
        }
        var alleAngebote = angebotListe()
        alleAngebote.push(neuesAngebot)
        fs.writeFileSync('./angebote.json', JSON.stringify(alleAngebote, null, 4), err => {
            if (err) { console.log("Schreibfehler", err) }
        })
    }
    addSuche(fahrtstrecke){
        this.suchen.push(fahrtstrecke)
        var neueSuche = {
            suchender : this.userID,
            strecke : fahrtstrecke
        }
        var alleSuchen = suchenListe()
        alleSuchen.push(neueSuche)
        fs.writeFileSync('./suchen.json', JSON.stringify(alleSuchen, null, 4), err => {
            if (err) { console.log("Schreibfehler", err) }
        })
    }
}

module.exports = User;