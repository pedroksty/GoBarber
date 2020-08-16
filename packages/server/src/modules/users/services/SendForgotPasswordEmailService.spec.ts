import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProviver/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

describe('sendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider
    );

    await fakeUserRepository.create({
      name: 'Mario Prato',
      email: 'mario@contac.com',
      password: '12345678'
    });

    await sendForgotPasswordEmail.execute({
      email: 'mario@contac.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'mario@contac.com'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
