const Ticket = require("./ticket.js");

function userCount(){
    var users = 0
    return users
}

var users = 0

class User{
    constructor(/*ID,*/ username, contact){
        this.userID = users++//ID
        this.username = username
        this.contact = contact //Handynummer/Email
        this.tickets = new Array
    }
    addTicket(){
        var t = new Ticket(this.userID)
        this.tickets.push(t)
    }
    print(){
        console.log("Hallo " + this.userID + " " + this.tickets[0].uID)//this.tickets[0].u.username)
    }
}

module.exports = User;