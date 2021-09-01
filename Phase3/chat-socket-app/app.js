//load express module
let express = require("express");

//create the reference of express module
let app = express();

//load the http module and connect to express module with server property
let http = require("http").Server(app);

//load the socket module and connect to http module
//with IIFE features
let io = require("socket.io")(http);

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"\\index.html");
})
let index = 0;


let meanGirlsQuotes = ["I'm sorry that people are so jealous of me. But I can't help it that I'm popular."
, "It's not my fault you're, like, in love with me or something!"
, "I'm not like a regular mom, I'm a cool mom!"
, "Get in loser, we're going shopping."
, "That's why her hair is so big. It's full of secrets."
, "Oh my God, Danny DeVito, I love your work!"
, "Is butter a carb?"
, "I wish we could all get along like we used to in middle school. I wish I could bake a cake filled with rainbows and smiles and everyone would eat and be happy."
, "She doesn't even go here!"
, "Ex-boyfriends are off-limits to friends. That's just, like, the rules of feminism."
, "But you're, like, really pretty… So you agree? You think you're really pretty?"
, "On Wednesdays we wear pink."
, "Four for you, Glenn Coco! You go, Glenn Coco!"
, "Raise your hand if you have ever been personally victimized by Regina George."
, "That is so fetch!"];


io.on("connection", (socket)=>{
    console.log("Client connected");
    //receive msg from client app
    socket.on("obj",(msg)=>{
        console.log(msg);
    })
    //send data to client
    if(index == meanGirlsQuotes.length) index=0;
    socket.emit("obj1", meanGirlsQuotes[index]);
    console.log("Server said: " + meanGirlsQuotes[index]);
    index++;

})

http.listen(9090,()=>console.log("Server is running on 9090"));