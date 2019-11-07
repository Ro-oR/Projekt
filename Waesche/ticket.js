const fs = require("fs");

function ticketCount(){
    var count = JSON.parse(fs.readFileSync('./ticketCount.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err)
                return
            }
        })
    )
    count.TicketCount++

    fs.writeFileSync('./ticketCount.json', JSON.stringify(count), err => {
        if (err) { console.log("Schreibfehler", err) }
    })

    return count.TicketCount
}

class Ticket{
    constructor(uID, bereich){
        this.ticketID = ticketCount()
        this.owner = uID
        this.bereich = bereich
    }
    changeUser(newID){
        owner = newID
    }
}

class RegionalTicket extends Ticket{
    constructor(){
        super()
    }
}

module.exports = Ticket, RegionalTicket;