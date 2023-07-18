import * as Express from 'express'
import Jwt  from 'jsonwebtoken'
import * as Services from './../../services/users.services'

import * as AllergiesService from './../../services/allergies.sevices'
import * as MedicationsService from './../../services/medications.sevices'
import * as ConditionsService from './../../services/conditions.services'

const GetCleanData : Express.RequestHandler = async (req : any, res : any, next : any) => {
    //verify authentification
    console.log("header",req.headers.authorization)
    if(!req.headers.authorization){
        console.log("No fucking token")

        res.status(401).send("No token")
        return
    }
    console.log(req.headers.authorization)
    //get the token bearer 
    const [Bearer, token] : any = req.headers.authorization?.split(" ")


    if (!Bearer || !token) {
    console.log("No token")
        res.status(401).send("No token")
        
        return
    }
    //get payload 
    console.log("token : " , token)

    let payload : any
    try{
        payload = Jwt.verify(token, String(process.env.KEY)  || "")
    }
    catch(e){
        console.log(e)
        console.log("unvalid payload 1")
        res.status(401).send("Invalid token")
        next()
        return
    }

    if(!payload){
        console.log("unvalid payload")

        res.status(401).send("Invalid token")
        return
    }
    console.log(payload)

    const id : any = payload.id

    const rawUserData :any = await Services.GetOne("id",id)
    //check user 
    if (!rawUserData) {
        res.status(401).send("Unauthorized")
        return
    }
    
    if (rawUserData.type != "patient") {
        res.status(401).send("Unauthorized")
        return
    }

    let cleanUserData : any = {
        height: rawUserData.height || "0",
        weight: rawUserData.weight || "0",
        blood_type: rawUserData.blood_type,
        glycemia: rawUserData.glycemia || "0",
        allergies:[],
        conditions: [],
        medications: []
    }

    rawUserData.allergies ="1,2"
    console.log(rawUserData.allergies)
    const IDsAllergies : number[]= rawUserData.allergies.split(",").map((element: any)=> {return Number(element)}) 
    const IDsConditions : number[]= rawUserData.conditions.split(",").map((element: any)=> {return Number(element)}) 
    const IDsMedications : number[]= rawUserData.medications.split(",").map((element: any)=> {return Number(element)}) 

    console.log(IDsAllergies)
    cleanUserData.allergies = IDsAllergies.map(async (element) => { return await AllergiesService.GetBy(element , "id") })
    cleanUserData.conditions = IDsConditions.map(async (element) => { return await ConditionsService.GetBy(element , "id") })
    cleanUserData.medications= IDsMedications.map(async (element) => { return await MedicationsService.GetBy(element , "id") })
    console.log(await AllergiesService.GetBy(1 , "id"))


    let allr : any = []
    //allergies 
    const targets = [1,2,3]
    targets.map(async(data: any, index:any)=>{
        const element :any =  await AllergiesService.GetBy(data, "id")
        console.log("thing",element )
        if (element)allr.push(element)
    })

    console.log("results", allr)

    //send the data 
    res.status(200).send(cleanUserData)

    
}

export default GetCleanData