const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("Oredr Home Pge")
})

router.get("/details/:x",(req,res)=>{
    res.send("details page"+req.params.x);
})
router.get("/history",(req,res)=>{
    res.send("history page");
})

module.exports=router;