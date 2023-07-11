import * as TypeORM from "typeorm"

@TypeORM.Entity()
class Allergies extends TypeORM.BaseEntity{
    @TypeORM.PrimaryGeneratedColumn()
    id : number

    @TypeORM.Column()
    tilte : String

    @TypeORM.Column()
    Created_at : Date

    @TypeORM.Column()
    Updated_at : Date
}

export default Allergies