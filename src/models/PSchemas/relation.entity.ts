import * as TypeORM from 'typeorm'

import usersModel from '../MongooseSchema/users.model'
import Gender from '../../@types/gender.enum'
@TypeORM.Entity()
class Relations extends TypeORM.BaseEntity{

    

    @TypeORM.PrimaryColumn()
    phone : string 

    @TypeORM.PrimaryColumn()
    patient_id : number


    @TypeORM.Column()
    name : string

    
    @TypeORM.Column()
    gender : Gender

    @TypeORM.Column({default : "pending"})
    pending : string

    @TypeORM.Column()
    created_at : Date

    @TypeORM.Column()
    updated_at : Date




}
export default Relations