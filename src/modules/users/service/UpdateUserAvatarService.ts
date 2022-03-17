import { getRepository } from "typeorm";
import path from 'path';
import upload from "../../../config/upload"
import fs from 'fs';
import Error from "../../../shared/erros/AppError";
import { User } from "../infra/typeorm/entities/User";

interface Request{
    user_id: string;
    avatarFileName: string;
}

export default class UpdateUserAvatarService{
    public async execute ({user_id, avatarFileName}:Request){
       const usersRepository = getRepository(User)

       const user = await usersRepository.findOne(user_id)

       if(!user){
           throw new Error('Only authenticated users can change avatar', 401)
       }

       if(user.avatar){
           const userAvatarFilePath = path.join(upload.directory, user.avatar);
           const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
           if(userAvatarFileExists){
           await fs.promises.unlink(userAvatarFilePath);
        }
       }
      user.avatar = avatarFileName;

      await usersRepository.save(user);

      return user;
    }
}