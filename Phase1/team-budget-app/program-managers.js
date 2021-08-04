 class Client{
     constructor(clientName, projectName, budget){
         this.clientName = clientName;
         this.projectName = projectName;
         this.budget = budget;
     }
 }
 
 function addBudget(){
     if(validate()){
        let clientName = document.getElementById("clientname").value;
        let projectName = document.getElementById("projectname").value;
        let budget = document.getElementById("budget").value;
        
        //create an array that retrieves whatever is inside session storage
        let clients = JSON.parse(sessionStorage.getItem("clients") || "[]");
        
        //create object of client type
        let obj = new Client(clientName, projectName, budget);
   
        //add new object into array
        clients.push(obj);
   
        //replace the clients array with updated info
        sessionStorage.setItem("clients", JSON.stringify(clients));
        console.log("Added!");
        document.getElementById("budgetform").reset();
     }
    
 }

 function validate(){
    
    let cName = document.getElementById("clientname").value;
     let pName = document.getElementById("projectname").value;
     let budget = document.getElementById("budget").value;
     if(cName.length == 0){
         alert("Need Client to be filled out");
         return false;
     }
     else if(pName.length == 0){
         alert("Need project name to be filled out");
         return false;
     }
     else if (budget.length == 0){
        alert("Need budget to be filled out");
        return false;
     }
     else{
         return true;
     }
 }

 function display(){
     let tablestart = "<table class =\"table table-striped\"><tr><th>Client Name</th><th>Project Name</th><th>Budget</th></tr>"
     let endtable = "</table>"
     let middletable = ""
     let total = 0;

     let clients = JSON.parse(sessionStorage.getItem("clients") || "[]");
     clients.forEach(element => {
         middletable += "<tr><td>"+ element.clientName + "</td> <td>" + element.projectName + "</td> <td>"+ element.budget+"</td> </tr>";
         total+=parseInt(element.budget, 10);
     });

     middletable += "<tr class=\"table-dark text-right\" style=\"color: black;\"><td colspan=\"3\">" +"Total: $"+ total + "</td></tr>";
     let wholetable = tablestart+middletable+endtable;
     document.getElementById("tablebody").innerHTML = wholetable;
 }