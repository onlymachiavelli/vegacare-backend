import * as Express from 'express'
import Users  from '../../models/PSchemas/user.Schema'
import * as Services from './../../services/users.services'

const Create : Express.RequestHandler = (req, res) =>{
    //receive the api key 


    //receive the user data through request body 
    const data : any = req.body 

    if (!data.fullname || !data.email || !data.phone || !data.password ){
        res.status(400).send("Invalid Data")
        return 
    }

    //the rest of the code 


}



export default Create