async function main() {

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


/*
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
*/
//Aufgabe 4:


async function randomBew() {

    const bewertungMax = 5
    var anzahl = 0
    let bewArray = [];
    var readline = require('readline');

    var bewertung = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function getRandom(min, max) {
	    return Math.floor(Math.random() * (max - min +1)) + min; 
    } 

    bewertung.question('Wie oft soll bewertet werden?:', function(answer) {
        if(isNaN(answer)) {
            console.log("Keine gülitge Eingabe!!")
            bewertung.close();
        }
        else{
            var gesamt =0 
	        for(i=0; i<answer; i++){
                var x = getRandom(0, bewertungMax)
	            console.log('\nDies ist Bewertung Nummer '+(i+1))
		        console.log ("Die Bewertung ist:" +x)
		        anzahl++
	            gesamt = gesamt + x
	            console.log("Gesamtzahl der Bewertungen:" +anzahl )
                console.log("Gesamtbewertung:"+(gesamt/anzahl))
            }

            //Hier werden nun die KOmponenten Name, letzte Bewertung und Anzahl der Bewertungen in ein Array eingefügt
            bewArray.push(i)
            bewArray.push(x)
            bewArray.push(anzahl)
            //und schlie0lich ausgegeben
            console.log("Array-Ausgabe:")
            console.log("\n\nBewertungsname: "+bewArray[0],"\nAktuelle Bewertung: "+bewArray[1],"\nAnzahl der Bewertungen: "+bewArray[2])

            //Hier werden die o.g. Komponenten in ein Objekt eingefügt
            let ratings = {i,x,anzahl};
            console.log("Object-Ausgabe:")
            console.log("\n\n"+ratings)
            bewertung.close();
         }
    })
}

await randomBew()



console.log('\n')

}
main()