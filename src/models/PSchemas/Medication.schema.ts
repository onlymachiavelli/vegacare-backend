import * as TypeORM from "typeorm"

@TypeORM.Entity()
class Medications extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id : number

    @TypeORM.Column()
    tilte : String

    @TypeORM.Column()
    Created_at : Date

    @TypeORM.Column()
    Updated_at : Date
}

export default Medications