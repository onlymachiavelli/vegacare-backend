import { RequestHandler } from "express"
import * as Services from './../../services/users.services'
import Format from 'date-and-time'

const ResetPass :RequestHandler = async (req, res, nxt) =>{

    //accept code, 
    //get current date  
    //get email, and code 
    if (!req.body.email || !req.body.code) {
        res.status(400).send("email is required")
        return
    }

    //get target 
    const target : any = await Services.GetOne("email" , req.body.email)

    if (!target) {
    
        res.status(404).send("User doesn't exist")
        return

    }

    //get current date : 
    const date : any = new Date

   

    const codeV : any = target.codeValidity
    //transform code v from Thu Jul 20 into numbers 
    const cValidity : any = new Date(codeV)
    
    //compare between date and cValidity with 1 minute 
    const diff : any = date - cValidity
    const diffInMinutes : any = Math.floor((diff/1000)/60)
    if (diffInMinutes > 1) {

        //set the code to null and the date 
        const id : any = target.id
        const datas : any = {
            code: null,
            codeValidity: null
        }
        try{
            await Services.Update(id, datas)
            console.log(`The user ${req.body.email}'s password reset link has been
            expired`)
        }
        catch(e){
            console.log(e)
        }
        res.status(401).send("Code expired")
        return
    }
    

    //verify the codes 
    if (target.code != req.body.code) {
        res.status(401).send("Code is invalid")
        return
    }
        res.status(200).send("Code is valid")
        return
    



}

export default ResetPass