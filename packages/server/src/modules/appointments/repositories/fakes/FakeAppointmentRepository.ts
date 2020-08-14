import { uuid } from 'uuidv4'


import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/IcreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentsRepository {
  private appointments = Appointment[] = []

 

  public async findByDate(date: Date): Promise<Appointment | undefined> {}

  public async create({
    date,
    provider_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {id: uuid(), date, provider_id})

    appointment.id = uuid()
    appointment.date = date
    appointment.provider_id = provider_id

    this.appointments.push(appointment)

    return appointment

  }
}

export default AppointmentRepository;
