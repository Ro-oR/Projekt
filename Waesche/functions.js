var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;//Installieren via "npm i xmlhttprequest"
var apitoken = "3d67bf9773fba69970a84b25e1ae9b3d"

var XMLparser = require('fast-xml-parser');//npm install fast-xml-parser
var util = require("util")

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

        var options = {
            attributeNamePrefix : "@_",
            attrNodeName: "attr", //default is 'false'
            textNodeName : "#text",
            ignoreAttributes : true,
            ignoreNameSpace : false,
            allowBooleanAttributes : false,
            parseNodeValue : true,
            parseAttributeValue : false,
            trimValues: true,
            cdataTagName: "__cdata", //default is 'false'
            cdataPositionChar: "\\c",
            localeRange: "", //To support non english character in tag/attribute values.
            parseTrueNumberOnly: false,
            arrayMode: false, //"strict"
            attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
            tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
            stopNodes: ["parse-me-as-string"]
        };

        console.log(util.inspect(XMLparser.parse(request.responseText, options)))
        return request.responseText
    }
}