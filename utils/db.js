
const { MongoClient, ServerApiVersion } = require('mongodb');

const user = process.env.USER
const password = process.env.PASSWORD
const db = process.env.DB
const collection = process.env.COLLECTION

const uri = `mongodb+srv://${user}:${password}@deepthought.8qopc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function connectDB(){
    try{
        await client.connect();
        const collection = await client.db("test").collection("devices");
        console.log("connected");
        return collection;
    }
    catch(err){
        console.log(err.message)
        client.close()
    }
}

module.exports = [connectDB,client]