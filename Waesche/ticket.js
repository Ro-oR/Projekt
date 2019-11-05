
var tickets = 0

class Ticket{
    constructor(uID){
        this.owner = uID
        this.ticketID = tickets++
        this.ticketType = ""
        this.test = "o/"
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