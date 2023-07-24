import * as Express from 'express'

import * as UsersServices from './../../services/users.services'
import * as Services from './../../services/relations.service'
import Format from 'date-and-time'
import Jwt from 'jsonwebtoken'

const Validation : Express.RequestHandler = (req,res,next) => {
    const isValid = req.body.isValid
    if(!isValid){
        res.status(401).send("invalid datas")
        next()
        return
    }

    switch(isValid){
        case "Valid" :
            // update pending to Approuved
            break
        case "Rejected" : 
            // delete or change to Refused or something
            break
        default :
            res.status(401).send("invalid datas")
            next()
            return

    }
}

export default Validation