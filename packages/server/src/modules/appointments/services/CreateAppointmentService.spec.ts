import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1232321'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1232321');
  });

  it('should not to able to create two appointments on the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );

    const appointmentDate = new Date(2020, 5, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1232321'
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1232321'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
