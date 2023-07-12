import { Router } from "express";
import Create from '../controllers/allergies/create.controller'
import GetAll from '../controllers/allergies/getAll.controller'
import Update from '../controllers/allergies/update.controller'

const AllergiesRoute = Router()

AllergiesRoute.post("/", Create)
AllergiesRoute.get("/", GetAll)
AllergiesRoute.put("/:id", Update)

export default AllergiesRoute