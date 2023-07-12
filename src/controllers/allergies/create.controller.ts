import {RequestHandler} from 'express'
import Allergies from '../../models/PSchemas/Allergies.schema'
import * as Services from './../../services/allergies.sevices'
import Format from 'date-and-time'


const Create : RequestHandler =async (req, res) =>{
    //get the request body which contains title of the condition
    const title = req.body.title
    if (!title) {
        res.status(400).send("Verify your data")
        return 
    }
    const condi : any = new Allergies
    condi.title = title
    const date : any = new Date()
    const format : any = Format.format(
        date,
        'YYYY-MM-DD HH:mm:ss'
    )
    condi.created_at = format
    condi.updated_at = format

    await Services.Save(condi).then((resp)=>{
        res.status(201).send("Done saving the condition")
    }).catch((e)=>{
        res.status(400).send("Error saving the condition")
        console.log(e)
    })
}

export default Create