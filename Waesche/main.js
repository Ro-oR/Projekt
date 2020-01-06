const User = require("./user.js");
const functions = require("./functions.js");

let u1 = new User("Test1", "test1@test");

let u2 = new User("Test2", "test2@test");
// var u3 = new User("Test3", "test3@test");

// console.log(u1.username + " " + u1.userID)
// console.log(u2.username + " " + u2.userID)
// u3.addRegionalTicket("NRW")
// u3.addTicket("Köln - Berlin")

u1.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200106,"09")); //Bei Fehlern heutiges Datum nutzen!
u2.addSuche(functions.fahrplanAbfrage("dieringhausen", "köln hbf",200106,"09"));

//functions.alteDatenLoschen();