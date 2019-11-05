//Aufgabe 2 Objekt erstellen

let ratings = {
  name: "Top",
  anzahl: 10,
  bewertung: 5
}

console.log(ratings.name)


//Aufgabe 3 (+ Forzsetzung Aufgabe 2)
// mehrere Bewertungen können erstellt werden, indem die Erzeugung des Objekts in eine Funktion gepackt wird
// blueprint

function bewertung (name, anzahl, bewertung, gesamtbewertung){ //Konstruktor mit den Eigenschaften jeder Bewertung
    this.name = name //Objektdefiniton
    this.anzahl = anzahl //this. ist vom Objekt &  wird vom Parameter der Funktion übergeben
    this.bewertung = bewertung // Werte werden dem Objekteigenschaften durch Parameter zugeschrieben
    this. gesamtbewertung = gesamtbewertung 
    this.durchschnitt = function () { //Methode = Funktion innerhalb eines Objects
        this.gesamtbewertung = gesamtbewertung + this.bewertung
        return this.gesamtbewertung/this.anzahl
        
    }
   
}

let bewertung2 = new bewertung("Tina", 2, 4,10)

console.log ("\n", bewertung2.durchschnitt())

//Aufgabe 4 (Arrow Function)
function bewertung (name, anzahl, bewertung, gesamtbewertung){ //Konstruktor mit den Eigenschaften jeder Bewertung
    this.name = name //Objektdefiniton
    this.anzahl = anzahl //this. ist vom Objekt &  wird vom Parameter der Funktion übergeben
    this.bewertung = bewertung // Werte werden dem Objekteigenschaften durch Parameter zugeschrieben
    this. gesamtbewertung = gesamtbewertung 
    this.durchschnitt =() => { //ARROW Funktion zur Verkürzung
        return (this.gesamtbewertung+this.bewertung)/this.anzahl
    }
}

let bewertung1 = new bewertung("Steve", 2, 4,10)
console.log ("\n",bewertung1.durchschnitt())



// Aufgabe 5 Scope = Sichtbarkeitsbereich einer Variablen

const hello = "hello"
const world = "World"
function helloWorld () {
    const world = "World"
    console.log (hello + world)
}

function worldHello () {
    console.log(world+hello)
}

helloWorld();
worldHello(); // ERROR world ist not defined 
//world ist nur innerhalb HelloWorld definiert -> auch außerhalb definieren