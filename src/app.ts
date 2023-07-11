import express from "express"
import "dotenv/config"
import { json } from "body-parser"
import appDataSource from "./utils/POSTGRES"

const cors = require("cors")

const app = express()

app.use(json())
app.use(cors())
//use local env 



const PORT: any = process.env.PORT || 3000
app.listen(PORT, () =>{
  console.log(`Listening on ${PORT}`)

  appDataSource.initialize().then((res)=>{
    console.log("Connected to the PSDB")
  }).catch(e=>{
    console.log(e)
  })

  //connect to PS
  //connect to Mongoodse
})
