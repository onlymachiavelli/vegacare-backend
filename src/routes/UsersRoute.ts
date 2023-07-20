import { Router } from "express";
import GetAll from '../controllers/users/getAll.controller'
//import Update from '../controllers/users/update.controller'
import Delete from '../controllers/users/delete.controller'
import Change from '../controllers/users/change.controller'
import Create from './../controllers/users/create.controller'
import SignIn from "./../controllers/users/signin"
import GetMe from "../controllers/users/getMe.controller"
import GetCleanData from "../controllers/users/getCleanData.controller"
import resetPassword from "../controllers/users/resetPassword.controller"

const UsersRoute = Router()

UsersRoute.post("/", Create)
UsersRoute.get("/", GetAll)
//UsersRoute.put("/:id", Update)
UsersRoute.delete("/:id", Delete)
UsersRoute.patch("/", Change)
UsersRoute.post("/login", SignIn)
UsersRoute.get("/me", GetMe)
UsersRoute.get("/cleanData", GetCleanData)
UsersRoute.post("/resetpassword", resetPassword)

export default UsersRoute