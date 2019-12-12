// Aufgabeblatt 3

// readline-Modul einfügen
'use strict';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let z = 1000000

//Stadt erstellen
function Stadt (name, einwohnerzahl, bundesland) {
    this.name = name;
    this.einwohnerzahl = einwohnerzahl;
    this.bundesland = bundesland;
}

// Funktion für de Erstellung des Objektes für Benutzer
function Benutzer(name, nachname, Email, Wohnort) {
    this.name = name;
    this.nachname = nachname;
    this.Email = Email;
    this.Wohnort = Wohnort;
}


// neue Stadt-Objekte erstellen
let Koeln = new Stadt('Koeln', 1085644, 'NRW');
let Hamburg = new Stadt('Hamburg', 1085644, 'NRW')
let Muenchen = new Stadt('Muenchen', 1085644, 'NRW')
let Berlin = new Stadt('Berlin', 1085644, 'NRW')
let Bremen = new Stadt('Bremen', 1085644, 'NRW')
let Leverkusen = new Stadt('Leverkusen', 1085644, 'NRW')
let Stuttgart = new Stadt('Stuttgart', 1085644, 'NRW')
let Leipzig = new Stadt('Leipzig', 1085644, 'NRW')
let Kiel = new Stadt('Kiel', 1085644, 'NRW')

let Maura = new Benutzer ('Weinandy', 'Maura', 'maura.96@live.de', Koeln)
let Tobi = new Benutzer('Lipski', 'Tobias', 'tobias.lipski@web.de', Leverkusen)


var stadtArray = [];
var benutzerArray =[]; 

const fs = require ('fs');
const citypath = './cities.json';
const userpath = './user.json';

// Daten zu JSON File exportieren 
function pushtofile (arrayfromoutside, path) {
    return new Promise ((resolve, reject) => {
        fs.writeFileSync('./cities.json', JSON.stringify(arrayfromoutside, null, 4));
        process.exit()
       
    })
}

// Daten holen über Promise
function ReadJSON() {
    return new Promise ((resove, reject) => {
        stadtArray = require (citypath);
        benutzerArray = require (userpath);
        
    });
}

var array = [];
var y = 0;

// Eleement löschen
function datenLoeschen (arrayfromoutside) {
    return new Promise ((resolve, reject) => {
        rl.question('Welche Stadt soll gelöscht werden?\n', answer =>{
            for (var k = 0; k < arrayfromoutside.length; k++) {
                if (arrayfromoutside[k].name == answer) {
                    arrayfromoutside.splice(k, 1);
                }
            }
            main ();
        
        });
    });
}

let City1 = new Stadt(' ',0, ' ')

// neue Stadt anlegen 

function neueStadt () {
    return new Promise((resolve, reject) => {
        rl.question('Wie ist der Name der City?\n', answer => {
            City1.name = answer;
            rl.question('Wieviele Einwohner hat die City?\n', answer2 => {
                City1.einwohnerzahl = parseInt(answer2);
                rl.question('In welchem Bundesland?\n', answer3 => {
                    City1.bundesland = answer3;
                    stadtArray.push(City1);
                    main()
                });
            });
        });
     
    })
}

var ende = 0 

function frage () {
    return new Promise ((resolve, reject) =>{
        rl.question ('1 für neue Stadt\n2 für Löschen\n3 für Ende\n', answer =>{
            ende = parseInt(answer);
            menue(ende);
            
        });
    })
}

async function menue (answer) {
    switch (answer){
        case 1: {
            await ReadJSON().then(neueStadt());
            break;
        }
        case 2: {
            await ReadJSON().then(datenLoeschen(stadtArray));
            break;
        }
        case 3: {
            await pushtofile(stadtArray, citypath);
            break;
        }
    }
}

async function main () {
    frage().then(menue(ende));
}


// Fehlercatches
/*    try {
        await ReadJSON()
    } catch (error) {
        console.log(error)
    }*/

/*  try {
      await test();
  } catch (error) {
      console.log(error)
  }*/
/*  try {
    await test2()
} catch (error) {
    console.log(error)
}*/

/*    try {
        await manipulatedata(cityarray)
    } catch (error) {
        console.log(error)
    }
    try {
        await newCity()
    } catch (error) {
        console.log(error)
    }
    try {
        await pushtofile(cityarray, citypath)
    } catch (error) {
        console.log(error)
    }
}*/

rl.question
main();