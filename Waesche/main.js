const User = require("./user.js");
const functions = require("./functions.js");
const express = require("express");
const api = express();

api.listen(3000, () => {
    console.log("API läuft!\n" + functions.Datum());
});

api.get("/", (req, res) => {//TODO Raus!
    res.send("Fuck off :D");
});

api.get("/test/:id", (req, res) => {//TODO
    console.log(req.params);
    res.send(functions.getUserByID(req.params.id));
});

api.get("/angebote", (req, res) =>{

});

api.get("/suchen", (req, res) =>{

});

api.post("/createUser/:username/:contact", (req, res) =>{
    res.send(functions.newUser(req.params.username, req.params.contact))
});

api.post("/angebot/:id/:start/:ziel/:datum/:std", (req, res) =>{
    let id = parseInt(req.params.id);
    let start = req.params.start;
    let ziel = req.params.ziel;
    let datum = req.params.datum;
    let stunde = req.params.std;
    let u = functions.getUserByID(id);
    let antwort = u.addAngebot(functions.fahrplanAbfrage(start, ziel, datum, stunde));
    res.send(antwort);
});

api.post("/suche/:id/:start/:ziel/:datum/:std", (req, res) =>{
    let id = parseInt(req.params.id);
    let start = req.params.start;
    let ziel = req.params.ziel;
    let datum = req.params.datum;
    let stunde = req.params.std;
    let u = functions.getUserByID(id);
    let antwort = u.addAngebot(functions.fahrplanAbfrage(start, ziel, datum, stunde));
    res.send(antwort);
});

api.post("/test2", (req, res) =>{//TODO
    console.log("post :D")
    res.send("Geht")
});

/*
let u1 = new User("Test1", "test1@test");

let u2 = new User("Test2", "test2@test");*/
// var u3 = new User("Test3", "test3@test");

// console.log(u1.username + " " + u1.userID)
// console.log(u2.username + " " + u2.userID)
// u3.addRegionalTicket("NRW")
// u3.addTicket("Köln - Berlin")

//functions.alteDatenLoschen();

//let userData = functions.readUserData();
//functions.addUserData(u1);

/*

u1.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200123,"16"));
u2.addSuche(functions.fahrplanAbfrage("dieringhausen", "köln hbf",200123,"16"));

functions.newUser("TestUser", "asdasd")//addUserData(u1);
let u3 = new User("", "");
u3 = functions.getUserByID(414);
console.log(u2);
console.log(u3);

u3.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200123,"16"));

u3.printUser();

 */

//let test = [];
//test.push(u1);
//test.push(u2);
//console.log(test);



//u3.addAngebot(functions.fahrplanAbfrage("gummersbach", "köln hbf",200121,"16"));

//functions.alteDatenLoschen();