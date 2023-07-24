import * as Express from 'express'

import * as UsersServices from './../../services/users.services'
import * as Services from './../../services/relations.service'
import Format from 'date-and-time'
import Jwt from 'jsonwebtoken'


const Create : Express.RequestHandler = async (req ,res,next) => {
    const id : number = getIDFromToken(req.headers.authorization, res)
    if(id==-1){
        next()
        return
    }

    const user : any = await UsersServices.GetOne("id", id)

    const current : any = Format.format(
        new Date, 
        "YYYY-MM-DD HH:mm:ss"
    )

    const ContactUser : any = await UsersServices.GetOne("phone", req.body.phone)
    if(!ContactUser){
        const ContactUser = {id:null}
    }

    let datas = {}
    switch(user.type){
        case "patient":
            if(!req.body.phone||!req.body.name||!req.body.gender){
                res.status(401).send("invalid datas")
                next()
                return
            }
            
            /*
            phone: string
            patients: Users[]
            supervisors: Users[]
            name: string
            //pending, approved
            status  :string 
            created_at : Date
            updated_at : Date
            */

            datas = {
                phone:req.body.phone,
                patient:id,
                supervisors:ContactUser.id,
                name:req.body.name,
                status:"Approuved",
                created_at:current,
                updated_at:current
            }
            break
        case "supervisor":
        
            datas = {
                phone:req.body.phone,
                patient:ContactUser.id,
                supervisors:id,
                name:req.body.name,
                status:"Pending",
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
        console.log("No auth")
        return -1
    }
    //get the token bearer 
    const [Bearer, token] : any = authorization?.split(" ")


    if (!Bearer || !token) {
        res.status(401).send("No token")
        console.log("no token or bearer")
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

    return payload.id
}

export default Create