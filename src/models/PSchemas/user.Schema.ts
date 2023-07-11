import * as TypeORM from 'typeorm'

import BloodType from '../../@types/blood'
import Gender from '../../@types/gender.enum'
@TypeORM.Entity()

class Users extends TypeORM.BaseEntity{


    //userdata 


    @TypeORM.PrimaryGeneratedColumn()
    id : number 

    @TypeORM.Column({nullable : false}) 
    fullname  : string 

    @TypeORM.Column({nullable : false})
    email : string 
     
    @TypeORM.Column({nullable : false})
    password : string


    @TypeORM.Column({nullable : false})
    phone : string

    @TypeORM.Column({nullable : false})
    address : string

    @TypeORM.Column({nullable : false}) 
    gender : Gender
    
    @TypeORM.Column({nullable : false })
    bday : Date
    
    @TypeORM.Column({nullable : false})
    created_at : Date 
    
    @TypeORM.Column({nullable : false})
    updated_at : Date


    //health data 
    @TypeORM.Column({nullable : true, default : 0 })
    height : number

    @TypeORM.Column({nullable : true, default : 0 })
    weight : number

    @TypeORM.Column({nullable : true, default : "Unckown"})
    blood_type : BloodType


    @TypeORM.Column({nullable : true, default : 0 })
    glycemia : number

    

    



}