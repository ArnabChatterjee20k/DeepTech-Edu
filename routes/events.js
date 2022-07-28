const express = require("express");
const router = express.Router();

const [db,client] = require("../utils/db")
router.get("/",async(req,res)=>{
    event_id = req.query.id
    res.send(event_id)
    // event from db
})

// router.get("/")

router.post("/",async(req,res)=>{
    try{
        const {name, 
            files, 
            tagline,
            schedule,
            description,
            moderator,
            category,
            sub_category,
            rigor_rank} = req.body
            db()
            .then(
                async(collection)=>{
                const {insertedId} = await collection.insertOne(req.body)
                res.json({id:insertedId})
            }
            )
            .catch((err)=>res.json({err}))
            .finally(()=>client.close())
    }
    catch{

    }
        
})
module.exports = router