import { Router } from "express";
import GetAll from '../controllers/users/getAll.controller'
//import Update from '../controllers/users/update.controller'
import Delete from '../controllers/users/delete.controller'
import Change from '../controllers/users/change.controller'
import Create from './../controllers/users/create.controller'
import SignIn from "./../controllers/users/signin"
const MedicationsRoute = Router()

MedicationsRoute.post("/", Create)
MedicationsRoute.get("/", GetAll)
//MedicationsRoute.put("/:id", Update)
MedicationsRoute.delete("/:id", Delete)
MedicationsRoute.patch("/:id", Change)
MedicationsRoute.post("/login", SignIn)

export default MedicationsRoute