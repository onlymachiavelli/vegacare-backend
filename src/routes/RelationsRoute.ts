import { Router } from "express";
import Create from "../controllers/relations/create.controller";
import GetAll from "../controllers/relations/getAll.controller";
import Validation from "../controllers/relations/validation.controller";

const RelationsRoute = Router()

RelationsRoute.post("/", Create)
RelationsRoute.get("/", GetAll)
RelationsRoute.post("/", Validation)

export default RelationsRoute