import { getRepository } from "typeorm";
import {hash} from "bcryptjs"
import { User } from "../infra/typeorm/entities/User";
import Error from "../../../shared/erros/AppError";


interface Request{
    name: string;
    email: string;
    password: string;
}

export default class CreateuserService{
    public async execute({name, email, password}: Request):Promise<User>{
        const usersRepository = getRepository(User);

        const CheckUserExists = await usersRepository.findOne({
            where: {email},
        })

        if(CheckUserExists){
            throw new Error('Email address already used', 409)
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        })

        await usersRepository.save(user);

        return user;

    }
}