import * as Express from 'express'

import * as UsersServices from './../../services/users.services'
import * as Services from './../../services/relations.service'
import Format from 'date-and-time'
import Jwt from 'jsonwebtoken'


const Create : Express.RequestHandler = async (req ,res,next) => {
    const id : number = getIDFromToken(req.body.authorization, res)
    if(id==-1){
        next()
        return
    }

    const user : any = await UsersServices.GetOne(id, "id")

    const current : any = Format.format(
        new Date, 
        "YYYY-MM-DD HH:mm:ss"
    )

    let datas = {}
    switch(user.type){
        case "patient":
            if(!req.body.phone||!req.body.name||!req.body.gender){
                res.status(401).send("invalid datas")
                next()
                return
            }
            
            const doesUserAlreadyExist : any = await UsersServices.GetOne(req.body.phone, "phone")
            if(doesUserAlreadyExist){
                res.status(401).send("User already exist")
                next()
                return
            }

            datas = {
                phone:req.body.phone,
                patient_id:id,
                name:req.body.name,
                gender:req.body.gender,
                pending:"Approuved",
                created_at:current,
                updated_at:current
            }
            break
        case "supervisor":
            datas = {
                phone:req.body.phone, /// to be changed
                patient_id:id, // to be changed
                name:req.body.name,
                gender:req.body.gender,
                pending:"Pending",
                created_at:current,
                updated_at:current
            }
            break
        default:
            res.status(401).send("invalid user type")
            next()
            return
    }

    Services.Save(datas).then((r : any) => {
        res.status(200).send("relation created")
    }).catch((e) =>{
        console.log(e)
        res.status(500).send("couldn't save in DB")
    })

}




const getIDFromToken : any = (authorization : any, res : any) => {
    if(!authorization){
        res.status(401).send("No token")
        return -1
    }
    //get the token bearer 
    const [Bearer, token] : any = authorization?.split(" ")


    if (!Bearer || !token) {
        res.status(401).send("No token")
        return -1
    }
    //get payload 
    console.log("token : " , token)

    let payload : any
    try{
        payload = Jwt.verify(token, String(process.env.KEY)  || "")
    }
    catch(e){
        console.log(e)
        res.status(401).send("Invalid token")
        return -1
    }
    if(!payload){
        res.status(401).send("Invalid token")
        return -1
    }
}