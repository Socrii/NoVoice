import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {dbConnection} from './database/dbconnection.js'
import database from "mime-db";
import {errorMiddleware} from './middlewares/error.js';

import { userRouter } from "./routes/userrouter.js";
// import { blogRouter } from "./routes/blogroute.js";

const app =express();
dotenv.config({path:"./config/config.env"});

// middle ware jaisa kaam karta hai 
app.use(cors(
    {
        origin:[],                              // frontend ka path -> local host jaisa
        methods:["GET","POST","PUT","DELETE"], // methods jaise GET,POST,PUT jisse use karenge 
        credentials:true,
    }
));

// middlewares
app.use(cookieParser())// jaise hi user login/register hua toh  cookie generate hoga use access karne ke liye
app.use(express.json()); // data  json 
app.use(express.urlencoded({extended:true})); // data kis type ka hoga ?


app.use("/api/v1",userRouter);


 //connect with database
 dbConnection();
 
 
 
 // error middlware 
app.use(errorMiddleware);

export default app;

