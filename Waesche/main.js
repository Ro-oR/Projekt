const Ticket = require("./ticket.js");
const User = require("./user.js");
const fs = require("fs");

var u1 = new User("Test", "test@test");
var u2 = new User("Test2", "test2@test");

/*
u1.addTicket();
u2.addTicket();
u1.print();
u2.print();*/

var x = 0
var b;

var jsonString = JSON.stringify({UserCount : 8})

fs.readFileSync('./Projekt-Waesche-Weinandy-Ortlepp/Waesche/userCount.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    jsonString.UserCount++
    console.log('File data:', jsonString) 
})

b = JSON.parse(jsonString)
console.log(b.UserCount)

x = b.UserCount
x++
console.log(x)

fs.writeFile('./Projekt-Waesche-Weinandy-Ortlepp/Waesche/userCount.json', JSON.stringify({UserCount : x})/*jsonString*/, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})