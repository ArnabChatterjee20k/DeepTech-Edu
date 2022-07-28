const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000

const router = express.Router();
app.get("/",async(req,res)=>res.send("hwll"))
app.listen(3000, () => {
    console.log(`API listening on localhost:${PORT}`)
})