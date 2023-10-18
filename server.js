const express= require("express");
const app=express();
const fs=require("fs");
const orderRouter=require("./Routing/orderRoute")
const loginSignu=require("./loginSignUp/loginSignup")
const cookieparser= require("cookie-parser");
const session=require("express-session");
const { Server } = require("http");
const client = require("mongodb").MongoClient;
client.connect("mongodb://127.0.0.1:27017").then((Server)=>{
    let dbinstance=data.db("Project");
console.log("database connected")
}).catch((err)=>{
console.log("database not connected : "+err)
})

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(cookieparser());
app.use("/orders",orderRouter)
app.use("/profile",loginSignu) 

app.get("/getData",(req,res)=>{

    dbinstance.collection("students").find({}).toArray().then((response)=>{
        //console.log(response);
        res.render("home",{data:response});
    })
        //db.students
})

app.get("/signup",(req,res)=>{
    let obj={};
    obj.name=req.query.name;
    obj.age=req.query.age;
    dbinstance.collection("students").insertOne(obj).then((res)=>{
        console.log(res,"Record inserted");
        res.end();
        
    })
})

// function auth(req,res,next){
//     if(req.session.username){
//         next()
//     }
//     res.redirect("")
// }

// ... previous code

// app.get("/signup", (req, res) => {
//     res.sendFile(__dirname + "/signup.html");
// })

// app.get('/order',(req,res)=>{
//     res.send("Order page")
// })
// app.get('/order/history',(req,res)=>{
//     res.send("history page")
// })

// app.post("/signup", (req, res) => {
//     const newUser = {
//         username: req.body.username,
//         password: req.body.password
//     };
    

//     fs.readFile("./usersData.txt", "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
            
//             return;
//         }

//         const records = JSON.parse(data);
//         records.push(newUser);

//         fs.writeFile("./usersData.txt", JSON.stringify(records, null, 1), (err) => {
//             if (err) {
//                 console.log(err);
//             }
//             res.send("Signup successful! <a href='/login'>Login</a>");
//         });
//     });
// });

// app.get("/login", (req, res) => {
//     res.sendFile(__dirname + "/login.html");
// });






// app.get("/login",(req,res)=>{
//     // console.log(req.query);
    
//     res.send(`welcome ${req.query.yourname}`
//     );

// })
// app.post("/login",(req,res)=>{
//     // console.log(req.body)
//     fs.readFile("./usersData.txt","utf-8",(err,data)=>{
//             if(err){
//                 console.log(err);
//             }
//         console.log("File Content:", data);
//         let record=JSON.parse(data);
//         let result=record.filter((item)=>{
//             if(item.username==req.body.yourname  && item.password==req.body.yourpaswd)
//             return true;
//         })
//         if(result.length==0){
//             res.send("Invalid user/paswword");
//         }else{
//             res.send(`Welcome ${req.body.yourname}`);
//         }
//     })
// })


app.get("/gmap/:from/:to",(req,res)=>{
    res.send(req.params.from +" to "+req.params.to);
})
app.listen(3000,(err)=>{
    console.log("Server is Started...");
})