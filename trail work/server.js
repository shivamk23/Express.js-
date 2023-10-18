const express= require("express");
const path= require("path");
const app = express();
app.use(express.static("."));


// app.get("/",(req,res)=>{
//         // res.write("Welcome ");
//         // res.end();
//         res.sendFile(path.join(__dirname,"./home.html"));
//         console.log("okay haome")
// })
// app.get("/style.css",(req,res)=>{
//     // res.write("Welcome ");
//     // res.end();
//     res.sendFile(path.join(__dirname,"./style.css"));
// })

app.get("*",(req,res)=>{
    // res.write("Welcome ");
    // res.end();
    res.send("other");
})

// app.post("/getdata",(req,res)=>{

// })

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});