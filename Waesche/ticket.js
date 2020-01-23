const fs = require("fs");

function ticketCount(){
    let count = JSON.parse(fs.readFileSync('./ticketCount.json', 'utf8', (err) => {
            if (err) {
                console.log("Lesefehler", err);
            }
        })
    );
    count.TicketCount++;

    fs.writeFileSync('./ticketCount.json', JSON.stringify(count), err => {
        if (err) { console.log("Schreibfehler", err) }
    });

    return count.TicketCount
}

class Ticket{
    constructor(ownerID, bereich){
        this.owner = ownerID;
        this.bereich = bereich;
        this.ticketID = ticketCount()
    }
}

class RegionalTicket extends Ticket{
    constructor(){
        super()
    }
}

module.exports = Ticket, RegionalTicket;