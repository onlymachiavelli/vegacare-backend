import {RequestHandler} from 'express'


const Verify : RequestHandler = async (req,res,next) => {

    const id : any = req.query.id
    if (!id) {
        res.status(401).send("No id")
        next()
        return
    }


    


}

export default Verify