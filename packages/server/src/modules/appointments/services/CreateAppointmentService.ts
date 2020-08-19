import { injectable, inject } from 'tsyringe'
import { startOfHour, isBefore, getHours } from 'date-fns'

import AppError from '@shared/errors/AppError'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  date: Date
  provider_id: string
  user_id: string
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    date,
    provider_id,
    user_id
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.")
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself")
    }

    if (getHours(appointmentDate) < 9 || getHours(appointmentDate) > 17) {
      throw new AppError('You can create appointment between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('Já existe um agendamento para esse horário')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
