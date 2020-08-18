import { v4 } from 'uuid'
import { isEqual } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/IcreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async create({
    date,
    provider_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: v4(), date, provider_id })

    appointment.id = v4()
    appointment.date = date
    appointment.provider_id = provider_id

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentRepository
