const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const port = process.env.PORT || 2000;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8zviwwt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const menuCollection = client.db("vistro-bossDb").collection("Menu");
    const reviewCollection = client.db("vistro-bossDb").collection("Reviews");
   
    app.get('/menu',async (req,res)=>{
      const query={};
      const cursor = menuCollection.find(query);
      const menu = await cursor.toArray();
      res.send(menu);
    })
    app.get('/reviews',async (req,res)=>{
      const query={};
      const cursor =reviewCollection.find(query);
      const menu = await cursor.toArray();
      res.send(menu);
    })
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Vistro-boss Server Working");
});

app.listen(port, () => {
  console.log(`Working On Port ${port}`);
});
