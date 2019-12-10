var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//Installieren via "npm i xmlhttprequest"
var apitoken = "3d67bf9773fba69970a84b25e1ae9b3d"
var xml2js = require('xml2js');
 
var XMLparser = new xml2js.Parser();//npm install xml2js

//var XMLparser = require('fast-xml-parser');//npm install fast-xml-parser
var util = require("util")

function umlautCheck(str){
    str = str.replace(/ä/g, "%C3%A4") // /suchmuster/g = erste alle treffer 
    str = str.replace(/ö/g, "%C3%B6") // und nicht nur den ersten wie bei "suchmuster"
    str = str.replace(/ü/g, "%C3%BC")
    str = str.replace(/Ä/g, "%C3%84")
    str = str.replace(/Ö/g, "%C3%96")
    str = str.replace(/Ü/g, "%C3%9C")
    str = str.replace(/ß/g, "%C3%9F")
    return str
}
function HTML_UmlautConverter(str){
    str = str.replace(/&#196;/g, "Ä")
    str = str.replace(/&#228;/g, "ä")
    str = str.replace(/&#214;/g, "Ö")
    str = str.replace(/&#246;/g, "ö")
    str = str.replace(/&#220;/g, "Ü")
    str = str.replace(/&#252;/g, "ü")
    str = str.replace(/&#223;/g, "ß")
    return str
}

function bahnhofIDSuche(str){
    var suche = umlautCheck(str)
    var request = new XMLHttpRequest()
    request.open("GET", "https://api.deutschebahn.com/stada/v2/stations?searchstring="+suche, false)
    request.setRequestHeader("Authorization", "Bearer " + apitoken)
    request.send()
    var str = request.responseText
    str = str.split("evaNumbers\":[{\"number\":")
    var id = str[1].split(",")

    return id[0]//request.responseText
}

module.exports = {
    Datum: function(){
        var options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit'};
        var dat = new Date();
        var s = dat.toLocaleDateString("de-DE", options);
        return s;
    },
    fahrplanAbfrage: function(startBahnhof, ziel, datum, stunde){
        var bahnhofsID = bahnhofIDSuche(startBahnhof)
        var request = new XMLHttpRequest()
        request.open("GET", "https://api.deutschebahn.com/timetables/v1/plan/"+bahnhofsID+"/"+datum+"/"+stunde, false)
        request.setRequestHeader("Authorization", "Bearer " + apitoken)
        request.send()

        var test

        const parser = new xml2js.Parser({ attrkey: "ATTR" });
        let xml_string = request.responseText

        parser.parseString(xml_string, function(error, result) {
            if(error === null) {
                test = result
            }
            else {
                console.log(error)
            }
        });

        var strecke

        for(var i = 0; i < test.timetable.s.length; i++){
            var string = JSON.stringify(test.timetable.s[i].ar[0]).split("ppth\":\"")[1]
            if(string.toLocaleLowerCase().includes(ziel)) {
                strecke = JSON.stringify(test.timetable.s[i].ar[0]).split("ppth\":\"")[1].split("\"}}")[0]
            }
        }

        // var streckeAR = JSON.stringify(test.timetable.s[0].ar[0]).split("ppth\":\"")[1]
        // streckeAR = streckeAR.split("\"}}")[0]

        // var streckeDP = JSON.stringify(test.timetable.s[0].dp[0]).split("ppth\":\"")[1]
        // streckeDP = streckeDP.split("\"}}")[0]

        // console.log(streckeAR)
        // console.log(streckeDP)

        console.log(strecke)

        console.log(":D")

        return test.timetable.s //request.responseText
    }
}