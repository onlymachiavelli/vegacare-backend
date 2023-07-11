import Conditions from "../models/PSchemas/conditions.schema"

const GetAll = async () =>{
    return Conditions.find()
}



export {
    GetAll
}