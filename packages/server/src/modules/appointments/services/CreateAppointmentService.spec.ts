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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 10, 13),
      user_id: '123123',
      provider_id: '1232321'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1232321')
  })

  it('should not to able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 11, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '1232321'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '1232321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '1232321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 6, 10, 13),
        user_id: '123123',
        provider_id: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        user_id: '123123',
        provider_id: '321321'
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        user_id: '123123',
        provider_id: '321321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
