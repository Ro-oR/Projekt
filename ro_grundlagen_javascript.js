
function sayHello(name) {

    //Gibt Inhalt auf Konsole wieder
    console.log('Hello ' + name);
}

//Führt die Funktion aus
sayHello('Robin')


/*//Zufällige Bewertungen für vorgegebene Anzahl an Bewertungen
const bewertungMax = 5
var anzahl = 15
var i =1
while(i <= anzahl) {
    //Math.random gibt eine zufällig Zahl zwischen 0 und 1 aus.
    //Multipliziert mit der gewünschten Maximalgröße lässt sich mit
    //math.floor der entsprechende Int-Wert ausgeben
    //Nachteil: Keine 0 möglich!!
    var bewertung = Math.floor(Math.random() * bewertungMax) +1
    console.log("Bewertung Nummer:", i)
    console.log("Bewertung: ",bewertung)
    i++
}

*/

const bewertungMax = 5
var anzahl = 15
var readline = require('readline');
var bewertung = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

bewertung.question('Was ist die Bewertung?', function(answer){
    if(answer<=bewertungMax){
        console.log('Die eingegebene Bewertung ist:', answer)
        var bew = answer
        bewertung.close();
    }
    else{
        console.log("Die eingegebene Bewertung ist nicht korrekt")
        bewertung.close();
    }

})