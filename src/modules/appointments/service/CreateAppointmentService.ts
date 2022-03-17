import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import { Appointment } from "../infra/typeorm/entities/Appointment";
import { AppointmentRepository } from "../../../shared/infra/typeorm/repositories/AppointmentsRepository";
import Error from "../../../shared/erros/AppError";


interface Request {
    provider_id: string;
    date: Date;
}


export class CreateAppointmentService {


    public async execute({ provider_id, date }: Request): Promise<Appointment> {

        const appointmentRepository = getCustomRepository(AppointmentRepository);
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentRepository.findByDate(
            date);
        if (findAppointmentInSameDate) {
            throw new Error('This appointment already booked', 409);
        }

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentRepository.save(appointment);

        return appointment;

    }
}