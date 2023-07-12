import * as Express from 'express'
import Users  from '../../models/PSchemas/user.Schema'
import * as HealthControllers from './../../services/health.services'

import * as Services from './../../services/users.services'
import usersModel from '../../models/MongooseSchema/users.model'
import Format from 'date-and-time'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
const Create : Express.RequestHandler =async (req, res) =>{
    //receive the api key 


    //receive the user data through request body 
    const data : any = req.body 

    if (!data.fullname || !data.email || !data.phone || !data.password || !data.bday ||!data.type || !data.address || !data.gender ){
        
        res.status(400).send("Invalid Data")
        return 
    }

    const user : any = new Users
    //user health 

    user.fullname = data.fullname 
    user.email  = data.email 
    user.phone = data.phone
    user.gender = data.gender 
    user.address = data.address
    user.bday = data.bday
    user.type = data.type
    user.glycemia = 0
    user.allergies = ""
    user.conditons = ""
    user.medications = ""
    user.blood_type = "Unckown"

    user.avatar = data.gender == "male"? "male.png" :"female.png"
    const current : any = Format.format(
        new Date, 
        "YYYY-MM-DD HH:mm:ss"
    )
    user.created_at = current 
    user.updated_at = current

    const saltRound: number = Number(process.env.SALT )
    user.password = await bcrypt
      .genSalt(saltRound)
      .then((s) => bcrypt.hash(data.password, s))

    
    await Services.Save(user).then(async(rs:any) =>{
        
        let id : any 

        const target : any = await Services.GetOne("email" , data.email) 
        if (target) {
            id = target.id
        }
        console.log(target.id, " " , target.Users)
        console.log("Saved the user in POSTGRESQL")
        const healthy : any = new usersModel()
        healthy.id = id

        HealthControllers.Create(healthy).then((r) =>{
            console.log("Reserved the same id in MDB")
            const token : any = JWT.sign({id : id} ,String(process.env.key) || "" , {expiresIn : "1d"})
            res.status(200).send({
                message : "Account is created ! " , 
                token  :token

            })
        }).catch(e=>{
            console.log("Error saving in mongoose  !") 
            console.log(e)
            res.status(500).send("Internal error ! ")
            return 
        }).catch(e=>{
            console.log("Error savign in the PSQL")
            console.log(e)
            res.status(500).send("Internal error ! ")
            return 
        })
        
    })
   


}



export default Create