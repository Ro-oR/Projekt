var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//Installieren via "npm i xmlhttprequest"
var apitoken = "3d67bf9773fba69970a84b25e1ae9b3d"
var xml2js = require('xml2js');
 
var XMLparser = new xml2js.Parser();//npm install xml2js

function umlautCheck(str){
    str = str.replace("ä", "%C3%A4")
    str = str.replace("ö", "%C3%B6")
    str = str.replace("ü", "%C3%BC")
    str = str.replace("Ä", "%C3%84")
    str = str.replace("Ö", "%C3%96")
    str = str.replace("Ü", "%C3%9C")
    str = str.replace("ß", "%C3%9F")
    return str
}
function umlautConverter(str){

}

module.exports = {
    bahnhofIDSuche: function(str){
        var suche = umlautCheck(str)
        var request = new XMLHttpRequest()
        request.open("GET", "https://api.deutschebahn.com/stada/v2/stations?searchstring="+suche, false)
        request.setRequestHeader("Authorization", "Bearer " + apitoken)
        request.send()
        //var test = JSON.parse(request.responseText)
        //console.log("\n" + test.result + "\n")

        var test = request.responseText
        test = test.split("evaNumbers\":[{\"number\":")
        var test2 = test[1].split(",")

        return test2[0]//request.responseText
    },
    fahrplanAbfrage: function(bahnhofsID, datum, stunde){
        var request = new XMLHttpRequest()
        request.open("GET", "https://api.deutschebahn.com/timetables/v1/plan/"+bahnhofsID+"/"+datum+"/"+stunde, false)
        request.setRequestHeader("Authorization", "Bearer " + apitoken)
        request.send()

        var test = XMLparser.parseString(request.responseText)
        console.log(test)

        return request.responseText
    }
}