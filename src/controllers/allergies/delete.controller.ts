import {RequestHandler} from 'express'
import * as Services from './../../services/allergies.sevices'


const Delete : RequestHandler =async (req, res) =>{
    const id : any = req.params.id

    await Services.Delete(id).then((resp)=>{
        res.status(201).send("Done deleting the condition") 
    }).catch((e)=>{
        res.status(400).send("Error deleting the condition")
        console.log(e)
    })
}

export default Delete