import * as Express from 'express'
import Users  from '../../models/PSchemas/user.Schema'
import * as HealthControllers from './../../services/health.services'

import * as Services from './../../services/users.services'
import usersModel from '../../models/MongooseSchema/users.model'
import Format from 'date-and-time'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const regexMailString : string = "^.*@.*\.(a(d|e|f|g|i|l|m|n|o|r|s|t|q|u|w|x|z)|b(a|b|d|e|f|g|h|i|j|l|m|n|o|r|s|t|v|w|y|z)|c(a|c|d|f|g|h|i|k|l|m|n|o|r|u|v|x|y|z)|d(e|j|k|m|o|z)|e(c|e|g|h|r|s|t)|f(i|j|k|m|o|r)|g(a|b|d|e|f|g|h|i|l|m|n|p|q|r|s|t|u|w|y)|h(k|m|n|r|t|u)|i(d|e|q|l|m|n|o|r|s|t)|j(e|m|o|p)|k(e|g|h|i|m|n|p|r|w|y|z)|l(a|b|c|i|k|r|s|t|u|v|y)|m(a|c|d|e|f|g|h|k|l|m|n|o|q|p|r|s|t|u|v|w|x|y|z)|n(a|c|e|f|g|i|l|o|p|r|u|z)|om|p(a|e|f|g|h|k|l|m|n|r|s|t|w|y)|qa|r(e|o|s|u|w)|s(a|b|c|d|e|g|h|i|j|k|l|m|n|o|r|t|v|y|z)|t(c|d|f|g|h|j|k|l|m|n|o|r|t|v|w|z)|u(a|g|m|s|y|z)|v(a|c|e|g|i|n|u)|w(f|s)|y(e|t)|z(a|m|w))$"
const regexMail : any = new RegExp(regexMailString)

const Create : Express.RequestHandler =async (req, res) =>{
    //place for the api Key verificator 
    const data : any = req.body 

    if (!data.fullname || !data.email || !data.phone || !data.password || !data.bday ||!data.type || !data.address || !data.gender ){
        res.status(400).send("Invalid Data")
        return 
    }

    if(!regexMail.test(data.email)){
        res.status(400).send("Invalid Data")
        return 
    }

    const user : any = new Users
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
            const token : any = JWT.sign({id : id} ,String(process.env.KEY) || "" , {expiresIn : "7d"})
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