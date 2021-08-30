let http = require("http");
let url = require("url");
let fs = require("fs");
let page = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h1>Add Task</h1>

    <form action="addtask">
        <h3>Add Task</h3>
        <label>Emp Id</label>
        <input type="text" name="empid"><br>
        <label>Task ID</label>
        <input type="text" name="taskid"><br>
        <label>Task</label>
        <input type="text" name="task"><br>
        <label>Deadline</label>
        <input type="date" name="deadline"><br>
        <input type="reset" value="reset">
        <input type="submit" value="submit">
        
    </form>
    <a href="delete">Go to Delete Tasks</a><br>
    <a href="viewtasks">Go to View Tasks</a>
</body>
</html>`

let deletePage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h1>Task</h1>
    <form action=\"deletetask\">
        <h3>Delete Task</h3>
        <label>Task ID</label>
        <input type="text" name="deletetaskid">
        <input type="reset" value="reset">
        <input type="submit" value="submit">
        
    </form>
    <a href=viewtasks>Go to View Tasks</a><br>
    <a href=home>Go to add tasks</a>
</body>
</html>`

let deleted = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h3>Task successfully deleted</h3>

    <a href=home>go to add tasks</a><br>
    <a href=viewtasks>go to view tasks</a><br>
    <a href=delete>Go to delete task</a><br>
</body>
</html>`
let cantDelete = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h3>Task not found</h3>

    <a href=home>go to add tasks</a><br>
    <a href=viewtasks>go to view tasks</a><br>
    <a href=delete>Go to delete task</a>
    
</body>
</html>`

let tasksPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h1>Task Added</h1>

    <a href=\"home\">Add more Tasks</a><br>
    <a href=\"viewtasks\">View all tasks</a><br>
    <a href="delete">Go to Delete Tasks</a>
</body>
</html>`
let unsuccessfulAdd = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Task</title>
</head>
<body>
    <h1>Task ID already exists</h1>

    <a href=\"home\">Add more Tasks</a><br>
    <a href=\"viewtasks\">View all tasks</a><br>
    <a href="delete">Go to Delete Tasks</a>
</body>
</html>`

let tasks = [];
if(fs.existsSync("tasks.json")){
    tasks = JSON.parse(fs.readFileSync("tasks.json").toString());                
}

let server = http.createServer((req,res)=>{
    let urlInfo = url.parse(req.url, true);

    if(urlInfo.path != "/favicon.ico"){
        if(urlInfo.pathname =="/addtask"){
            let addtask = urlInfo.query;

            let task = {empid:addtask.empid, taskid:addtask.taskid, task:addtask.task, deadline:addtask.deadline};
            let canAdd = tasks.find(t=>t.taskid == task.taskid);

            if(canAdd == undefined){
                tasks.push(task);
                res.write(tasksPage);
            }
            else{
                console.log("Already added");
                res.write(unsuccessfulAdd);
            }
            
        }
        else if(urlInfo.pathname =="/" || urlInfo.pathname=="/home"){
            res.write(page);
        }
        else if(urlInfo.pathname == "/viewtasks"){
            
            let table = "<table><thead>"
                +" <th>Emp Id</th>"
                + "<th>Task ID</th>"
                + "<th>Task</th>"
                + "<th>Deadline</th>"
                + "</thead>"
                + "<tbody>";
            let trStr = "";
            
            tasks.forEach(t => {
                trStr+= "<tr><td>"+t.empid + "</td>"
                + "<td>" + t.taskid + "</td>"
                + "<td>" + t.task + "</td>"
                + "<td>" + t.deadline + "</td></tr>"
            });
            table += trStr + "</tbody></table><a href=home>Add more Tasks</a><br>"
            +" <a href=delete>Go to Delete Tasks</a>"
            res.write(table);
        }else if(urlInfo.pathname == "/delete"){
            res.write(deletePage);
        }else if(urlInfo.pathname == "/deletetask"){
            let delTask = urlInfo.query;

            
            let canDel = tasks.find(t=>t.taskid == delTask.deletetaskid);

            if(canDel == undefined){
                res.write(cantDelete)
            }
            else{
                let index = tasks.findIndex(t=>t.taskid == delTask.deletetaskid);
                tasks.splice(index,1);
                console.log("here is the index" + index);
                console.log(JSON.stringify(tasks));
                res.write(deleted  );
            }
        }
        // console.log(urlInfo);
        
    }

    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    res.end();
})


server.listen(9090, ()=>console.log("server seems to be running at 9090")); 