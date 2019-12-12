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
function Stadt (einwohnerzahl, name, bundesland) {
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
let bonn = new Stadt(350510, 'Bonn','NRW')
let berlin = new Stadt(3644826, "Berlin", "Berlin")

let Robin = new Benutzer ("Robin", "Ortlepp", "robin@ro-or.de", bonn)
let Max = new Benutzer('Max', 'Mustermann', 'maxmustermann@beispiel.de', berlin)


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

// Element löschen
function datenLoeschen (arrayfromoutside) {
    return new Promise ((resolve, reject) => {
        rl.question('Welche Stadt soll gelöscht werden?\n', answer =>{
            for (var i = 0; i < arrayfromoutside.length; i++) {
                if (arrayfromoutside[i].name == answer) {
                    arrayfromoutside.splice(i, 1);
                }
            }
            main ();
        
        });
    });
}

let City1 = new Stadt(0,'', ' ')

// neue Stadt anlegen 

function neueStadt () {
    return new Promise((resolve, reject) => {
        rl.question('Wieviele Einwohner hat die City?\n', answer => {
            City1.einwohnerzahl = answer;
            rl.question('Wie ist der Name der City?\n', answer2 => {
                City1.name = parseInt(answer2);
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