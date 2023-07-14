import {RequestHandler} from 'express'
import * as Services from '../../services/users.services'

function isBetween(x : number,min : number,max : number){
    return x>=min && x<=max
}

/*
    height : number € [0-500]
    weight : number € [0-500]
    blood_type : BloodType € {A+,A-,B+,B-,AB+,AB-,O+,O-}
    glycemia : number € [0-100]
    allergies : string
    conditions : string
    medications : string
*/
const height_min : number = 0
const height_max : number = 500
const weight_min : number = 0
const weight_max : number = 500
const blood_type : String[] = ["A+","A-","B+","B-","AB+","AB-","O+","O-"]
const glycemia_min : number = 0
const glycemia_max : number = 100


const Update : RequestHandler =async (req, res) =>{
    const id : any = req.body.id
    const datas : any = {}
    //check if size is valid
    if(req.body.height){
        if(!isBetween(req.body.height,height_min,height_max)){
            res.status(400).send("Invalid Data")
            return 
        }
        datas.height = req.body.height
    }

    //check if weight is valide
    if(req.body.weight){
        if(!isBetween(req.body.wheight,weight_min,weight_max)){
            res.status(400).send("Invalid Data")
            return 
        }
        datas.weight = req.body.weight
    }

    //check if blood type is valid
    if(req.body.blood_type) {
        if(!blood_type.includes(req.body.blood_type)){
            res.status(400).send("Invalid Data")
            return 
        }
        datas.blood_type = req.body.blood_type
    }

    //check if glycemia is valide
    if(req.body.glycemia){
        if(!isBetween(req.body.glycemia,glycemia_min,glycemia_max)){
            res.status(400).send("Invalid Data")
            return 
        }
        datas.glycemia = req.body.glycemia
    }

    await Services.Update(id, datas).then((resp)=>{
        res.status(201).send("Done changing the condition")
    }).catch((e)=>{
        res.status(400).send("Error changing the condition")
        console.log(e)
    })
}

export default Update
