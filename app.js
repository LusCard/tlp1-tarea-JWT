import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config"

import {startDb} from "./src/config/database.js"
import {authRoutes} from "./src/routes/testauth.routes.js"

const app = express(); 

//SOME MIDDLEWARES
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}))
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", authRoutes)

startDb()
import "./src/models/Users.js";
app.listen(process.env.PORT, ()=>{
    console.log(`Listening on http://localhost:${process.env.PORT}`)
});
