const express = require("express");
const router = express.Router();

router.get("/",async(req,res)=>{
    event_id = req.query.id
    res.send(event_id)
    // event from db
})

// router.get("/")

router.post("/",async(req,res)=>{
    // const {name, 
    //     files, 
    //     tagline,
    //     schedule,
    //     description,
    //     moderator,
    //     category,
    //     sub_category,
    //     rigor_rank} = req.body
    res.send(req.body)
})
module.exports = router