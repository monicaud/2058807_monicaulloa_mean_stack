
var users = [];

let fs = require("fs");
if(fs.existsSync("users.json")){
    users = JSON.parse(fs.readFileSync("users.json").toString());
}

let readline = require("readline-sync");
let fnameUser = readline.question("Enter your first name: ");
let lnameUser = readline.question("Enter your last name: ");
let genderUser = readline.question("Enter your gender: ");
let emailUser = readline.questionEMail("Enter your email: ");
let dateUser = new Date();
debugger;
let user = {fname: fnameUser, lname: lnameUser, gender: genderUser, email: emailUser, date: dateUser};
users.push(user);
let userStr = JSON.stringify(users);
debugger;
fs.writeFileSync("users.json", userStr);


    
