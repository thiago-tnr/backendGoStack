import { parseISO } from "date-fns";
import {  Router } from "express";
import { getCustomRepository } from "typeorm";
import ensureAuthenticanted from "../../../../users/infra/http/middleware/ensureAuthenticated";
import { AppointmentRepository } from "../../../../../shared/infra/typeorm/repositories/AppointmentsRepository";
import { CreateAppointmentService } from "../../../service/CreateAppointmentService";

export const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticanted);

appointmentsRouter.get('/', async (request, response) =>{

    const appointmentesNewRepository =  getCustomRepository(AppointmentRepository);
    const appointments = await appointmentesNewRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) =>{

    const {provider_id, date} = request.body;
    const parsedDate = parseISO(date);
    const CreateAppointment = new CreateAppointmentService();
    const appointment = await CreateAppointment.execute({date: parsedDate, provider_id, })

    return response.json(appointment)
   
})