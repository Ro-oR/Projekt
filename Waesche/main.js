const User = require("./user.js");
const functions = require("./functions.js")

var u1 = new User("Test1", "test1@test");

var u2 = new User("Test2", "test2@test");
// var u3 = new User("Test3", "test3@test");

// console.log(u1.username + " " + u1.userID)
// console.log(u2.username + " " + u2.userID)
// u3.addRegionalTicket("NRW")
// u3.addTicket("Köln - Berlin")

console.log(functions.Datum())

//console.log(functions.bahnhofIDSuche("gummersbach"))
//console.log(functions.bahnhofIDSuche("köln hbf"))

u1.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf","191212","09"))
u2.addSuche(functions.fahrplanAbfrage("gummersbach", "köln hbf","191212","09"))