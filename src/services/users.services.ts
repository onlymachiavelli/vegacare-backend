import Users from "../models/PSchemas/user.Schema"

const GetAll = async () =>{
    return Users.find()
}

const Save = async (data : any) => {
    await Users.save(data)
}

const Delete = async (id : any) => {
    await Users.delete(id)
}

const GetBy = async (id : any, field:any) => {
    return await Users.findOne(
        {
            [field] : id
        }
    )
}

const GetWhere = async (data : any) => {
    return await Users.findBy(data)
}

const Update = async (id : any, data : any) => {
    await Users.update(id , data)
}


export {
    GetAll,
    Save,
    Delete,
    GetBy,
    GetWhere,
    Update
}