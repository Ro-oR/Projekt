var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//Installieren via "npm i xmlhttprequest"
var apitoken = "3d67bf9773fba69970a84b25e1ae9b3d"

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

module.exports = {
    bahnhofSuche: function(str){
        var suche = umlautCheck(str)
        var request = new XMLHttpRequest()
        request.open("GET", "https://api.deutschebahn.com/stada/v2/stations?searchstring="+suche, false)
        request.setRequestHeader("Authorization", "Bearer " + apitoken)
        request.send()
        var test = JSON.parse(request.responseText)
        console.log("\n" + test.result + "\n")
        return test//request.responseText
    }
}