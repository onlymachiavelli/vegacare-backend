import {RequestHandler} from 'express'
import Allergies from '../../models/PSchemas/Allergies.schema'
import * as Services from '../../services/allergies.sevices'
import Format from 'date-and-time'


const Update : RequestHandler =async (req, res) =>{
    const id : any = req.params.id

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
    condi.updated_at = format

    await Services.Update(id, condi).then((resp)=>{
        res.status(201).send("Done updating the condition")
    }).catch((e)=>{
        res.status(400).send("Error updating the condition")
        console.log(e)
    })
}

export default Update