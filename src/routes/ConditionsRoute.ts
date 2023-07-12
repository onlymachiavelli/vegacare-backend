import { Router } from "express";
import Create from './../controllers/conditions/create.controller'
import GetAll from './../controllers/conditions/getAll.controller'

const ConditionsRoute = Router()

ConditionsRoute.post("/", Create)
ConditionsRoute.get("/", GetAll)

export default ConditionsRoute