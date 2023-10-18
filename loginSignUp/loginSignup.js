const express= require("express");
const fs= require('fs');
const router=express.Router();
const path=require("path");

// const cookieparser= require("cookie-parser");
// const session=require("express-session")
// router.use(cookieparser());
// const oneday=1000*60*60*24;

// router.use(session({
//     saveUninitalized:true,
//     resave:false,
//     secret:'nfskjnfsiurnie',
//     cookie:{
//         maxAge:oneday
//     }
// }))


//router.get() is used when you want to define route handlers within a specific router or module. 
router.get("/",(req,res)=>{
    res.send("am profile ")
})

//Below section is used to store data in usersData.txt file
router.post("/signup", (req, res) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password
    };
    

    fs.readFile("./usersData.txt", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            
            return;
        }

        const records = JSON.parse(data);
        let result= records.filter((item)=>{
            if(item.username=== req.body.username){
                return true;
            }
        })
        if(result.length==0){

        records.push(newUser);

        fs.writeFile("./usersData.txt", JSON.stringify(records, null, 1), (err) => {
            if (err) {
                console.log(err);
            }
            res.send("Signup successful! <a href='/profile/login'>Login</a>");
        });
    }
    else{
        res.send("username exist")
    }
    });
});

router.get("/signup",(req,res)=>{
res.sendFile(path.join(__dirname,"../public/signup.html"));})



router.post("/login",(req,res)=>{
    fs.readFile("./usersData.txt","utf-8",(err,data)=>{
        if(err){
            console.log(err)
        }
        let record= JSON.parse(data);
        let result=record.filter((item)=>{
            if(item.username===req.body.username && item.password===req.body.password){
                
                return true;}
            
        })
        if(result.length==0){
            res.send("Invalid user")
        }else{
            res.send(`Welcome ${req.body.username}`)
        }
    })
})

router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/login.html"));
})
module.exports=router;