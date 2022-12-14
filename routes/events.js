const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId
const [db, client] = require("../utils/db")

router.get("/", async (req, res) => {
    try {
        const query_string = req.query
        if (query_string.id) {
            console.log("query")
            const event_id = new ObjectId(query_string.id)
            db()
                .then(
                    async (collection) => {
                        const event = await collection.findOne({ _id: event_id })
                        if (!event) {
                            res.status(404).json({ data: event })
                        } else {
                            res.status(200).json({ data: event })
                        }
                    }
                )
                .catch((err) => res.json({ err }))
                .finally(() => client.close())
        }
        else{
            console.log("query1")
            const { type, limit } = query_string;
            const PAGE_SIZE = Number.parseInt(limit);
            const {page} = Number.parseInt(query_string.page);
            // const PAGE_SIZE =  2;
            // const page = 1;
            const skip = (page - 1) * PAGE_SIZE;
            db()
            .then(
                async (collection) => {
                    let data = await collection.find().sort({ "last_updated": -1 }).skip(skip).limit(PAGE_SIZE).toArray();
                    if (data) {
                        res.status(200).json({ data })
                    } else {
                        res.status(404).json({ "status": "not found" })
                    }
                }
            )
            .catch((err) => res.status(404).json({ err:err }))
            .finally(() => client.close())
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": "internal server error" })
    }
})

// router.get("/", async (req, res) => {
//     const { type, limit, page } = req.query;
//     const PAGE_SIZE = limit;
//     const skip = (page - 1) * PAGE_SIZE;
//     try {
//         db()
//             .then(
//                 async (collection) => {
//                     let data = await collection.find().sort({ "last_updated": -1 }).skip(skip).limit(PAGE_SIZE).toArray();
//                     if (data) {
//                         res.status(200).json({ data })
//                     } else {
//                         res.status(404).json({ "status": "not found" })
//                     }
//                 }
//             )
//             .catch((err) => res.json({ err }))
//             .finally(() => client.close())
//     } catch (error) {
//         res.status(500).json({ "error": "internal server error" })
//     }
// })


router.post("/", async (req, res) => {
    try {
        const { name,
            files,
            tagline,
            schedule,
            description,
            moderator,
            category,
            sub_category,
            rigor_rank } = req.body
        db()
            .then(
                async (collection) => {
                    const { insertedId } = await collection.insertOne({ last_updated: new Date(), ...req.body })
                    res.status(200).json({ id: insertedId })
                }
            )
            .catch((err) => res.json({ err }))
            .finally(() => client.close())
    }
    catch (error) {
        res.status(500).json({ "error": "internal server error" })
    }

})

router.put("/:id", async (req, res) => {
    try {
        const event_id = new ObjectId(req.params.id)
        db()
            .then(
                async (collection) => {
                    await collection.updateOne({ _id: event_id }, { $set: { last_updated: new Date(), ...req.body } })
                    res.status(200).json({ status: "updated" })
                }
            )
            .catch((err) => {
                console.log(err)
                res.status(500).json({ err })
            })
            .finally(() => client.close())
    }
    catch (error) {
        res.status(500).json({ status: "internal server error" })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const event_id = new ObjectId(req.params.id)
        db()
            .then(
                async (collection) => {
                    const result = await collection.deleteOne({ _id: event_id })
                    const delete_count = await result.deletedCount
                    if (delete_count === 1) {
                        res.status(200).json({ status: "deleted" })
                    } else {
                        res.status(404).json({ status: "not found" })
                    }
                }
            )
            .catch((err) => {
                console.log(err)
                res.json({ err })
            })
            .finally(() => client.close())
    }
    catch (error) {
        res.status(500).json({ status: "internal server error" })
    }
})

module.exports = router