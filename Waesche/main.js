const User = require("./user.js");

var apitoken = "3d67bf9773fba69970a84b25e1ae9b3d"
var u1 = new User("Test1", "test1@test");
var u2 = new User("Test2", "test2@test");
var u3 = new User("Test3", "test3@test");

function testfun1(){
    var request = new XMLHttpRequest()
    request.open("GET", "https://api.deutschebahn.com/freeplan/v1/location/BLN", false)
    request.send(null)
    return request.responseText
}

console.log(u1.username + " " + u1.userID)
console.log(u2.username + " " + u2.userID)
u3.addRegionalTicket("NRW")
u3.addTicket("Köln - Berlin")

console.log(testfun1())