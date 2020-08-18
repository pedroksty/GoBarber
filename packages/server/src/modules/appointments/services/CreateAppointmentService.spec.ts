import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/AppError'

let fakeAppointmentRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()

    createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1232321'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1232321')
  })

  it('should not to able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 5, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1232321'
    })

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1232321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
