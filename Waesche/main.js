const functions = require("./functions.js");
const express = require("express");
const api = express();

api.listen(3000, () => {
    console.log("API erfolgreich gestartet!\n" + functions.Datum());
});


api.get("/", (req,res) => {
    res.send("Server is running!")
});

api.get("/angebote/:id", (req, res) =>{
    let id = parseInt(req.params.id);
    let u = functions.getUserByID(id);
    if (u === "User nicht gefunden") res.send(u);
    let ergebnis = functions.checkSuchen(u.angebote[u.angebote.length - 1][0], u.angebote[u.angebote.length - 1][1]);
    if (ergebnis === "Fehler 500") res.send("500 Serverfehler");
    if(ergebnis !== 0) {
        let partner = functions.getUserByID(ergebnis);
        res.send("Partner gefunden! \nID:" + partner.userID + "\nName: " + partner.username + "\nKontaktdaten: " + partner.contact)
    }
    else res.send("Kein Partner gefunden")
});

api.get("/suchen/:id", (req, res) =>{
    let id = parseInt(req.params.id);
    let u = functions.getUserByID(id);
    if (u === "User nicht gefunden") res.send(u);
    let ergebnis = functions.checkAngebote(u.suchen[u.suchen.length - 1][0], u.suchen[u.suchen.length - 1][1]);
    if (ergebnis === "Fehler 500") res.send("500 Serverfehler");
    if(ergebnis !== 0) {
        let partner = functions.getUserByID(ergebnis);
        res.send("Partner gefunden! \nID:" + partner.userID + "\nName: " + partner.username + "\nKontaktdaten: " + partner.contact)
    }
    else res.send("Kein Partner gefunden")
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
    if (u === "User nicht gefunden") res.send(u);
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
    if (u === "User nicht gefunden") res.send(u);
    let antwort = u.addSuche(functions.fahrplanAbfrage(start, ziel, datum, stunde));
    res.send(antwort);
});