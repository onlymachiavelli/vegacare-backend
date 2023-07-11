import express from "express"
import "dotenv/config"
import { json } from "body-parser"
import appDataSource from "./utils/POSTGRES"
import MongoConnect from "./utils/MongoConnect"
import testRoute from "./routes/Ping"
const cors = require("cors")

const app = express()

app.use(json())
app.use(cors())
//use local env 



const PORT: any = process.env.PORT || 3000
app.listen(PORT,async () =>{
  console.log(`Listening on ${PORT}`)

  appDataSource.initialize().then(async (resp)=>{
    console.log("Connected to the PSDB")
    await MongoConnect().then(re=>{
      
      app.use("/ping", testRoute)

      //the rest of the middle wares ! 
    })
  }).catch(e=>{
    console.log(e)
  })



  //connect to PS
  //connect to Mongoodse
})

