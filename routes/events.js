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
                if(!event){
                    res.status(404).json({data:event})
                } else{
                    res.status(200).json({data:event})
                }
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

router.put("/:id",async(req,res)=>{
    try{
        const event_id = new ObjectId(req.params.id)
        db()
            .then(
                async(collection)=>{
                await collection.updateOne({_id:event_id},{$set:req.body})
                res.status(200).json({status:"updated"})
            }
            )
            .catch((err)=>{
                console.log(err)
                res.status(500).json({err})})
            .finally(()=>client.close())
    }
    catch(error){
        res.status(500).json({status:"internal server error"})
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const event_id = new ObjectId(req.params.id)
        db()
            .then(
                async(collection)=>{
                const result = await collection.deleteOne({_id:event_id})
                const delete_count = await result.deletedCount
                if(delete_count === 1){
                    res.status(200).json({status:"deleted"})
                } else{
                    res.status(404).json({status:"not found"})
                }
            }
            )
            .catch((err)=>{
                console.log(err)
                res.json({err})})
            .finally(()=>client.close())
    }
    catch(error){
        res.status(500).json({status:"internal server error"})
    }})

module.exports = router