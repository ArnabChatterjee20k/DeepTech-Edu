const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId
const [db,client] = require("../utils/db")

router.get("/",async(req,res)=>{
    try{
        const event_id = new ObjectId(req.query.id)
        db()
            .then(
                async(collection)=>{
                const event = await collection.findOne({_id:event_id})
                console.log(event)
                res.status(200).json({event})
            }
            )
            .catch((err)=>res.json({err}))
            .finally(()=>client.close())
    }catch(error){
        res.status(500).json({"error":"internal server error"})
    }
})

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
                res.status(200).json({id:insertedId})
            }
            )
            .catch((err)=>res.json({err}))
            .finally(()=>client.close())
    }
    catch(error){
        res.status(500).json({"error":"internal server error"})
    }
        
})
module.exports = router