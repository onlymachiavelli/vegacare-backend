import { Router } from "express";
import Create from '../controllers/medications/create.controller'
import GetAll from '../controllers/medications/getAll.controller'
import Update from '../controllers/medications/update.controller'

const MedicationsRoute = Router()

MedicationsRoute.post("/", Create)
MedicationsRoute.get("/", GetAll)
MedicationsRoute.put("/:id", Update)
export default MedicationsRoute