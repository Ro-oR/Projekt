const User = require("./user.js");
const functions = require("./functions.js")
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//Installieren via "npm i xmlhttprequest"

var apitoken = "3d67bf9773fba69970a84b25e1ae9b3d"
var u1 = new User("Test1", "test1@test");
var u2 = new User("Test2", "test2@test");
var u3 = new User("Test3", "test3@test");

console.log(u1.username + " " + u1.userID)
console.log(u2.username + " " + u2.userID)
u3.addRegionalTicket("NRW")
u3.addTicket("Köln - Berlin")

console.log(functions.bahnhofIDSuche("gummersbach"))
console.log(functions.bahnhofIDSuche("köln hbf"))
console.log(functions.fahrplanAbfrage("8002462","191209","08"))