//load express module
let express = require("express");

let mongoose = require("mongoose");

let url = "mongodb://localhost:27017/tcsmean";

//create the reference of express module
let app = express();

//load the http module and connect to express module with server property
let http = require("http").Server(app);

//load the socket module and connect to http module
//with IIFE features
let io = require("socket.io")(http);
mongoose.pluralize(null);
mongoose.connect(url).then(res=>console.log("connected!")).catch(err=>console.log(err));

let msgSchema = mongoose.Schema({
    
    name:String,
    message:String
    
})

let msgModel = mongoose.model("Messages", msgSchema);


app.get("/", (req,res)=>{
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection", (socket)=>{
    console.log("Client connected");
    //receive msg from client app
    socket.on("obj",(msg)=>{

        msgModel.insertMany(msg, (err,result)=>{
            if(!err){
                console.log(result);
            }else{
                console.log(err);
            }
        })
        
    })

})

http.listen(9090,()=>console.log("Server is running on 9090"));