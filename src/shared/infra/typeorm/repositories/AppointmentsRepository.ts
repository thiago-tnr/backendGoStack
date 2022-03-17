import { EntityRepository, Repository } from "typeorm";
import { Appointment } from "../../../../modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../../../../modules/appointments/repositories/IAppointmentsRepository"

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> implements IAppointmentsRepository {

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = await this.findOne({
            where: { date: date },
        });

        console.log(date);

        return findAppointment || undefined;
    }

}