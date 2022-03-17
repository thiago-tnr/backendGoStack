import { getRepository } from "typeorm";
import {compare} from "bcryptjs"
import { sign} from "jsonwebtoken";
import auth from "../../../config/auth";
import Error from "../../../shared/erros/AppError";
import { User } from "../infra/typeorm/entities/User";


interface Request{
    email: string;
    password: string;
}

export default class AuthenticationUserService{
    public async execute({email, password}: Request){
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({where: {email}});

        if(!user){
            throw new Error('Incorrect email/password combination', 401)
        }
//user.password = senha criptograda
//password = senha não criptografada
        const passwordMatched = await compare(password, user.password);
        if(!passwordMatched){
            throw new Error('Incorrect email/password combination', 403)
        }
        //se passou até aqui, usuário autenticado

        const {secret, expiresIn} = auth.jwt;

        const token = sign({},secret,{
            subject: user.id,
            expiresIn
        });
        return{
        user,
        token
        };
    }   
}