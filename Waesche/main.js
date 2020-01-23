const User = require("./user.js");
const functions = require("./functions.js");

let u1 = new User("Test1", "test1@test");

let u2 = new User("Test2", "test2@test");
// var u3 = new User("Test3", "test3@test");

// console.log(u1.username + " " + u1.userID)
// console.log(u2.username + " " + u2.userID)
// u3.addRegionalTicket("NRW")
// u3.addTicket("Köln - Berlin")

//functions.alteDatenLoschen();

//let userData = functions.readUserData();
//functions.addUserData(u1);



u1.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200123,"16"));
u2.addSuche(functions.fahrplanAbfrage("dieringhausen", "köln hbf",200123,"16"));

functions.newUser("TestUser", "asdasd")//addUserData(u1);
let u3 = new User("", "");
u3 = functions.getUserByID(414);
console.log(u2);
console.log(u3);

u3.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200123,"16"));

u3.printUser();

//let test = [];
//test.push(u1);
//test.push(u2);
//console.log(test);



//u3.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200121,"16"));

//functions.alteDatenLoschen();