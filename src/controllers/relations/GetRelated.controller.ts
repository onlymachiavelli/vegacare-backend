import * as Express from 'express'

import * as UsersServices from '../../services/users.services'
import * as Services from '../../services/relations.service'
import Jwt from 'jsonwebtoken'

const GetRelated : Express.RequestHandler = async (req,res,next) => {
    let user
    try{
        const id = getIDFromToken(req.headers.authorization, res)
        user = await UsersServices.GetOne("id", id)
    }
    catch(e){
        console.log(e)
        res.status(400).send("invalid data")
        return
    }

    if(!user){
        res.status(400).send("No user")
        next()
        return
    }

    switch(user.type){
        case "supervisor":
            try{
                const relationsS = await Services.GetWhere({supervisor:user})
                if(!relationsS||relationsS.length==0){
                    res.status(404).send("couldn't get supervisors or no supervisor found")
                    next()
                    return
                }
    
                let patients = []
                for(var i=0;i++;i<relationsS.length){
                    patients.push(await UsersServices.GetOne('id',relationsS[i].patients[0].id))
                }
                res.status(400).send(patients)
                next()
                return
            }
            catch(e){
                console.log(e)
                res.status(400).send("couldn't get patients")
                next()
                return
            }
        case "patient":
            try{
                const relationsP = await Services.GetWhere({patients:user})
                if(!relationsP||relationsP.length==0){
                    res.status(404).send("couldn't get supervisors or no patients found")
                    next()
                    return
                }
                
                let supervisors = []
                for(var i=0;i++;i<relationsP.length){
                    supervisors.push(await UsersServices.GetOne('id',relationsP[i].supervisors[0].id))
                }
                res.status(400).send(supervisors)
                next()
                return
            }
            catch(e){
                console.log(e)
                res.status(400).send("couldn't get supervisors")
                next()
                return
            }
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

export default GetRelated