const express = require("express");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000



app.get("/",async(req,res)=>res.send("hwll"))

// linking routers
const eventRouter = require("./routes/events")
app.use("/api/v3/app/events",eventRouter)

app.listen(3000, () => {
    console.log(`API listening on localhost:${PORT}`)
})