// Aufgabenblatt 2

//Aufgabe 1 - Array
// Name, letzte Bewertung und Anzahl der abgegebenen Bewertungen in Array abspeichern. 
//unklar was genau Name sein soll

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const maxBewertung = 5


var array = [name = "Bewertung" , bewertung = 4 , anzahl = 10];


console.log('\n')


function bewerten(){
rl.question('Bitte geben Sie die Bewertung ein (zwischen 0 und 5): ', function(answer) {
	if (answer >=0 && answer <= maxBewertung) {
		array[1] = answer; 
		array[2]++
    } else {console.log('Diese Zahl ist keine gültige Eingabe!')}
    rl.question('Bitte geben Sie ihren Namen ein: ', function (answer){
        array[0] = answer;
        rl.close();
		console.log("\nName: " + array[0], "Bewertung: " +array[1], "Anzahl der Bewertungen: " +array[2] )
		console.log ("Länge des Arrays: " + array.length)
    })})
    

}

bewerten();







