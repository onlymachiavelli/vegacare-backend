import Users from "../models/PSchemas/user.Schema"


const target :any =  ["id", "fullname" , "email" , "password" , "phone" , "gender" , "address", "bday","avatar" , "created_at", "updated_at" , "type" , "blood_type" , "glymecia" , "allergies", "conditons" , "medications"]

const Save = async (user: any) =>{
    await Users.save(user)
}

const GetAll = async () =>{
    return await Users.find()
}

const GetOne = async (field : any, target : any) =>{
    return await Users.findOneBy({
        [field] : [target]
    })
}


//delete 
const Delete = async (field : any, target : any ) =>{
    await Users.delete({
        [field] : [target]
    })
}


export {

    Save,
    GetAll,
    GetOne,
    Delete
}