import { Router } from "express";
import Create from './../controllers/conditions/create.controller'

const ConditionsRoute = Router()

ConditionsRoute.post("/", Create)

export default ConditionsRoute