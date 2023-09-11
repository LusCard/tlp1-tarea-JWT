import {Router} from "express";
import {createUserSchema,loginUserSchema} from "../models/users.schema.js";
import {validator} from "../middlewares/validator.js";
import { ctrlGetUserInfoByToken, ctrlLogin, ctrlRegister } from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.get("/users", ctrlGetUserInfoByToken)

authRoutes.post("/login",loginUserSchema,validator, ctrlLogin);

authRoutes.post("/register",createUserSchema, validator, ctrlRegister);