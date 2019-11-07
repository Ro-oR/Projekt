const User = require("./user.js");

var u1 = new User("Test1", "test1@test");
var u2 = new User("Test2", "test2@test");
var u3 = new User("Test3", "test3@test");

console.log(u1.username + " " + u1.userID)
console.log(u2.username + " " + u2.userID)
u3.addRegionalTicket("NRW")
u3.addTicket("Köln - Berlin")


// for(var i = 0; i < 100; i++){
//     console.log(new User("Test", "test@test"))
// }