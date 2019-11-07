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

class User{
    constructor(username, contact){
        this.userID = userCount()
        this.username = username
        this.contact = contact //Handynummer/Email
        this.tickets = new Array
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
}

module.exports = User;