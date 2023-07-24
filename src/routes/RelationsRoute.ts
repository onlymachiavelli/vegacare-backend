import { Router } from "express";
import Create from "../controllers/relations/create.controller";
import GetAll from "../controllers/relations/getAll.controller";

const RelationsRoute = Router()

RelationsRoute.post("/", Create)
RelationsRoute.get("/", GetAll)

export default RelationsRoute