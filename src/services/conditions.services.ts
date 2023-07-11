import Conditions from "../models/PSchemas/conditions.schema"

const GetAll = async () =>{
    return Conditions.find()
}

const Save = async (data : any) => {
    await Conditions.save(data)
}

const Delete = async (id : any) => {
    await Conditions.delete(id)
}

const GetBy = async (id : any, field:any) => {
    return await Conditions.findOne(
        {
            [field] : id
        }
    )
}

const GetWhere = async (data : any) => {
    return await Conditions.findBy(data)
}





export {
    GetAll,
    Save,
    Delete,
    GetBy,
    GetWhere
}