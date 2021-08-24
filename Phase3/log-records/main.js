
var users = [];

readInfo();
start();

readInfo();
function readInfo(){
    let fs = require("fs");
    if(fs.existsSync("users.json")){
        users = JSON.parse(fs.readFileSync("users.json").toString());
        debugger;
    }
    

   
}

function start(){
    let again = true;

    while(again){
        let readline = require("readline-sync");
        let fs = require("fs");
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
        let tryAgain = readline.question("Go again? (y/n): ");
        if(tryAgain == "n" || tryAgain == "N" || tryAgain == "no"){
            again = false;
        }
    }
    
}