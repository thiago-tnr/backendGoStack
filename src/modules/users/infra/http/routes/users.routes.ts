import CreateuserService from "../../../service/CreateUserService";
import UpdateUserAvatarService from "../../../service/UpdateUserAvatarService";
import { Router } from "express";
import multer from "multer";
import upload from "../../../../../config/upload";
import ensureAuthenticanted from "../middleware/ensureAuthenticated";

export const usersRouter = Router();
const makeUpload = multer(upload);

usersRouter.post('/', async (request, response) =>{

    const {name, email, password} = request.body;
    const createUser= new CreateuserService();
    const user = await createUser.execute({name, email, password})

    delete user.password;

    return response.json(user);

})

usersRouter.patch('/avatar',ensureAuthenticanted, makeUpload.single('avatar'), async (request, response) =>{

    const updateUserAvatar = new UpdateUserAvatarService();

    const user =  await updateUserAvatar.execute({
        user_id: request.user.id as string,
        avatarFileName: request.file.filename
    })

    delete user.password;

    return response.json(user)

})
