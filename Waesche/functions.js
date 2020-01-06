const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//Installieren via "npm i xmlhttprequest"
const apitoken = "3d67bf9773fba69970a84b25e1ae9b3d";
const xml2js = require('xml2js');//npm install xml2js
const fs = require("fs");

const util = require("util");

function umlautCheck(str){
    str = str.replace(/ä/g, "%C3%A4"); // /suchmuster/g = erste alle treffer
    str = str.replace(/ö/g, "%C3%B6"); // und nicht nur den ersten wie bei "suchmuster"
    str = str.replace(/ü/g, "%C3%BC");
    str = str.replace(/Ä/g, "%C3%84");
    str = str.replace(/Ö/g, "%C3%96");
    str = str.replace(/Ü/g, "%C3%9C");
    str = str.replace(/ß/g, "%C3%9F");
    return str
}
function HTML_UmlautConverter(str){
    str = str.replace(/&#196;/g, "Ä");
    str = str.replace(/&#228;/g, "ä");
    str = str.replace(/&#214;/g, "Ö");
    str = str.replace(/&#246;/g, "ö");
    str = str.replace(/&#220;/g, "Ü");
    str = str.replace(/&#252;/g, "ü");
    str = str.replace(/&#223;/g, "ß");
    return str
}

function bahnhofIDSuche(str){
    let suche = umlautCheck(str);
    let request = new XMLHttpRequest();
    request.open("GET", "https://api.deutschebahn.com/stada/v2/stations?searchstring="+suche, false);
    request.setRequestHeader("Authorization", "Bearer " + apitoken);
    request.send();

    if(request.status === "400"){
        console.log("Syntax Fehler")
        return "Fehler"
    }
    if(request.status === "401"){
        console.log("Ungültiges Token")
        return "Fehler"
    }
    if(request.status === "404"){
        console.log("Nichts gefunden")
        return "Fehler"
    }
    if(request.status === "500"){
        console.log("Serverfehler")
        return "Fehler"
    }

    let string = request.responseText;
    string = string.split("evaNumbers\":[{\"number\":");
    let id = string[1].split(",");

    return id[0]
}

/**
 * @return {string}
 */
function datumHeute(){
    let options = { year: '2-digit', month: '2-digit', day: '2-digit'};//, hour: '2-digit'};
    let dat = new Date();
    return dat.toLocaleDateString("de-DE", options).replace(/-/g, "");
}

module.exports = {
    /**
     * @return {string}
     */
    Datum: function(){
        let options = { year: '2-digit', month: '2-digit', day: '2-digit'};//, hour: '2-digit'};
        let dat = new Date();
        return dat.toLocaleDateString("de-DE", options).replace(/-/g, "");
    },
    fahrplanAbfrage: function(startBahnhof, ziel, datum, stunde){
        if(datumHeute() > datum){
            console.log("Datum in der Vergangenheit!")
            return "Fehler"
        }
        let bahnhofsID = bahnhofIDSuche(startBahnhof);
        let request = new XMLHttpRequest();
        request.open("GET", "https://api.deutschebahn.com/timetables/v1/plan/"+bahnhofsID+"/"+datum+"/"+stunde, false);
        request.setRequestHeader("Authorization", "Bearer " + apitoken);
        request.send();


        if(request.status === "400"){
            console.log("Syntax Fehler")
            return "Fehler"
        }
        if(request.status === "401"){
            console.log("Ungültiges Token")
            return "Fehler"
        }
        if(request.status === "404"){
            console.log("Nichts gefunden")
            return "Fehler"
        }
        if(request.status === "410"){
            console.log("Resource nicht verfügbar")
            return "Fehler"
        }

        let response;

        const parser = new xml2js.Parser({ attrkey: "ATTR" });
        let xml_string = request.responseText;

        parser.parseString(xml_string, function(error, result) {
            if(error === null) {
                response = result
            }
            else { console.log(error) }
        });

        let strecke;

        for(let i = 0; i < response.timetable.s.length; i++){
            let string = JSON.stringify(response.timetable.s[i].ar[0]).split("ppth\":\"")[1];
            if(string.toLocaleLowerCase().includes(ziel)) {
                strecke = JSON.stringify(response.timetable.s[i].ar[0]).split("ppth\":\"")[1].split("\"}}")[0]
            }
        }
        return (strecke+"|"+startBahnhof).toLocaleLowerCase()
    },
    checkSuchen: function(strecke){
        let suchen = JSON.parse(fs.readFileSync('./suchen.json', 'utf8', (err) => {
                if (err) {
                    console.log("Lesefehler", err);

                }
            })
        );
        for(let i = 0; i < suchen.length; i++){
            if(strecke.includes(suchen[i].strecke)) return suchen[i].suchender
        }
        return 0
    },
    checkAngebote: function(strecke){
        let angebote = JSON.parse(fs.readFileSync('./angebote.json', 'utf8', (err) => {
                if (err) {
                    console.log("Lesefehler", err);

                }
            })
        );
        for(let i = 0; i < angebote.length; i++){
            if(angebote[i].strecke.includes(strecke)) return angebote[i].anbieter
        }
        return 0
    }
};