import { NextFunction, Request, Response } from "express";



export function cats(req:Request,res:Response,next:NextFunction){
    console.log('execute');
    next();
    
}