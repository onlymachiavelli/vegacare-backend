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

    const cleanUserData : any = {
        height: rawUserData.height,
        weight: rawUserData.weight,
        blood_type: rawUserData.blood_type,
        glycemia: rawUserData.glycemia,
        allergies:[],
        conditions: [],
        medications: []
    }

    const IDsAllergies : number[]= rawUserData.allergies.split(",").map((element: any)=> {Number(element)}) 
    const IDsConditions : number[]= rawUserData.conditions.split(",").map((element: any)=> {Number(element)}) 
    const IDsMedications : number[]= rawUserData.medications.split(",").map((element: any)=> {Number(element)}) 

    cleanUserData.allergies = IDsAllergies.map((element) => { AllergiesService.GetBy(element , id) })
    cleanUserData.conditions = IDsConditions.map((element) => { ConditionsService.GetBy(element , id) })
    cleanUserData.medications= IDsMedications.map((element) => { MedicationsService.GetBy(element , id) })


    //send the data 
    res.status(200).send(cleanUserData)

    
}

export default GetCleanData