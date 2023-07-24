import * as Express from 'express'

import * as UsersServices from './../../services/users.services'
import * as Services from './../../services/relations.service'
import Jwt from 'jsonwebtoken'
import { type } from 'os'

const GetRelated : Express.RequestHandler = async (req,res,next) => {
    const id = getIDFromToken(req.headers.authorization, res)
    const user = await UsersServices.GetOne("id", id)

    if(!user){
        res.status(400).send("No user")
        next()
        return
    }

    switch(user.type){
        case "supervisor":
            const relationsS = await Services.GetWhere({supervisor:id})
            if(!relationsS||relationsS.length==0)
            console.log(relationsS)

            let patients = []
            for(var i=0;i++;i<relationsS.length){
                patients.push(await UsersServices.GetOne('id',relationsS[i].id))
            }
            res.status(400).send(patients)
            return
        case "patient":
            const relationsP = await Services.GetWhere({supervisor:id})
            if(!relationsP||relationsP.length==0)
            console.log(relationsP)

            let supervisors = []
            for(var i=0;i++;i<relationsP.length){
                supervisors.push(await UsersServices.GetOne('id',relationsP[i].id))
            }
            res.status(400).send(supervisors)
            return
        default:
            res.status(401).send("invalid data")
            next()
            return
    }



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