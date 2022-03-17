import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { routes } from "./routes";
import 'reflect-metadata';
import '../typeorm';
import upload from "../../../config/upload";
import Error from "../../erros/AppError";

const server = express();

server.use(express.json())
server.use('/files', express.static(upload.directory));
server.use(routes);

server.use((err:Error, request:Request, response:Response, next:NextFunction)=>{
    if(err instanceof Error){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }
    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
});

server.get('/ping', (request, response) =>{
    return response.json({message: 'pong'})
})

server.listen(3030, () => {
    console.log("Server is running!!")
});