let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");

let app = express();
app.use(bodyParser.urlencoded({extended:true}));

let url = "mongodb://localhost:27017/test";
mongoose.pluralize(null);
mongoose.connect(url).then(res=>console.log("connected!")).catch(err=>console.log(err));

let courseSchema = mongoose.Schema({
    _id:Number,
    name:String,
    des:String,
    amount:Number
    
})

let courseModel = mongoose.model("Course", courseSchema);

app.post("/addnew",(req, res)=>{
    let newC = req.body;

    let c = new courseModel({_id:newC.cid, name:newC.name, des:newC.desc, amount:newC.amount});

    courseModel.insertMany(c, (err,res)=>{
        if(!err){
            console.log(res);
        }else{
            console.log(err);
        }
        // mongoose.disconnect();
    })
    

    res.sendFile(__dirname+"\\index.html");
})




app.get("/",(req, res)=>{
    res.sendFile(__dirname+"\\index.html");
})

app.get("/fetchcourse",(req, res)=>{
    //res.sendFile(__dirname+"\\fetchcourse.html");
    let fetchBegin = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fetch Course</title>
    </head>
    <body>
        <div>
        <h2>Fetch Courses</h2>
            <table>
                <thead>
                    <th>Course ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                </thead>
                <tbody>`;

    let fetchend = `</tbody>
    </table>
    </div>
    </body>
    </html>`;

    let fetchmid = "";

    courseModel.find({},(err,data)=> {
        if(!err){
            data.forEach(c=>{
                fetchmid += "<tr><td>" + c._id + "</td>" + "<td>" + c.name + "</td>" +"<td>" + c.des + "</td>" +"<td>" + c.amount + "</td></tr>";
            })
            fetchBegin += fetchmid + fetchend;
            res.send(fetchBegin);
            //console.log(data);
        }else {
             res.json(err);   
        }
    })
})
app.get("/deletecourse",(req, res)=>{
    res.sendFile(__dirname+"\\deletecourse.html");
})

app.get("/delete", (req,res)=>{
    let cid = req.query["cid"];

        console.log("in delete");
    
        courseModel.deleteOne({_id:cid}, (err,res)=>{
            if(!err){
                console.log(res);
            }else{
                console.log(err);
            }
        })
    res.sendFile(__dirname+"\\index.html")
})

app.get("/update",(req, res)=>{
    // res.sendFile(__dirname+"\\updatecourse.html");

    let id = req.query["cid"];
    let amount = req.query["amount"];
    courseModel.updateOne({_id:id},{$set:{amount:amount}},(err,result)=> {
        if(!err){
            res.sendFile(__dirname+"\\index.html");
            //console.log(data);
        }else {
             res.send(err);   
        }
    })

})

app.get("/updatecourse",(req, res)=>{
    res.sendFile(__dirname+"\\updatecourse.html");
})
app.get("/addcourse",(req, res)=>{
    res.sendFile(__dirname+"\\addcourse.html");
})

app.listen(9090,()=>console.log("Server running on port number 9090"))