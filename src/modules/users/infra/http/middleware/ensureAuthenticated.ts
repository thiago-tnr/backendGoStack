import {Request, Response, NextFunction} from 'express';
import {verify} from "jsonwebtoken";
import auth from '../../../../../config/auth';
import Error from "../../../../../shared/erros/AppError";

interface TokenPAyload{
    iat:number;
    exp:number;
    sub:string;
}
export default function ensureAuthenticanted(request:Request, response:Response, next:NextFunction){
    //validação do token JWT
    console.log('oi');
    const authHeaders = request.headers.authorization;
    if(!authHeaders){
        throw new Error('JWT token is missing', 401);
    }
//aqui eu pego a segunda posição do array sem precisar de dar um foreach, apenas usando desestruturação
    const [, token] = authHeaders.split(' ');
    try{
      
        const decoded = verify(token,auth.jwt.secret);
        const {sub} = decoded as TokenPAyload;
        

        request.user = {
            id: sub,
        }

    next();

    }catch{
        throw new Error('Invalid JWT token', 401);
    }
   

}
